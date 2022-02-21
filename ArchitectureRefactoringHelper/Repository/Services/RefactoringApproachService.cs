using Microsoft.EntityFrameworkCore;
using Repository.Exceptions;
using Repository.Models;

namespace Repository.Services;

public class RefactoringApproachService
{
    private readonly ApproachInputService _inputService;
    private readonly ApproachProcessService _processService;
    private readonly ApproachOutputService _outputService;
    private readonly ApproachUsabilityService _usabilityService;

    public RefactoringApproachService(ApproachInputService inputService, ApproachProcessService processService,
        ApproachOutputService outputService, ApproachUsabilityService usabilityService)
    {
        _inputService = inputService;
        _processService = processService;
        _outputService = outputService;
        _usabilityService = usabilityService;
    }

    public IEnumerable<RefactoringApproach> ListRefactoringApproaches()
    {
        using (var db = new RefactoringApproachContext())
        {
            return db.RefactoringApproaches
                .Include(e => e.ApproachSource)
                .ToList();
        }
    }

    public RefactoringApproach GetRefactoringApproach(int refactoringApproachId)
    {
        using (var db = new RefactoringApproachContext())
        {
            var refactoringApproach = db.RefactoringApproaches
                .Where(e => e.RefactoringApproachId == refactoringApproachId)
                .Include(e => e.ApproachSource)
                .Include(e => e.DomainArtifactInputs)
                .Include(e => e.RuntimeArtifactInputs)
                .Include(e => e.ModelArtifactInputs)
                .Include(e => e.ExecutableInputs)
                .Include(e => e.ApproachProcess.Qualities)
                .Include(e => e.ApproachProcess.Directions)
                .Include(e => e.ApproachProcess.AutomationLevels)
                .Include(e => e.ApproachProcess.AnalysisTypes)
                .Include(e => e.ApproachProcess.Techniques)
                .Include(e => e.ApproachOutputs)!
                .ThenInclude(e => e.Architecture)
                .Include(e => e.ApproachOutputs)!
                .ThenInclude(e => e.ServiceType)
                .Include(e => e.ApproachUsabilitiy.ResultsQualitiy)
                .Include(e => e.ApproachUsabilitiy.ToolSupport)
                .Include(e => e.ApproachUsabilitiy.AccuracyPrecision)
                .Include(e => e.ApproachUsabilitiy.ValidationMethod)
                .FirstOrDefault();
            if (refactoringApproach == null)
            {
                throw new ElementNotFoundException(
                    $"Refactoring approach with ID '{refactoringApproachId}' does not exist.");
            }

            return refactoringApproach;
        }
    }

    public RefactoringApproach AddRefactoringApproachIfNotExists(RefactoringApproach refactoringApproach)
    {
        if (ExistsDuplicateRefactoringApproach(refactoringApproach.ApproachSource))
        {
            throw new DuplicateElementException(
                $"A refactoring approach with the title '{refactoringApproach.ApproachSource.Title}' already exists. If you want to change information regarding this approach try updating the existing refactoring approach");
        }

        return AddRefactoringApproach(refactoringApproach);
    }

    private RefactoringApproach AddRefactoringApproach(RefactoringApproach refactoringApproach)
    {
        var preparedRefactoringApproach = new RefactoringApproach
        {
            ApproachSource = refactoringApproach.ApproachSource
        };

        using (var db = new RefactoringApproachContext())
        {
            var savedDomainArtifactInputs = new List<DomainArtifactInput>();
            if (refactoringApproach.DomainArtifactInputs != null)
            {
                savedDomainArtifactInputs.AddRange(
                    refactoringApproach.DomainArtifactInputs.Select(input =>
                        _inputService.GetDomainArtifactInput(input.Name)));
            }

            preparedRefactoringApproach.DomainArtifactInputs = savedDomainArtifactInputs;

            var savedRuntimeArtifactInputs = new List<RuntimeArtifactInput>();
            if (refactoringApproach.RuntimeArtifactInputs != null)
            {
                savedRuntimeArtifactInputs.AddRange(
                    refactoringApproach.RuntimeArtifactInputs.Select(input =>
                        _inputService.GetRuntimeArtifactInput(input.Name)));
            }

            preparedRefactoringApproach.RuntimeArtifactInputs = savedRuntimeArtifactInputs;

            var savedModelArtifactInputs = new List<ModelArtifactInput>();
            if (refactoringApproach.ModelArtifactInputs != null)
            {
                savedModelArtifactInputs.AddRange(
                    refactoringApproach.ModelArtifactInputs.Select(input =>
                        _inputService.GetModelArtifactInput(input.Name)));
            }

            preparedRefactoringApproach.ModelArtifactInputs = savedModelArtifactInputs;

            var savedExecutableInputs = new List<ExecutableInput>();
            if (refactoringApproach.ExecutableInputs != null)
            {
                savedExecutableInputs.AddRange(refactoringApproach.ExecutableInputs.Select(input =>
                    _inputService.GetExecutableInput(input.Name, input.Language)));
            }

            preparedRefactoringApproach.ExecutableInputs = savedExecutableInputs;

            preparedRefactoringApproach.ApproachProcess =
                _processService.AddApproachProcess(refactoringApproach.ApproachProcess);
            db.ApproachProcesses.Attach(preparedRefactoringApproach.ApproachProcess);

            var savedOutputs = new List<ApproachOutput>();
            if (refactoringApproach.ApproachOutputs != null)
            {
                savedOutputs.AddRange(
                    refactoringApproach.ApproachOutputs.Select(output =>
                        _outputService.AddApproachOutputIfNotExists(output)));
            }

            preparedRefactoringApproach.ApproachOutputs = savedOutputs;

            preparedRefactoringApproach.ApproachUsabilitiy =
                _usabilityService.AddApproachUsability(refactoringApproach.ApproachUsabilitiy);
            db.ApproachUsabilities.Attach(preparedRefactoringApproach.ApproachUsabilitiy);

            var newRefactoringApproach = db.RefactoringApproaches.Update(preparedRefactoringApproach).Entity;
            db.SaveChanges();
            return newRefactoringApproach;
        }
    }

    public void DeleteRefactoringApproach(int refactoringApproachId)
    {
        using (var db = new RefactoringApproachContext())
        {
            var approach = db.RefactoringApproaches.Find(refactoringApproachId);
            if (approach == null)
                return;
            db.RefactoringApproaches.Remove(approach);
            db.SaveChanges();
        }
    }

    private bool ExistsDuplicateRefactoringApproach(ApproachSource source)
    {
        using (var db = new RefactoringApproachContext())
        {
            var savedSource = db.ApproachSources.FirstOrDefault(e => e.Title.Equals(source.Title));

            return savedSource != null;
        }
    }

    public void AddDomainArtifactAsInput(int approachId, DomainArtifactInput domainArtifact)
    {
        using (var db = new RefactoringApproachContext())
        {
            var approach = GetRefactoringApproach(approachId);
            db.Attach(approach);

            approach.DomainArtifactInputs ??= new List<DomainArtifactInput>();
            if (approach.DomainArtifactInputs.Any(e => e.Name == domainArtifact.Name))
            {
                throw new DuplicateElementException(
                    $"Domain artifact input with name '{domainArtifact.Name}' is already an input of the given refactoring approach(ID: {approachId}).");
            }

            var input = _inputService.GetDomainArtifactInput(domainArtifact.Name);
            db.Attach(input);

            approach.DomainArtifactInputs.Add(input);
            db.SaveChanges();
        }
    }

    public void RemoveDomainArtifactFromInputs(int approachId, string inputName)
    {
        using (var db = new RefactoringApproachContext())
        {
            var approach = GetRefactoringApproach(approachId);
            db.Attach(approach);

            if (approach.DomainArtifactInputs == null)
                return;

            var input = approach.DomainArtifactInputs.FirstOrDefault(e => e.Name == inputName);
            if (input == null)
            {
                throw new ElementNotFoundException(
                    $"Domain artifact input with name '{inputName}' is not an input of the given refactoring approach(ID: {approachId}).");
            }

            approach.DomainArtifactInputs.Remove(input);
            db.SaveChanges();
        }
    }

    public void AddRuntimeArtifactAsInput(int approachId, RuntimeArtifactInput runtimeArtifact)
    {
        using (var db = new RefactoringApproachContext())
        {
            var approach = GetRefactoringApproach(approachId);
            db.Attach(approach);

            approach.RuntimeArtifactInputs ??= new List<RuntimeArtifactInput>();
            if (approach.RuntimeArtifactInputs.Any(e => e.Name == runtimeArtifact.Name))
            {
                throw new DuplicateElementException(
                    $"Runtime artifact input with name '{runtimeArtifact.Name}' is already an input of the given refactoring approach(ID: {approachId}).");
            }

            var input = _inputService.GetRuntimeArtifactInput(runtimeArtifact.Name);
            db.Attach(input);

            approach.RuntimeArtifactInputs.Add(input);
            db.SaveChanges();
        }
    }

    public void RemoveRuntimeArtifactFromInputs(int approachId, string inputName)
    {
        using (var db = new RefactoringApproachContext())
        {
            var approach = GetRefactoringApproach(approachId);
            db.Attach(approach);

            if (approach.RuntimeArtifactInputs == null)
                return;

            var input = approach.RuntimeArtifactInputs.FirstOrDefault(e => e.Name == inputName);
            if (input == null)
            {
                throw new ElementNotFoundException(
                    $"Runtime artifact input with name '{inputName}' is not an input of the given refactoring approach(ID: {approachId}).");
            }

            approach.RuntimeArtifactInputs.Remove(input);
            db.SaveChanges();
        }
    }

    public void AddModelArtifactAsInput(int approachId, ModelArtifactInput modelArtifact)
    {
        using (var db = new RefactoringApproachContext())
        {
            var approach = GetRefactoringApproach(approachId);
            db.Attach(approach);

            approach.ModelArtifactInputs ??= new List<ModelArtifactInput>();
            if (approach.ModelArtifactInputs.Any(e => e.Name == modelArtifact.Name))
            {
                throw new DuplicateElementException(
                    $"Model artifact input with name '{modelArtifact.Name}' is already an input of the given refactoring approach(ID: {approachId}).");
            }

            var input = _inputService.GetModelArtifactInput(modelArtifact.Name);
            db.Attach(input);

            approach.ModelArtifactInputs.Add(input);
            db.SaveChanges();
        }
    }

    public void RemoveModelArtifactFromInputs(int approachId, string inputName)
    {
        using (var db = new RefactoringApproachContext())
        {
            var approach = GetRefactoringApproach(approachId);
            db.Attach(approach);

            if (approach.ModelArtifactInputs == null)
                return;

            var input = approach.ModelArtifactInputs.FirstOrDefault(e => e.Name == inputName);
            if (input == null)
            {
                throw new ElementNotFoundException(
                    $"Model artifact input with name '{inputName}' is not an input of the given refactoring approach(ID: {approachId}).");
            }

            approach.ModelArtifactInputs.Remove(input);
            db.SaveChanges();
        }
    }

    public void AddExecutableAsInput(int approachId, ExecutableInput executable)
    {
        using (var db = new RefactoringApproachContext())
        {
            var approach = GetRefactoringApproach(approachId);
            db.Attach(approach);

            approach.ExecutableInputs ??= new List<ExecutableInput>();
            if (approach.ExecutableInputs.Any(e => e.Name == executable.Name && e.Language == executable.Language))
            {
                throw new DuplicateElementException(
                    $"Executable input with name '{executable.Name}' and language '{executable.Language}' is already an input of the given refactoring approach(ID: {approachId}).");
            }

            var input = _inputService.GetExecutableInput(executable.Name, executable.Language);
            db.Attach(input);

            approach.ExecutableInputs.Add(input);
            db.SaveChanges();
        }
    }

    public void RemoveExecutableFromInputs(int approachId, string inputName, string language)
    {
        using (var db = new RefactoringApproachContext())
        {
            var approach = GetRefactoringApproach(approachId);
            db.Attach(approach);

            if (approach.ExecutableInputs == null)
                return;

            var input = approach.ExecutableInputs.FirstOrDefault(e => e.Name == inputName && e.Language == language);
            if (input == null)
            {
                throw new ElementNotFoundException(
                    $"Domain artifact input with name '{inputName}' and language '{language}' is not an input of the given refactoring approach(ID: {approachId}).");
            }

            approach.ExecutableInputs.Remove(input);
            db.SaveChanges();
        }
    }

    public void AddQualityToProcess(int approachId, Quality quality)
    {
        using (var db = new RefactoringApproachContext())
        {
            var approach = GetRefactoringApproach(approachId);
            db.Attach(approach);

            approach.ApproachProcess.Qualities ??= new List<Quality>();
            if (approach.ApproachProcess.Qualities.Any(e => e.Name == quality.Name))
            {
                throw new DuplicateElementException(
                    $"Quality with name '{quality.Name}' is already a process attribute of the given refactoring approach(ID: {approachId}).");
            }

            var savedQuality = _processService.GetProcessQuality(quality.Name);
            db.Attach(savedQuality);

            approach.ApproachProcess.Qualities.Add(savedQuality);
            db.SaveChanges();
        }
    }

    public void RemoveQualityFromProcess(int approachId, string qualityName)
    {
        using (var db = new RefactoringApproachContext())
        {
            var approach = GetRefactoringApproach(approachId);
            db.Attach(approach);

            if (approach.ApproachProcess.Qualities == null)
                return;

            var quality = approach.ApproachProcess.Qualities.FirstOrDefault(e => e.Name == qualityName);
            if (quality == null)
            {
                throw new ElementNotFoundException(
                    $"Quality with name '{qualityName}' is not a process attribute of the given refactoring approach(ID: {approachId}).");
            }

            approach.ApproachProcess.Qualities.Remove(quality);
            db.SaveChanges();
        }
    }

    public void AddDirectionToProcess(int approachId, Direction direction)
    {
        using (var db = new RefactoringApproachContext())
        {
            var approach = GetRefactoringApproach(approachId);
            db.Attach(approach);

            approach.ApproachProcess.Directions ??= new List<Direction>();
            if (approach.ApproachProcess.Directions.Any(e => e.Name == direction.Name))
            {
                throw new DuplicateElementException(
                    $"Direction with name '{direction.Name}' is already a process attribute of the given refactoring approach(ID: {approachId}).");
            }

            var savedDirection = _processService.GetProcessDirection(direction.Name);
            db.Attach(savedDirection);

            approach.ApproachProcess.Directions.Add(savedDirection);
            db.SaveChanges();
        }
    }

    public void RemoveDirectionFromProcess(int approachId, string directionName)
    {
        using (var db = new RefactoringApproachContext())
        {
            var approach = GetRefactoringApproach(approachId);
            db.Attach(approach);

            if (approach.ApproachProcess.Directions == null)
                return;

            var direction = approach.ApproachProcess.Directions.FirstOrDefault(e => e.Name == directionName);
            if (direction == null)
            {
                throw new ElementNotFoundException(
                    $"Direction with name '{directionName}' is not a process attribute of the given refactoring approach(ID: {approachId}).");
            }

            approach.ApproachProcess.Directions.Remove(direction);
            db.SaveChanges();
        }
    }

    public void AddAutomationLevelToProcess(int approachId, AutomationLevel automationLevel)
    {
        using (var db = new RefactoringApproachContext())
        {
            var approach = GetRefactoringApproach(approachId);
            db.Attach(approach);

            approach.ApproachProcess.AutomationLevels ??= new List<AutomationLevel>();
            if (approach.ApproachProcess.AutomationLevels.Any(e => e.Name == automationLevel.Name))
            {
                throw new DuplicateElementException(
                    $"Automation level with name '{automationLevel.Name}' is already a process attribute of the given refactoring approach(ID: {approachId}).");
            }

            var savedAutomationLevel = _processService.GetProcessAutomationLevel(automationLevel.Name);
            db.Attach(savedAutomationLevel);

            approach.ApproachProcess.AutomationLevels.Add(savedAutomationLevel);
            db.SaveChanges();
        }
    }

    public void RemoveAutomationLevelFromProcess(int approachId, string automationLevelName)
    {
        using (var db = new RefactoringApproachContext())
        {
            var approach = GetRefactoringApproach(approachId);
            db.Attach(approach);

            if (approach.ApproachProcess.AutomationLevels == null)
                return;

            var automationLevel =
                approach.ApproachProcess.AutomationLevels.FirstOrDefault(e => e.Name == automationLevelName);
            if (automationLevel == null)
            {
                throw new ElementNotFoundException(
                    $"Automation level with name '{automationLevelName}' is not a process attribute of the given refactoring approach(ID: {approachId}).");
            }

            approach.ApproachProcess.AutomationLevels.Remove(automationLevel);
            db.SaveChanges();
        }
    }

    public void AddAnalysisTypeToProcess(int approachId, AnalysisType analysisType)
    {
        using (var db = new RefactoringApproachContext())
        {
            var approach = GetRefactoringApproach(approachId);
            db.Attach(approach);

            approach.ApproachProcess.AnalysisTypes ??= new List<AnalysisType>();
            if (approach.ApproachProcess.AnalysisTypes.Any(e => e.Name == analysisType.Name))
            {
                throw new DuplicateElementException(
                    $"Analysis type with name '{analysisType.Name}' is already a process attribute of the given refactoring approach(ID: {approachId}).");
            }

            var savedAnalysisType = _processService.GetProcessAnalysisType(analysisType.Name);
            db.Attach(savedAnalysisType);

            approach.ApproachProcess.AnalysisTypes.Add(savedAnalysisType);
            db.SaveChanges();
        }
    }

    public void RemoveAnalysisTypeFromProcess(int approachId, string analysisTypeName)
    {
        using (var db = new RefactoringApproachContext())
        {
            var approach = GetRefactoringApproach(approachId);
            db.Attach(approach);

            if (approach.ApproachProcess.AnalysisTypes == null)
                return;

            var analysisType = approach.ApproachProcess.AnalysisTypes.FirstOrDefault(e => e.Name == analysisTypeName);
            if (analysisType == null)
            {
                throw new ElementNotFoundException(
                    $"Analysis type with name '{analysisTypeName}' is not a process attribute of the given refactoring approach(ID: {approachId}).");
            }

            approach.ApproachProcess.AnalysisTypes.Remove(analysisType);
            db.SaveChanges();
        }
    }

    public void AddTechniqueToProcess(int approachId, Technique technique)
    {
        using (var db = new RefactoringApproachContext())
        {
            var approach = GetRefactoringApproach(approachId);
            db.Attach(approach);

            approach.ApproachProcess.Techniques ??= new List<Technique>();
            if (approach.ApproachProcess.Techniques.Any(e => e.Name == technique.Name))
            {
                throw new DuplicateElementException(
                    $"Technique with name '{technique.Name}' is already a process attribute of the given refactoring approach(ID: {approachId}).");
            }

            var savedTechnique = _processService.GetProcessTechnique(technique.Name);
            db.Attach(savedTechnique);

            approach.ApproachProcess.Techniques.Add(savedTechnique);
            db.SaveChanges();
        }
    }

    public void RemoveTechniqueFromProcess(int approachId, string techniqueName)
    {
        using (var db = new RefactoringApproachContext())
        {
            var approach = GetRefactoringApproach(approachId);
            db.Attach(approach);

            if (approach.ApproachProcess.Techniques == null)
                return;

            var technique = approach.ApproachProcess.Techniques.FirstOrDefault(e => e.Name == techniqueName);
            if (technique == null)
            {
                throw new ElementNotFoundException(
                    $"Technique with name '{techniqueName}' is not a process attribute of the given refactoring approach(ID: {approachId}).");
            }

            approach.ApproachProcess.Techniques.Remove(technique);
            db.SaveChanges();
        }
    }

    public void AddOutput(int approachId, ApproachOutput output)
    {
        using (var db = new RefactoringApproachContext())
        {
            var approach = GetRefactoringApproach(approachId);
            db.Attach(approach);

            approach.ApproachOutputs ??= new List<ApproachOutput>();
            if (approach.ApproachOutputs.Any(e =>
                    e.Architecture.Name == output.Architecture.Name && e.ServiceType.Name == output.ServiceType.Name))
            {
                throw new DuplicateElementException(
                    $"Output with architecture name '{output.Architecture.Name}' and service type name {output.ServiceType.Name} is already an output of the given refactoring approach(ID: {approachId}).");
            }

            var savedOutput = _outputService.AddApproachOutputIfNotExists(output);
            foreach (var approachOutput in approach.ApproachOutputs)
            {
                if (approachOutput.Architecture.Name == savedOutput.Architecture.Name)
                    savedOutput.Architecture = approachOutput.Architecture;

                if (approachOutput.ServiceType.Name == savedOutput.ServiceType.Name)
                    savedOutput.ServiceType = approachOutput.ServiceType;
            }

            db.Attach(savedOutput);
            
            approach.ApproachOutputs.Add(savedOutput);
            db.SaveChanges();
        }
    }

    public void RemoveOutput(int approachId, int outputId)
    {
        using (var db = new RefactoringApproachContext())
        {
            var approach = GetRefactoringApproach(approachId);
            db.Attach(approach);

            if (approach.ApproachOutputs == null || !approach.ApproachOutputs.Any())
                return;

            var output = approach.ApproachOutputs.FirstOrDefault(e => e.ApproachOutputId == outputId);
            if (output == null)
            {
                throw new ElementNotFoundException(
                    $"Output(ID '{outputId}') is not an output of the given refactoring approach(ID: {approachId}).");
            }

            approach.ApproachOutputs.Remove(output);
            db.SaveChanges();
        }
    }
}
using Microsoft.EntityFrameworkCore;
using Repository.Exceptions;
using Repository.Models;
using Repository.Models.Database;

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
        var db = new RefactoringApproachContext();

        return db.RefactoringApproaches
            .Include(e => e.ApproachSource)
            .ToList();
    }

    public IEnumerable<RefactoringApproach> ListRefactoringApproachesWithFullDetails()
    {
        var db = new RefactoringApproachContext();

        IQueryable<RefactoringApproach> query = db.RefactoringApproaches
            .Include(e => e.ApproachUsability)
            .Include(e => e.ApproachSource);
        var result = query.ToList();

        LoadAllData(ref query);

        return result;
    }

    public RefactoringApproach GetRefactoringApproach(int refactoringApproachId)
    {
        var db = new RefactoringApproachContext();
        return GetRefactoringApproach(refactoringApproachId, ref db);
    }

    public RefactoringApproach GetRefactoringApproach(int refactoringApproachId, ref RefactoringApproachContext db)
    {
        IQueryable<RefactoringApproach> query = db.RefactoringApproaches
            .Where(e => e.RefactoringApproachId == refactoringApproachId)
            .Include(e => e.ApproachUsability)
            .Include(e => e.ApproachSource);
        var result = query.FirstOrDefault();

        LoadAllData(ref query);

        if (result == null)
        {
            throw new ElementNotFoundException(
                $"Refactoring approach with ID '{refactoringApproachId}' does not exist.");
        }

        return result;
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
        var db = new RefactoringApproachContext();

        var newApproach = new RefactoringApproach
        {
            ApproachSource = refactoringApproach.ApproachSource,
            DomainArtifactInputs =
                _inputService.AddDomainArtifactsIfNotExist(refactoringApproach.DomainArtifactInputs, ref db),
            RuntimeArtifactInputs =
                _inputService.AddRuntimeArtifactsIfNotExist(refactoringApproach.RuntimeArtifactInputs, ref db),
            ModelArtifactInputs =
                _inputService.AddModelArtifactsIfNotExist(refactoringApproach.ModelArtifactInputs, ref db),
            ExecutableInputs = _inputService.AddExecutablesIfNotExist(refactoringApproach.ExecutableInputs, ref db),
            ApproachProcess = _processService.AddApproachProcess(refactoringApproach.ApproachProcess, ref db),
            ApproachOutputs = _outputService.AddApproachOutputsIfNotExist(refactoringApproach.ApproachOutputs, ref db),
            ApproachUsability = _usabilityService.AddApproachUsability(refactoringApproach.ApproachUsability, ref db)
        };

        return Utils.AddEntityAndSaveChanges(newApproach, ref db);
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
        var db = new RefactoringApproachContext();

        var savedSource = db.ApproachSources.FirstOrDefault(e => e.Title.Equals(source.Title));

        return savedSource != null;
    }

    public void AddDomainArtifactAsInput(int approachId, DomainArtifactInput domainArtifact)
    {
        var db = new RefactoringApproachContext();

        var approach = GetRefactoringApproach(approachId, ref db);

        approach.DomainArtifactInputs ??= new List<DomainArtifactInput>();
        if (approach.DomainArtifactInputs.Any(e => e.Name == domainArtifact.Name))
        {
            throw new DuplicateElementException(
                $"Domain artifact input with name '{domainArtifact.Name}' is already an input of the given refactoring approach(ID: {approachId}).");
        }

        var input = _inputService.GetDomainArtifactInput(domainArtifact.Name, ref db);
        approach.DomainArtifactInputs.Add(input);
        db.SaveChanges();
    }

    public void RemoveDomainArtifactFromInputs(int approachId, string inputName)
    {
        var db = new RefactoringApproachContext();

        var approach = GetRefactoringApproach(approachId, ref db);

        if (approach.DomainArtifactInputs.IsNullOrEmpty())
            return;

        var input = approach.DomainArtifactInputs!.FirstOrDefault(e => e.Name == inputName);
        if (input == null)
        {
            throw new ElementNotFoundException(
                $"Domain artifact input with name '{inputName}' is not an input of the given refactoring approach(ID: {approachId}).");
        }

        approach.DomainArtifactInputs!.Remove(input);
        db.SaveChanges();
    }

    public void AddRuntimeArtifactAsInput(int approachId, RuntimeArtifactInput runtimeArtifact)
    {
        var db = new RefactoringApproachContext();

        var approach = GetRefactoringApproach(approachId, ref db);

        approach.RuntimeArtifactInputs ??= new List<RuntimeArtifactInput>();
        if (approach.RuntimeArtifactInputs.Any(e => e.Name == runtimeArtifact.Name))
        {
            throw new DuplicateElementException(
                $"Runtime artifact input with name '{runtimeArtifact.Name}' is already an input of the given refactoring approach(ID: {approachId}).");
        }

        var input = _inputService.GetRuntimeArtifactInput(runtimeArtifact.Name, ref db);
        approach.RuntimeArtifactInputs.Add(input);
        db.SaveChanges();
    }

    public void RemoveRuntimeArtifactFromInputs(int approachId, string inputName)
    {
        var db = new RefactoringApproachContext();

        var approach = GetRefactoringApproach(approachId, ref db);

        if (approach.RuntimeArtifactInputs.IsNullOrEmpty())
            return;

        var input = approach.RuntimeArtifactInputs!.FirstOrDefault(e => e.Name == inputName);
        if (input == null)
        {
            throw new ElementNotFoundException(
                $"Runtime artifact input with name '{inputName}' is not an input of the given refactoring approach(ID: {approachId}).");
        }

        approach.RuntimeArtifactInputs!.Remove(input);
        db.SaveChanges();
    }

    public void AddModelArtifactAsInput(int approachId, ModelArtifactInput modelArtifact)
    {
        var db = new RefactoringApproachContext();

        var approach = GetRefactoringApproach(approachId, ref db);

        approach.ModelArtifactInputs ??= new List<ModelArtifactInput>();
        if (approach.ModelArtifactInputs.Any(e => e.Name == modelArtifact.Name))
        {
            throw new DuplicateElementException(
                $"Model artifact input with name '{modelArtifact.Name}' is already an input of the given refactoring approach(ID: {approachId}).");
        }

        var input = _inputService.GetModelArtifactInput(modelArtifact.Name, ref db);
        approach.ModelArtifactInputs.Add(input);
        db.SaveChanges();
    }

    public void RemoveModelArtifactFromInputs(int approachId, string inputName)
    {
        var db = new RefactoringApproachContext();

        var approach = GetRefactoringApproach(approachId, ref db);

        if (approach.ModelArtifactInputs.IsNullOrEmpty())
            return;

        var input = approach.ModelArtifactInputs!.FirstOrDefault(e => e.Name == inputName);
        if (input == null)
        {
            throw new ElementNotFoundException(
                $"Model artifact input with name '{inputName}' is not an input of the given refactoring approach(ID: {approachId}).");
        }

        approach.ModelArtifactInputs!.Remove(input);
        db.SaveChanges();
    }

    public void AddExecutableAsInput(int approachId, ExecutableInput executable)
    {
        var db = new RefactoringApproachContext();

        var approach = GetRefactoringApproach(approachId, ref db);

        approach.ExecutableInputs ??= new List<ExecutableInput>();
        if (approach.ExecutableInputs.Any(e => e.Name == executable.Name && e.Language == executable.Language))
        {
            throw new DuplicateElementException(
                $"Executable input with name '{executable.Name}' and language '{executable.Language}' is already an input of the given refactoring approach(ID: {approachId}).");
        }

        var input = _inputService.GetExecutableInput(executable.Name, executable.Language, ref db);
        approach.ExecutableInputs.Add(input);
        db.SaveChanges();
    }

    public void RemoveExecutableFromInputs(int approachId, string inputName, string language)
    {
        var db = new RefactoringApproachContext();

        var approach = GetRefactoringApproach(approachId, ref db);

        if (approach.ExecutableInputs.IsNullOrEmpty())
            return;

        var input = approach.ExecutableInputs!.FirstOrDefault(e => e.Name == inputName && e.Language == language);
        if (input == null)
        {
            throw new ElementNotFoundException(
                $"Domain artifact input with name '{inputName}' and language '{language}' is not an input of the given refactoring approach(ID: {approachId}).");
        }

        approach.ExecutableInputs!.Remove(input);
        db.SaveChanges();
    }

    public void AddQualityToProcess(int approachId, Quality quality)
    {
        var db = new RefactoringApproachContext();

        var approach = GetRefactoringApproach(approachId, ref db);

        approach.ApproachProcess.Qualities ??= new List<Quality>();
        if (approach.ApproachProcess.Qualities.Any(e => e.Name == quality.Name))
        {
            throw new DuplicateElementException(
                $"Quality with name '{quality.Name}' is already a process attribute of the given refactoring approach(ID: {approachId}).");
        }

        var savedQuality = _processService.GetProcessQuality(quality.Name, ref db);
        approach.ApproachProcess.Qualities.Add(savedQuality);
        db.SaveChanges();
    }

    public void RemoveQualityFromProcess(int approachId, string qualityName)
    {
        var db = new RefactoringApproachContext();

        var approach = GetRefactoringApproach(approachId, ref db);

        if (approach.ApproachProcess.Qualities.IsNullOrEmpty())
            return;

        var quality = approach.ApproachProcess.Qualities!.FirstOrDefault(e => e.Name == qualityName);
        if (quality == null)
        {
            throw new ElementNotFoundException(
                $"Quality with name '{qualityName}' is not a process attribute of the given refactoring approach(ID: {approachId}).");
        }

        approach.ApproachProcess.Qualities!.Remove(quality);
        db.SaveChanges();
    }

    public void AddDirectionToProcess(int approachId, Direction direction)
    {
        var db = new RefactoringApproachContext();

        var approach = GetRefactoringApproach(approachId, ref db);

        approach.ApproachProcess.Directions ??= new List<Direction>();
        if (approach.ApproachProcess.Directions.Any(e => e.Name == direction.Name))
        {
            throw new DuplicateElementException(
                $"Direction with name '{direction.Name}' is already a process attribute of the given refactoring approach(ID: {approachId}).");
        }

        var savedDirection = _processService.GetProcessDirection(direction.Name, ref db);
        approach.ApproachProcess.Directions.Add(savedDirection);
        db.SaveChanges();
    }

    public void RemoveDirectionFromProcess(int approachId, string directionName)
    {
        var db = new RefactoringApproachContext();

        var approach = GetRefactoringApproach(approachId, ref db);

        if (approach.ApproachProcess.Directions.IsNullOrEmpty())
            return;

        var direction = approach.ApproachProcess.Directions!.FirstOrDefault(e => e.Name == directionName);
        if (direction == null)
        {
            throw new ElementNotFoundException(
                $"Direction with name '{directionName}' is not a process attribute of the given refactoring approach(ID: {approachId}).");
        }

        approach.ApproachProcess.Directions!.Remove(direction);
        db.SaveChanges();
    }

    public void AddAutomationLevelToProcess(int approachId, AutomationLevel automationLevel)
    {
        var db = new RefactoringApproachContext();

        var approach = GetRefactoringApproach(approachId, ref db);

        approach.ApproachProcess.AutomationLevels ??= new List<AutomationLevel>();
        if (approach.ApproachProcess.AutomationLevels.Any(e => e.Name == automationLevel.Name))
        {
            throw new DuplicateElementException(
                $"Automation level with name '{automationLevel.Name}' is already a process attribute of the given refactoring approach(ID: {approachId}).");
        }

        var savedAutomationLevel = _processService.GetProcessAutomationLevel(automationLevel.Name, ref db);
        approach.ApproachProcess.AutomationLevels.Add(savedAutomationLevel);
        db.SaveChanges();
    }

    public void RemoveAutomationLevelFromProcess(int approachId, string automationLevelName)
    {
        var db = new RefactoringApproachContext();

        var approach = GetRefactoringApproach(approachId, ref db);

        if (approach.ApproachProcess.AutomationLevels.IsNullOrEmpty())
            return;

        var automationLevel =
            approach.ApproachProcess.AutomationLevels!.FirstOrDefault(e => e.Name == automationLevelName);
        if (automationLevel == null)
        {
            throw new ElementNotFoundException(
                $"Automation level with name '{automationLevelName}' is not a process attribute of the given refactoring approach(ID: {approachId}).");
        }

        approach.ApproachProcess.AutomationLevels!.Remove(automationLevel);
        db.SaveChanges();
    }

    public void AddAnalysisTypeToProcess(int approachId, AnalysisType analysisType)
    {
        var db = new RefactoringApproachContext();

        var approach = GetRefactoringApproach(approachId, ref db);

        approach.ApproachProcess.AnalysisTypes ??= new List<AnalysisType>();
        if (approach.ApproachProcess.AnalysisTypes.Any(e => e.Name == analysisType.Name))
        {
            throw new DuplicateElementException(
                $"Analysis type with name '{analysisType.Name}' is already a process attribute of the given refactoring approach(ID: {approachId}).");
        }

        var savedAnalysisType = _processService.GetProcessAnalysisType(analysisType.Name, ref db);
        approach.ApproachProcess.AnalysisTypes.Add(savedAnalysisType);
        db.SaveChanges();
    }

    public void RemoveAnalysisTypeFromProcess(int approachId, string analysisTypeName)
    {
        var db = new RefactoringApproachContext();

        var approach = GetRefactoringApproach(approachId, ref db);

        if (approach.ApproachProcess.AnalysisTypes.IsNullOrEmpty())
            return;

        var analysisType = approach.ApproachProcess.AnalysisTypes!.FirstOrDefault(e => e.Name == analysisTypeName);
        if (analysisType == null)
        {
            throw new ElementNotFoundException(
                $"Analysis type with name '{analysisTypeName}' is not a process attribute of the given refactoring approach(ID: {approachId}).");
        }

        approach.ApproachProcess.AnalysisTypes!.Remove(analysisType);
        db.SaveChanges();
    }

    public void AddTechniqueToProcess(int approachId, Technique technique)
    {
        var db = new RefactoringApproachContext();

        var approach = GetRefactoringApproach(approachId, ref db);

        approach.ApproachProcess.Techniques ??= new List<Technique>();
        if (approach.ApproachProcess.Techniques.Any(e => e.Name == technique.Name))
        {
            throw new DuplicateElementException(
                $"Technique with name '{technique.Name}' is already a process attribute of the given refactoring approach(ID: {approachId}).");
        }

        var savedTechnique = _processService.GetProcessTechnique(technique.Name, ref db);
        approach.ApproachProcess.Techniques.Add(savedTechnique);
        db.SaveChanges();
    }

    public void RemoveTechniqueFromProcess(int approachId, string techniqueName)
    {
        var db = new RefactoringApproachContext();

        var approach = GetRefactoringApproach(approachId, ref db);

        if (approach.ApproachProcess.Techniques.IsNullOrEmpty())
            return;

        var technique = approach.ApproachProcess.Techniques!.FirstOrDefault(e => e.Name == techniqueName);
        if (technique == null)
        {
            throw new ElementNotFoundException(
                $"Technique with name '{techniqueName}' is not a process attribute of the given refactoring approach(ID: {approachId}).");
        }

        approach.ApproachProcess.Techniques!.Remove(technique);
        db.SaveChanges();
    }

    public void AddOutput(int approachId, ApproachOutput output)
    {
        var db = new RefactoringApproachContext();

        var approach = GetRefactoringApproach(approachId, ref db);

        approach.ApproachOutputs ??= new List<ApproachOutput>();
        if (approach.ApproachOutputs.Any(e =>
                e.Architecture.Name == output.Architecture.Name && e.ServiceType.Name == output.ServiceType.Name))
        {
            throw new DuplicateElementException(
                $"Output with architecture name '{output.Architecture.Name}' and service type name {output.ServiceType.Name} is already an output of the given refactoring approach(ID: {approachId}).");
        }

        var savedOutput = _outputService.AddApproachOutputIfNotExists(output, ref db);
        approach.ApproachOutputs.Add(savedOutput);
        db.SaveChanges();
    }

    public void RemoveOutput(int approachId, int outputId)
    {
        var db = new RefactoringApproachContext();

        var approach = GetRefactoringApproach(approachId, ref db);

        if (approach.ApproachOutputs.IsNullOrEmpty())
            return;

        var output = approach.ApproachOutputs!.FirstOrDefault(e => e.ApproachOutputId == outputId);
        if (output == null)
        {
            throw new ElementNotFoundException(
                $"Output(ID '{outputId}') is not an output of the given refactoring approach(ID: {approachId}).");
        }

        approach.ApproachOutputs!.Remove(output);
        db.SaveChanges();
    }

    public void UpdateResultsQuality(int approachId, ResultsQuality resultsQuality)
    {
        var db = new RefactoringApproachContext();

        var approach = GetRefactoringApproach(approachId, ref db);

        if (approach.ApproachUsability.ResultsQuality.Name == resultsQuality.Name)
            return;

        approach.ApproachUsability.ResultsQuality = _usabilityService.GetResultsQuality(resultsQuality.Name, ref db);
        db.SaveChanges();
    }

    public void UpdateToolSupport(int approachId, ToolSupport toolSupport)
    {
        var db = new RefactoringApproachContext();

        var approach = GetRefactoringApproach(approachId, ref db);

        if (approach.ApproachUsability.ToolSupport.Name == toolSupport.Name)
            return;

        approach.ApproachUsability.ToolSupport = _usabilityService.GetToolSupport(toolSupport.Name, ref db);
        db.SaveChanges();
    }

    public void UpdateAccuracyPrecision(int approachId, AccuracyPrecision accuracyPrecision)
    {
        var db = new RefactoringApproachContext();

        var approach = GetRefactoringApproach(approachId, ref db);

        if (approach.ApproachUsability.AccuracyPrecision.Name == accuracyPrecision.Name)
            return;

        approach.ApproachUsability.AccuracyPrecision =
            _usabilityService.GetAccuracyPrecision(accuracyPrecision.Name, ref db);
        db.SaveChanges();
    }

    public void UpdateValidationMethod(int approachId, ValidationMethod validationMethod)
    {
        var db = new RefactoringApproachContext();

        var approach = GetRefactoringApproach(approachId, ref db);

        if (approach.ApproachUsability.ValidationMethod.Name == validationMethod.Name)
            return;

        approach.ApproachUsability.ValidationMethod =
            _usabilityService.GetValidationMethod(validationMethod.Name, ref db);
        db.SaveChanges();
    }

    private static void LoadAllData(ref IQueryable<RefactoringApproach> query)
    {
        query.Include(e => e.DomainArtifactInputs!)
            .Load();

        query.Include(e => e.RuntimeArtifactInputs!)
            .Load();

        query.Include(e => e.ModelArtifactInputs!)
            .Load();

        query.Include(e => e.ExecutableInputs!)
            .Load();

        query.Include(e => e.ApproachProcess)
            .ThenInclude(e => e.Qualities)
            .Load();

        query.Include(e => e.ApproachProcess)
            .ThenInclude(e => e.Directions!)
            .Load();

        query.Include(e => e.ApproachProcess)
            .ThenInclude(e => e.AutomationLevels!)
            .Load();

        query.Include(e => e.ApproachProcess)
            .ThenInclude(e => e.AnalysisTypes!)
            .Load();

        query.Include(e => e.ApproachProcess)
            .ThenInclude(e => e.Techniques!)
            .Load();

        query.Include(e => e.ApproachOutputs)!
            .ThenInclude(e => e.Architecture)
            .Load();

        query.Include(e => e.ApproachOutputs)!
            .ThenInclude(e => e.ServiceType)
            .Load();

        query.Select(e => e.ApproachUsability)
            .Select(e => e.ValidationMethod)
            .Load();

        query.Select(e => e.ApproachUsability)
            .Select(e => e.ToolSupport)
            .Load();

        query.Select(e => e.ApproachUsability)
            .Select(e => e.ResultsQuality)
            .Load();

        query.Select(e => e.ApproachUsability)
            .Select(e => e.AccuracyPrecision)
            .Load();
    }
}
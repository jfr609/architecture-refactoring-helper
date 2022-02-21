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
                _processService.AddApproachProcessIfNotExists(refactoringApproach.ApproachProcess);
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
                _usabilityService.AddApproachUsabilityIfNotExists(refactoringApproach.ApproachUsabilitiy);
            db.ApproachUsabilities.Attach(preparedRefactoringApproach.ApproachUsabilitiy);

            var newRefactoringApproach = db.RefactoringApproaches.Update(preparedRefactoringApproach).Entity;
            db.SaveChanges();
            return newRefactoringApproach;
        }
    }

    public void UpdateRefactoringApproach(int refactoringApproachId, RefactoringApproach refactoringApproach)
    {
        using (var db = new RefactoringApproachContext())
        {
            db.RefactoringApproaches.Update(refactoringApproach);
            db.SaveChanges();
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
            {
                return;
            }

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
            {
                return;
            }

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
            {
                return;
            }

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
            {
                return;
            }

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
}
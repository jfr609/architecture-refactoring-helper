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
                throw new ElementNotFoundExceptions($"Refactoring approach with ID '{refactoringApproachId}' does not exist.");
            }
            
            return refactoringApproach;
        }
    }

    public RefactoringApproach AddRefactoringApproach(RefactoringApproach refactoringApproach)
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
                savedDomainArtifactInputs.AddRange(refactoringApproach.DomainArtifactInputs.Select(input => _inputService.GetDomainArtifactInput(input.Name)));
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
                    refactoringApproach.ApproachOutputs.Select(output => _outputService.AddApproachOutput(output)));
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
}
using Microsoft.EntityFrameworkCore;
using Repository.Exceptions;
using Repository.Models;
using Repository.Models.Database;

namespace Repository.Services;

public class ApproachOutputService
{
    public IEnumerable<ApproachOutput> ListApproachOutputs()
    {
        var db = new RefactoringApproachContext();

        IQueryable<ApproachOutput> query = db.ApproachOutputs
            .IncludeAllApproachOutputData()
            .OrderBy(e => e.Architecture.Name)
            .ThenBy(e => e.ServiceType.Name);
        var result = query.ToList();

        return result;
    }

    public IEnumerable<Architecture> ListArchitectures()
    {
        var db = new RefactoringApproachContext();

        return db.Architectures
            .OrderBy(e => e.Name)
            .ToList();
    }

    public IEnumerable<ServiceType> ListServiceTypes()
    {
        var db = new RefactoringApproachContext();

        return db.ServiceTypes
            .OrderBy(e => e.Name)
            .ToList();
    }

    public ApproachOutput GetApproachOutput(int outputId)
    {
        var db = new RefactoringApproachContext();
        return GetApproachOutput(outputId, ref db);
    }

    public ApproachOutput GetApproachOutput(int outputId, ref RefactoringApproachContext db)
    {
        IQueryable<ApproachOutput> query = db.ApproachOutputs
            .Where(e => e.ApproachOutputId == outputId)
            .IncludeAllApproachOutputData();
        var result = query.FirstOrDefault();

        if (result == null)
        {
            throw new ElementNotFoundException($"Approach output with ID '{outputId}' does not exist.");
        }

        return result;
    }

    public Architecture GetOutputArchitecture(string architectureName)
    {
        var db = new RefactoringApproachContext();
        return GetOutputArchitecture(architectureName, ref db);
    }

    public Architecture GetOutputArchitecture(string architectureName, ref RefactoringApproachContext db)
    {
        return db.Architectures.Find(architectureName) ??
               throw new ElementNotFoundException(
                   $"Output architecture with name '{architectureName}' does not exist.");
    }

    public ServiceType GetOutputServiceType(string serviceTypeName)
    {
        var db = new RefactoringApproachContext();
        return GetOutputServiceType(serviceTypeName, ref db);
    }

    public ServiceType GetOutputServiceType(string serviceTypeName, ref RefactoringApproachContext db)
    {
        return db.ServiceTypes.Find(serviceTypeName) ??
               throw new ElementNotFoundException(
                   $"Output service type with name '{serviceTypeName}' does not exist.");
    }

    public ApproachOutput AddApproachOutputIfNotExists(ApproachOutput output)
    {
        var db = new RefactoringApproachContext();
        var savedOutput = AddApproachOutputIfNotExists(output, ref db);
        db.SaveChanges();
        return savedOutput;
    }

    public ApproachOutput AddApproachOutputIfNotExists(ApproachOutput output, ref RefactoringApproachContext db)
    {
        var savedOutput = FindDuplicateApproachOutput(output, ref db);
        return savedOutput ?? AddApproachOutput(output, ref db);
    }

    private ApproachOutput AddApproachOutput(ApproachOutput output, ref RefactoringApproachContext db)
    {
        var preparedOutput = new ApproachOutput
        {
            Architecture = GetOutputArchitecture(output.Architecture.Name, ref db),
            ServiceType = GetOutputServiceType(output.ServiceType.Name, ref db)
        };

        return Utils.AddEntity(preparedOutput, ref db);
    }

    public ICollection<ApproachOutput> AddApproachOutputsIfNotExist(ICollection<ApproachOutput>? outputs)
    {
        var db = new RefactoringApproachContext();
        return AddApproachOutputsIfNotExist(outputs, ref db);
    }

    public ICollection<ApproachOutput> AddApproachOutputsIfNotExist(ICollection<ApproachOutput>? outputs,
        ref RefactoringApproachContext db)
    {
        if (outputs == null || !outputs.Any())
            return new List<ApproachOutput>();

        var distinctOutputs = outputs.Distinct().ToList();

        var savedOutputs = new List<ApproachOutput>();
        foreach (var output in distinctOutputs)
        {
            var duplicateOutput = FindDuplicateApproachOutput(output, ref db);
            if (duplicateOutput != null)
            {
                savedOutputs.Add(duplicateOutput);
                break;
            }

            var newOutput = new ApproachOutput
            {
                Architecture = GetOutputArchitecture(output.Architecture.Name, ref db),
                ServiceType = GetOutputServiceType(output.ServiceType.Name, ref db)
            };
            savedOutputs.Add(db.ApproachOutputs.Add(newOutput).Entity);
        }

        return savedOutputs;
    }

    public Architecture AddArchitecture(Architecture architecture)
    {
        var db = new RefactoringApproachContext();
        return Utils.AddEntityAndSaveChanges(architecture, ref db);
    }

    public Architecture AddArchitecture(Architecture architecture, ref RefactoringApproachContext db)
    {
        return Utils.AddEntity(architecture, ref db);
    }

    public ServiceType AddServiceType(ServiceType serviceType)
    {
        var db = new RefactoringApproachContext();
        return Utils.AddEntityAndSaveChanges(serviceType, ref db);
    }

    public ServiceType AddServiceType(ServiceType serviceType, ref RefactoringApproachContext db)
    {
        return Utils.AddEntity(serviceType, ref db);
    }

    public void DeleteArchitecture(string name)
    {
        var db = new RefactoringApproachContext();
        var deleteSuccess = Utils.DeleteEntity<Architecture>(ref db, name);
        if (!deleteSuccess)
            throw new ElementNotFoundException(
                $"Output architecture with name {name} could not be deleted because entity does not exist");
    }

    public void DeleteServiceType(string name)
    {
        var db = new RefactoringApproachContext();
        var deleteSuccess = Utils.DeleteEntity<ServiceType>(ref db, name);
        if (!deleteSuccess)
            throw new ElementNotFoundException(
                $"Output service type with name {name} could not be deleted because entity does not exist");
    }

    private ApproachOutput? FindDuplicateApproachOutput(ApproachOutput output, ref RefactoringApproachContext db)
    {
        return db.ApproachOutputs
            .Where(e => e.Architecture.Name == output.Architecture.Name)
            .Where(e => e.ServiceType.Name == output.ServiceType.Name)
            .IncludeAllApproachOutputData()
            .FirstOrDefault();
    }
}
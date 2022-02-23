using Microsoft.EntityFrameworkCore;
using Repository.Exceptions;
using Repository.Models;

namespace Repository.Services;

public class ApproachOutputService
{
    public IEnumerable<ApproachOutput> ListApproachOutputs()
    {
        using (var db = new RefactoringApproachContext())
        {
            var list = db.ApproachOutputs
                .IncludeAllApproachOutputData()
                .ToList();
            return list;
        }
    }

    public IEnumerable<Architecture> ListArchitectures()
    {
        using (var db = new RefactoringApproachContext())
        {
            return db.Architectures.ToList();
        }
    }

    public IEnumerable<ServiceType> ListServiceTypes()
    {
        using (var db = new RefactoringApproachContext())
        {
            return db.ServiceTypes.ToList();
        }
    }

    public ApproachOutput GetApproachOutput(int outputId)
    {
        var db = new RefactoringApproachContext();
        return GetApproachOutput(outputId, ref db);
    }

    public ApproachOutput GetApproachOutput(int outputId, ref RefactoringApproachContext db)
    {
        return db.ApproachOutputs
                   .Where(e => e.ApproachOutputId == outputId)
                   .IncludeAllApproachOutputData()
                   .FirstOrDefault() ??
               throw new ElementNotFoundException($"Approach output with ID '{outputId}' does not exist.");
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
        return AddApproachOutputIfNotExists(output, ref db);
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
            Architecture = GetOutputArchitecture(output.Architecture.Name),
            ServiceType = GetOutputServiceType(output.ServiceType.Name)
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

        db.SaveChanges();
        return savedOutputs;
    }

    public Architecture AddArchitecture(Architecture architecture)
    {
        var db = new RefactoringApproachContext();
        return AddArchitecture(architecture, ref db);
    }

    public Architecture AddArchitecture(Architecture architecture, ref RefactoringApproachContext db)
    {
        return Utils.AddEntity(architecture, ref db);
    }

    public ServiceType AddServiceType(ServiceType serviceType)
    {
        var db = new RefactoringApproachContext();
        return AddServiceType(serviceType, ref db);
    }

    public ServiceType AddServiceType(ServiceType serviceType, ref RefactoringApproachContext db)
    {
        return Utils.AddEntity(serviceType, ref db);
    }

    public void DeleteArchitecture(string name)
    {
        var db = new RefactoringApproachContext();
        var deleteSuccess = Utils.DeleteEntity<Architecture>(ref db, name);
        if (deleteSuccess)
            throw new ElementNotFoundException(
                $"Output architecture with name {name} could not be deleted because entity does not exist");
    }

    public void DeleteServiceType(string name)
    {
        var db = new RefactoringApproachContext();
        var deleteSuccess = Utils.DeleteEntity<ServiceType>(ref db, name);
        if (deleteSuccess)
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
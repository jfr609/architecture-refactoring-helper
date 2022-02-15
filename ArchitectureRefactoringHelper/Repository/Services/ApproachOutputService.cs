using Microsoft.EntityFrameworkCore;
using Repository.Models;

namespace Repository.Services;

public class ApproachOutputService
{
    public IEnumerable<ApproachOutput> ListApproachOutputs()
    {
        using (var db = new RefactoringApproachContext())
        {
            var list = db.ApproachOutputs
                .Include(e => e.Architecture)
                .Include(e => e.ServiceType)
                .ToList();
            Console.WriteLine(list.ToJsonString());

            return list;
        }
    }
    
    public ApproachOutput GetApproachOutput(int outputId)
    {
        using (var db = new RefactoringApproachContext())
        {
            return db.ApproachOutputs.Find(outputId) ?? throw new InvalidOperationException();
        }
    }

    public ApproachOutput AddApproachOutput(ApproachOutput output)
    {
        var preparedOutput = new ApproachOutput();
        using (var db = new RefactoringApproachContext())
        {
            preparedOutput.Architecture = db.Architectures.Find(output.Architecture.Name) ??
                                          throw new InvalidOperationException();
            preparedOutput.ServiceType = db.ServiceTypes.Find(output.ServiceType.Name) ?? 
                                         throw new InvalidOperationException();

            var savedOutput = db.ApproachOutputs.Add(preparedOutput);
            db.SaveChanges();
            return savedOutput.Entity;
        }
    }

    public void AddApproachOutputs(IEnumerable<ApproachOutput>? outputs)
    {
        if (outputs == null)
            return;

        using (var db = new RefactoringApproachContext())
        {
            foreach (var output in outputs)
            {
                var preparedOutput = new ApproachOutput();
                preparedOutput.Architecture = db.Architectures.Find(output.Architecture.Name) ??
                                              throw new InvalidOperationException();
                preparedOutput.ServiceType = db.ServiceTypes.Find(output.ServiceType.Name) ??
                                             throw new InvalidOperationException();
                db.ApproachOutputs.Add(preparedOutput);
            }

            db.SaveChanges();
        }
    }
    
    public void AddArchitecture(Architecture architecture)
    {
        using (var db = new RefactoringApproachContext())
        {
            db.Architectures.Add(architecture);
            db.SaveChanges();
        }
    }
    
    public void AddServiceType(ServiceType serviceType)
    {
        using (var db = new RefactoringApproachContext())
        {
            db.ServiceTypes.Add(serviceType);
            db.SaveChanges();
        }
    }
}
using Microsoft.EntityFrameworkCore;
using Repository.Models;

namespace Repository.Services;

public class ApproachUsabilityService
{
    public IEnumerable<ApproachUsability> ListApproachUsabilities()
    {
        using (var db = new RefactoringApproachContext())
        {
            var list = db.ApproachUsabilities
                .Include(e => e.ResultsQualitiy)
                .Include(e => e.ToolSupport)
                .Include(e => e.AccuracyPrecision)
                .Include(e => e.ValidationMethod)
                .ToList();
            Console.WriteLine(list.ToJsonString());

            return list;
        }
    }

    public ApproachUsability GetApproachUsability(int usabilityId)
    {
        using (var db = new RefactoringApproachContext())
        {
            return db.ApproachUsabilities.Find(usabilityId) ?? throw new InvalidOperationException();
        }
    }

    public ApproachUsability AddApproachUsability(ApproachUsability usability)
    {
        var preparedUsability = new ApproachUsability();
        using (var db = new RefactoringApproachContext())
        {
            preparedUsability.ResultsQualitiy = db.ResultsQualities.Find(usability.ResultsQualitiy.Name) ??
                                                throw new InvalidOperationException();
            preparedUsability.ToolSupport = db.ToolSupports.Find(usability.ToolSupport.Name) ??
                                            throw new InvalidOperationException();
            preparedUsability.AccuracyPrecision = db.AccuracyPrecisions.Find(usability.AccuracyPrecision.Name) ??
                                                  throw new InvalidOperationException();
            preparedUsability.ValidationMethod = db.ValidationMethods.Find(usability.ValidationMethod.Name) ??
                                                 throw new InvalidOperationException();

            var savedUsability = db.ApproachUsabilities.Add(preparedUsability);
            db.SaveChanges();
            return savedUsability.Entity;
        }
    }
}
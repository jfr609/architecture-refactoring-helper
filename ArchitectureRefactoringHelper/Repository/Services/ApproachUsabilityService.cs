using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using Microsoft.EntityFrameworkCore.Query.Internal;
using Repository.Exceptions;
using Repository.Models;

namespace Repository.Services;

public class ApproachUsabilityService
{
    public IEnumerable<ApproachUsability> ListApproachUsabilities()
    {
        using (var db = new RefactoringApproachContext())
        {
            var list = db.ApproachUsabilities
                .IncludeAllApproachUsabilityData()
                .ToList();
            return list;
        }
    }

    public IEnumerable<ResultsQuality> ListResultsQualities()
    {
        using (var db = new RefactoringApproachContext())
        {
            return db.ResultsQualities.ToList();
        }
    }

    public IEnumerable<ToolSupport> ListToolSupports()
    {
        using (var db = new RefactoringApproachContext())
        {
            return db.ToolSupports.ToList();
        }
    }

    public IEnumerable<AccuracyPrecision> ListAccuracyPrecisions()
    {
        using (var db = new RefactoringApproachContext())
        {
            return db.AccuracyPrecisions.ToList();
        }
    }

    public IEnumerable<ValidationMethod> ListValidationMethods()
    {
        using (var db = new RefactoringApproachContext())
        {
            return db.ValidationMethods.ToList();
        }
    }

    public ApproachUsability GetApproachUsability(int usabilityId)
    {
        using (var db = new RefactoringApproachContext())
        {
            var approachUsability = db.ApproachUsabilities
                .Where(e => e.ApproachUsabilityId == usabilityId)
                .IncludeAllApproachUsabilityData()
                .FirstOrDefault();
            if (approachUsability == null)
            {
                throw new ElementNotFoundException($"Usability definition with ID '{usabilityId}' does not exist");
            }

            return approachUsability;
        }
    }

    public ApproachUsability AddApproachUsabilityIfNotExists(ApproachUsability usability)
    {
        var savedUsability = FindDuplicateApproachUsability(usability);
        return savedUsability ?? AddApproachUsability(usability);
    }

    private ApproachUsability AddApproachUsability(ApproachUsability usability)
    {
        using (var db = new RefactoringApproachContext())
        {
            var preparedUsability = new ApproachUsability
            {
                ResultsQualitiy = db.ResultsQualities.Find(usability.ResultsQualitiy.Name) ??
                                  throw new InvalidOperationException(),
                ToolSupport = db.ToolSupports.Find(usability.ToolSupport.Name) ??
                              throw new InvalidOperationException(),
                AccuracyPrecision = db.AccuracyPrecisions.Find(usability.AccuracyPrecision.Name) ??
                                    throw new InvalidOperationException(),
                ValidationMethod = db.ValidationMethods.Find(usability.ValidationMethod.Name) ??
                                   throw new InvalidOperationException()
            };

            var savedUsability = db.ApproachUsabilities.Add(preparedUsability);
            db.SaveChanges();
            return savedUsability.Entity;
        }
    }

    public ResultsQuality AddResultsQuality(ResultsQuality resultsQuality)
    {
        using (var db = new RefactoringApproachContext())
        {
            var savedResultsQuality = db.ResultsQualities.Add(resultsQuality).Entity;
            db.SaveChanges();
            return savedResultsQuality;
        }
    }

    public ToolSupport AddToolSupport(ToolSupport toolSupport)
    {
        using (var db = new RefactoringApproachContext())
        {
            var savedToolSupport = db.ToolSupports.Add(toolSupport).Entity;
            db.SaveChanges();
            return savedToolSupport;
        }
    }

    public AccuracyPrecision AddAccuracyPrecision(AccuracyPrecision accuracyPrecision)
    {
        using (var db = new RefactoringApproachContext())
        {
            var savedAccuracyPrecision = db.AccuracyPrecisions.Add(accuracyPrecision).Entity;
            db.SaveChanges();
            return savedAccuracyPrecision;
        }
    }

    public ValidationMethod AddValidationMethod(ValidationMethod validationMethod)
    {
        using (var db = new RefactoringApproachContext())
        {
            var savedValidationMethod = db.ValidationMethods.Add(validationMethod).Entity;
            db.SaveChanges();
            return savedValidationMethod;
        }
    }

    public void DeleteResultsQuality(string name)
    {
        using (var db = new RefactoringApproachContext())
        {
            var resultsQuality = db.ResultsQualities.Find(name);
            if (resultsQuality == null)
                return;
            db.ResultsQualities.Remove(resultsQuality);
            db.SaveChanges();
        }
    }

    public void DeleteToolSupport(string name)
    {
        using (var db = new RefactoringApproachContext())
        {
            var toolSupport = db.ToolSupports.Find(name);
            if (toolSupport == null)
                return;
            db.ToolSupports.Remove(toolSupport);
            db.SaveChanges();
        }
    }

    public void DeleteAccuracyPrecision(string name)
    {
        using (var db = new RefactoringApproachContext())
        {
            var accuracyPrecision = db.AccuracyPrecisions.Find(name);
            if (accuracyPrecision == null)
                return;
            db.AccuracyPrecisions.Remove(accuracyPrecision);
            db.SaveChanges();
        }
    }

    public void DeleteValidationMethod(string name)
    {
        using (var db = new RefactoringApproachContext())
        {
            var validationMethod = db.ValidationMethods.Find(name);
            if (validationMethod == null)
                return;
            db.ValidationMethods.Remove(validationMethod);
            db.SaveChanges();
        }
    }

    private ApproachUsability? FindDuplicateApproachUsability(ApproachUsability usability)
    {
        using (var db = new RefactoringApproachContext())
        {
            return db.ApproachUsabilities
                .Where(e => e.ResultsQualitiy.Equals(usability.ResultsQualitiy))
                .Where(e => e.ToolSupport.Equals(usability.ToolSupport))
                .Where(e => e.AccuracyPrecision.Equals(usability.AccuracyPrecision))
                .Where(e => e.ValidationMethod.Equals(usability.ValidationMethod))
                .IncludeAllApproachUsabilityData()
                .FirstOrDefault();
        }
    }
    

}
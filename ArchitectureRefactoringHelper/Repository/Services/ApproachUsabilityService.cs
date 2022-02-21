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
            return db.ApproachUsabilities
                       .Where(e => e.ApproachUsabilityId == usabilityId)
                       .IncludeAllApproachUsabilityData()
                       .FirstOrDefault() ??
                   throw new ElementNotFoundException($"Usability definition with ID '{usabilityId}' does not exist");
        }
    }

    public ResultsQuality GetResultsQuality(string resultsQualityName)
    {
        using (var db = new RefactoringApproachContext())
        {
            return db.ResultsQualities.Find(resultsQualityName) ??
                   throw new ElementNotFoundException(
                       $"Results quality with name '{resultsQualityName}' does not exist.");
        }
    }

    public ToolSupport GetToolSupport(string toolSupportName)
    {
        using (var db = new RefactoringApproachContext())
        {
            return db.ToolSupports.Find(toolSupportName) ??
                   throw new ElementNotFoundException(
                       $"Tool support with name '{toolSupportName}' does not exist.");
        }
    }

    public AccuracyPrecision GetAccuracyPrecision(string accuracyPrecisionName)
    {
        using (var db = new RefactoringApproachContext())
        {
            return db.AccuracyPrecisions.Find(accuracyPrecisionName) ??
                   throw new ElementNotFoundException(
                       $"Accuracy precision with name '{accuracyPrecisionName}' does not exist.");
        }
    }

    public ValidationMethod GetValidationMethod(string validationMethodName)
    {
        using (var db = new RefactoringApproachContext())
        {
            return db.ValidationMethods.Find(validationMethodName) ??
                   throw new ElementNotFoundException(
                       $"Validation method with name '{validationMethodName}' does not exist.");
        }
    }

    public ApproachUsability AddApproachUsability(ApproachUsability usability)
    {
        using (var db = new RefactoringApproachContext())
        {
            var preparedUsability = new ApproachUsability
            {
                ResultsQualitiy = GetResultsQuality(usability.ResultsQualitiy.Name),
                ToolSupport = GetToolSupport(usability.ToolSupport.Name),
                AccuracyPrecision = GetAccuracyPrecision(usability.AccuracyPrecision.Name),
                ValidationMethod = GetValidationMethod(usability.ValidationMethod.Name)
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
}
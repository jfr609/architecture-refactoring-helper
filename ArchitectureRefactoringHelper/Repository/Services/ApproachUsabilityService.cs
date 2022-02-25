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
        var db = new RefactoringApproachContext();

        return db.ApproachUsabilities
            .IncludeAllApproachUsabilityData()
            .ToList();
    }

    public IEnumerable<ResultsQuality> ListResultsQualities()
    {
        var db = new RefactoringApproachContext();

        return db.ResultsQualities
            .OrderBy(e => e.Name)
            .ToList();
    }

    public IEnumerable<ToolSupport> ListToolSupports()
    {
        var db = new RefactoringApproachContext();

        return db.ToolSupports
            .OrderBy(e => e.Name)
            .ToList();
    }

    public IEnumerable<AccuracyPrecision> ListAccuracyPrecisions()
    {
        var db = new RefactoringApproachContext();

        return db.AccuracyPrecisions
            .OrderBy(e => e.Name)
            .ToList();
    }

    public IEnumerable<ValidationMethod> ListValidationMethods()
    {
        var db = new RefactoringApproachContext();

        return db.ValidationMethods
            .OrderBy(e => e.Name)
            .ToList();
    }

    public ApproachUsability GetApproachUsability(int usabilityId)
    {
        var db = new RefactoringApproachContext();
        return GetApproachUsability(usabilityId, ref db);
    }

    public ApproachUsability GetApproachUsability(int usabilityId, ref RefactoringApproachContext db)
    {
        return db.ApproachUsabilities
                   .Where(e => e.ApproachUsabilityId == usabilityId)
                   .IncludeAllApproachUsabilityData()
                   .FirstOrDefault() ??
               throw new ElementNotFoundException($"Usability definition with ID '{usabilityId}' does not exist");
    }

    public ResultsQuality GetResultsQuality(string resultsQualityName)
    {
        var db = new RefactoringApproachContext();
        return GetResultsQuality(resultsQualityName, ref db);
    }

    public ResultsQuality GetResultsQuality(string resultsQualityName, ref RefactoringApproachContext db)
    {
        return db.ResultsQualities.Find(resultsQualityName) ??
               throw new ElementNotFoundException(
                   $"Results quality with name '{resultsQualityName}' does not exist.");
    }

    public ToolSupport GetToolSupport(string toolSupportName)
    {
        var db = new RefactoringApproachContext();
        return GetToolSupport(toolSupportName, ref db);
    }

    public ToolSupport GetToolSupport(string toolSupportName, ref RefactoringApproachContext db)
    {
        return db.ToolSupports.Find(toolSupportName) ??
               throw new ElementNotFoundException(
                   $"Tool support with name '{toolSupportName}' does not exist.");
    }

    public AccuracyPrecision GetAccuracyPrecision(string accuracyPrecisionName)
    {
        var db = new RefactoringApproachContext();
        return GetAccuracyPrecision(accuracyPrecisionName, ref db);
    }

    public AccuracyPrecision GetAccuracyPrecision(string accuracyPrecisionName, ref RefactoringApproachContext db)
    {
        return db.AccuracyPrecisions.Find(accuracyPrecisionName) ??
               throw new ElementNotFoundException(
                   $"Accuracy precision with name '{accuracyPrecisionName}' does not exist.");
    }

    public ValidationMethod GetValidationMethod(string validationMethodName)
    {
        var db = new RefactoringApproachContext();
        return GetValidationMethod(validationMethodName, ref db);
    }

    public ValidationMethod GetValidationMethod(string validationMethodName, ref RefactoringApproachContext db)
    {
        return db.ValidationMethods.Find(validationMethodName) ??
               throw new ElementNotFoundException(
                   $"Validation method with name '{validationMethodName}' does not exist.");
    }

    public ApproachUsability AddApproachUsability(ApproachUsability usability)
    {
        var db = new RefactoringApproachContext();
        return AddApproachUsability(usability, ref db);
    }

    public ApproachUsability AddApproachUsability(ApproachUsability usability, ref RefactoringApproachContext db)
    {
        var preparedUsability = new ApproachUsability
        {
            ResultsQualitiy = GetResultsQuality(usability.ResultsQualitiy.Name, ref db),
            ToolSupport = GetToolSupport(usability.ToolSupport.Name, ref db),
            AccuracyPrecision = GetAccuracyPrecision(usability.AccuracyPrecision.Name, ref db),
            ValidationMethod = GetValidationMethod(usability.ValidationMethod.Name, ref db)
        };

        return Utils.AddEntity(preparedUsability, ref db);
    }

    public ResultsQuality AddResultsQuality(ResultsQuality resultsQuality)
    {
        var db = new RefactoringApproachContext();
        return AddResultsQuality(resultsQuality, ref db);
    }

    public ResultsQuality AddResultsQuality(ResultsQuality resultsQuality, ref RefactoringApproachContext db)
    {
        return Utils.AddEntity(resultsQuality, ref db);
    }

    public ToolSupport AddToolSupport(ToolSupport toolSupport)
    {
        var db = new RefactoringApproachContext();
        return AddToolSupport(toolSupport, ref db);
    }

    public ToolSupport AddToolSupport(ToolSupport toolSupport, ref RefactoringApproachContext db)
    {
        return Utils.AddEntity(toolSupport, ref db);
    }

    public AccuracyPrecision AddAccuracyPrecision(AccuracyPrecision accuracyPrecision)
    {
        var db = new RefactoringApproachContext();
        return AddAccuracyPrecision(accuracyPrecision, ref db);
    }

    public AccuracyPrecision AddAccuracyPrecision(AccuracyPrecision accuracyPrecision,
        ref RefactoringApproachContext db)
    {
        return Utils.AddEntity(accuracyPrecision, ref db);
    }

    public ValidationMethod AddValidationMethod(ValidationMethod validationMethod)
    {
        var db = new RefactoringApproachContext();
        return AddValidationMethod(validationMethod, ref db);
    }

    public ValidationMethod AddValidationMethod(ValidationMethod validationMethod, ref RefactoringApproachContext db)
    {
        return Utils.AddEntity(validationMethod, ref db);
    }

    public void DeleteResultsQuality(string name)
    {
        var db = new RefactoringApproachContext();
        var deleteSuccess = Utils.DeleteEntity<ResultsQuality>(ref db, name);
        if (deleteSuccess)
            throw new ElementNotFoundException(
                $"Results quality with name {name} could not be deleted because entity does not exist");
    }

    public void DeleteToolSupport(string name)
    {
        var db = new RefactoringApproachContext();
        var deleteSuccess = Utils.DeleteEntity<ToolSupport>(ref db, name);
        if (deleteSuccess)
            throw new ElementNotFoundException(
                $"Tool support with name {name} could not be deleted because entity does not exist");
    }

    public void DeleteAccuracyPrecision(string name)
    {
        var db = new RefactoringApproachContext();
        var deleteSuccess = Utils.DeleteEntity<AccuracyPrecision>(ref db, name);
        if (deleteSuccess)
            throw new ElementNotFoundException(
                $"Accuracy precision with name {name} could not be deleted because entity does not exist");
    }

    public void DeleteValidationMethod(string name)
    {
        var db = new RefactoringApproachContext();
        var deleteSuccess = Utils.DeleteEntity<ValidationMethod>(ref db, name);
        if (deleteSuccess)
            throw new ElementNotFoundException(
                $"Executable with name {name} could not be deleted because entity does not exist");
    }
}
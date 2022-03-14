using Repository.Exceptions;
using Repository.Models;
using Repository.Models.Database;

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
            .OrderBy(e => e.Name == Constants.AttributeDefaultNotAvailable)
            .ThenBy(e => e.Name == Constants.AttributeDefaultLow)
            .ThenBy(e => e.Name == Constants.AttributeDefaultMedium)
            .ThenBy(e => e.Name == Constants.AttributeDefaultHigh)
            .ToList();
    }

    public IEnumerable<ToolSupport> ListToolSupports()
    {
        var db = new RefactoringApproachContext();

        return db.ToolSupports
            .OrderBy(e => e.Name == Constants.AttributeDefaultNoToolSupport)
            .ToList();
    }

    public IEnumerable<AccuracyPrecision> ListAccuracyPrecisions()
    {
        var db = new RefactoringApproachContext();

        return db.AccuracyPrecisions
            .OrderBy(e => e.Name == Constants.AttributeDefaultNotAvailable)
            .ThenBy(e => e.Name == Constants.AttributeDefaultLow)
            .ThenBy(e => e.Name == Constants.AttributeDefaultMedium)
            .ThenBy(e => e.Name == Constants.AttributeDefaultHigh)
            .ToList();
    }

    public IEnumerable<ValidationMethod> ListValidationMethods()
    {
        var db = new RefactoringApproachContext();

        return db.ValidationMethods
            .OrderBy(e => e.Name == Constants.AttributeDefaultNoValidation)
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
               throw new EntityNotFoundException($"Usability definition with ID \"{usabilityId}\" does not exist");
    }

    public ResultsQuality GetResultsQuality(string name)
    {
        var db = new RefactoringApproachContext();
        return GetResultsQuality(name, ref db);
    }

    public ResultsQuality GetResultsQuality(string name, ref RefactoringApproachContext db)
    {
        return db.ResultsQualities.Find(name) ??
               throw new EntityNotFoundException(
                   $"Results quality option with name \"{name}\" does not exist.");
    }

    public ToolSupport GetToolSupport(string name)
    {
        var db = new RefactoringApproachContext();
        return GetToolSupport(name, ref db);
    }

    public ToolSupport GetToolSupport(string name, ref RefactoringApproachContext db)
    {
        return db.ToolSupports.Find(name) ??
               throw new EntityNotFoundException(
                   $"Tool support option with name \"{name}\" does not exist.");
    }

    public AccuracyPrecision GetAccuracyPrecision(string name)
    {
        var db = new RefactoringApproachContext();
        return GetAccuracyPrecision(name, ref db);
    }

    public AccuracyPrecision GetAccuracyPrecision(string name, ref RefactoringApproachContext db)
    {
        return db.AccuracyPrecisions.Find(name) ??
               throw new EntityNotFoundException(
                   $"Accuracy precision option with name \"{name}\" does not exist.");
    }

    public ValidationMethod GetValidationMethod(string name)
    {
        var db = new RefactoringApproachContext();
        return GetValidationMethod(name, ref db);
    }

    public ValidationMethod GetValidationMethod(string name, ref RefactoringApproachContext db)
    {
        return db.ValidationMethods.Find(name) ??
               throw new EntityNotFoundException(
                   $"Validation method option with name \"{name}\" does not exist.");
    }

    public ApproachUsability AddApproachUsability(ApproachUsability usability)
    {
        var db = new RefactoringApproachContext();
        var savedUsability = AddApproachUsability(usability, ref db);
        db.SaveChanges();
        return savedUsability;
    }

    public ApproachUsability AddApproachUsability(ApproachUsability usability, ref RefactoringApproachContext db)
    {
        var preparedUsability = new ApproachUsability
        {
            ResultsQuality = GetResultsQuality(usability.ResultsQuality.Name, ref db),
            ToolSupport = GetToolSupport(usability.ToolSupport.Name, ref db),
            AccuracyPrecision = GetAccuracyPrecision(usability.AccuracyPrecision.Name, ref db),
            ValidationMethod = GetValidationMethod(usability.ValidationMethod.Name, ref db)
        };

        return Utils.AddEntity(preparedUsability, ref db);
    }

    public ResultsQuality AddResultsQuality(ResultsQuality resultsQuality)
    {
        var db = new RefactoringApproachContext();
        return Utils.AddEntityAndSaveChanges(resultsQuality, ref db);
    }

    public ResultsQuality AddResultsQuality(ResultsQuality resultsQuality, ref RefactoringApproachContext db)
    {
        return Utils.AddEntity(resultsQuality, ref db);
    }

    public ToolSupport AddToolSupport(ToolSupport toolSupport)
    {
        var db = new RefactoringApproachContext();
        return Utils.AddEntityAndSaveChanges(toolSupport, ref db);
    }

    public ToolSupport AddToolSupport(ToolSupport toolSupport, ref RefactoringApproachContext db)
    {
        return Utils.AddEntity(toolSupport, ref db);
    }

    public AccuracyPrecision AddAccuracyPrecision(AccuracyPrecision accuracyPrecision)
    {
        var db = new RefactoringApproachContext();
        return Utils.AddEntityAndSaveChanges(accuracyPrecision, ref db);
    }

    public AccuracyPrecision AddAccuracyPrecision(AccuracyPrecision accuracyPrecision,
        ref RefactoringApproachContext db)
    {
        return Utils.AddEntity(accuracyPrecision, ref db);
    }

    public ValidationMethod AddValidationMethod(ValidationMethod validationMethod)
    {
        var db = new RefactoringApproachContext();
        return Utils.AddEntityAndSaveChanges(validationMethod, ref db);
    }

    public ValidationMethod AddValidationMethod(ValidationMethod validationMethod, ref RefactoringApproachContext db)
    {
        return Utils.AddEntity(validationMethod, ref db);
    }
    
    public void DeleteApproachUsability(int usabilityId, ref RefactoringApproachContext db)
    {
        var deleteSuccess = Utils.DeleteEntity<ApproachUsability>(ref db, usabilityId);
        if (!deleteSuccess)
            throw new EntityNotFoundException(
                $"Approach usability description with ID \"{usabilityId}\" could not be deleted " +
                "because entity does not exist");
    }

    public void DeleteResultsQuality(string name)
    {
        var db = new RefactoringApproachContext();

        var blockDelete = db.ResultsQualities
            .Where(e => e.Name == name)
            .Any(e => e.ApproachUsabilities!.Count > 0);
        if (blockDelete)
            throw new EntityReferenceException(
                $"Results quality option with name \"{name}\" could not be deleted " +
                "because the entity is still in use by refactoring approaches");

        var deleteSuccess = Utils.DeleteEntityAndSaveChanges<ResultsQuality>(ref db, name);
        if (!deleteSuccess)
            throw new EntityNotFoundException(
                $"Results quality option with name \"{name}\" could not be deleted " +
                $"because entity does not exist");
    }

    public void DeleteToolSupport(string name)
    {
        var db = new RefactoringApproachContext();

        var blockDelete = db.ToolSupports
            .Where(e => e.Name == name)
            .Any(e => e.ApproachUsabilities!.Count > 0);
        if (blockDelete)
            throw new EntityReferenceException(
                $"Tool support option with name \"{name}\" could not be deleted " +
                "because the entity is still in use by refactoring approaches");

        var deleteSuccess = Utils.DeleteEntityAndSaveChanges<ToolSupport>(ref db, name);
        if (!deleteSuccess)
            throw new EntityNotFoundException(
                $"Tool support option with name \"{name}\" could not be deleted " +
                $"because entity does not exist");
    }

    public void DeleteAccuracyPrecision(string name)
    {
        var db = new RefactoringApproachContext();

        var blockDelete = db.AccuracyPrecisions
            .Where(e => e.Name == name)
            .Any(e => e.ApproachUsabilities!.Count > 0);
        if (blockDelete)
            throw new EntityReferenceException(
                $"Accuracy/precision option with name \"{name}\" could not be deleted " +
                "because the entity is still in use by refactoring approaches");

        var deleteSuccess = Utils.DeleteEntityAndSaveChanges<AccuracyPrecision>(ref db, name);
        if (!deleteSuccess)
            throw new EntityNotFoundException(
                $"Accuracy/precision option with name \"{name}\" could not be deleted " +
                $"because entity does not exist");
    }

    public void DeleteValidationMethod(string name)
    {
        var db = new RefactoringApproachContext();

        var blockDelete = db.ValidationMethods
            .Where(e => e.Name == name)
            .Any(e => e.ApproachUsabilities!.Count > 0);
        if (blockDelete)
            throw new EntityReferenceException(
                $"Validation method option with name \"{name}\" could not be deleted " +
                "because the entity is still in use by refactoring approaches");

        var deleteSuccess = Utils.DeleteEntityAndSaveChanges<ValidationMethod>(ref db, name);
        if (!deleteSuccess)
            throw new EntityNotFoundException(
                $"Validation method option with name \"{name}\" could not be deleted " +
                $"because entity does not exist");
    }
}
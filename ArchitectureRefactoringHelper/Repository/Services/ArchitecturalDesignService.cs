using Microsoft.EntityFrameworkCore;
using Repository.Exceptions;
using Repository.Models;
using Repository.Models.Database;

namespace Repository.Services;

public class ArchitecturalDesignService
{
    private readonly ApproachProcessService _processService;


    public ArchitecturalDesignService(ApproachProcessService processService)
    {
        _processService = processService;
    }

    public IEnumerable<ArchitecturalDesign> ListArchitecturalDesigns(bool? withDetails)
    {
        var db = new RefactoringApproachContext();

        if (!withDetails.HasValue || !withDetails.Value)
            return db.ArchitecturalDesigns
                .Include(e => e.ArchitecturalDesignSource)
                .ToList();

        IQueryable<ArchitecturalDesign> query = db.ArchitecturalDesigns
            .Include(e => e.ArchitecturalDesignSource);
        var result = query.ToList();

        LoadAllData(ref query);

        return result;
    }

    public ArchitecturalDesign GetArchitecturalDesign(int architecturalDesignId)
    {
        var db = new RefactoringApproachContext();
        return GetArchitecturalDesign(architecturalDesignId, ref db);
    }

    public ArchitecturalDesign GetArchitecturalDesign(int architecturalDesignId, ref RefactoringApproachContext db)
    {
        IQueryable<ArchitecturalDesign> query = db.ArchitecturalDesigns
            .Where(e => e.ArchitecturalDesignId == architecturalDesignId)
            .Include(e => e.ArchitecturalDesignSource);
        var result = query.FirstOrDefault();

        LoadAllData(ref query);

        if (result == null)
        {
            throw new EntityNotFoundException(
                $"Architectural Design with ID \"{architecturalDesignId}\" does not exist.");
        }

        return result;
    }

    public ArchitecturalDesign AddArchitecturalDesignIfNotExists(ArchitecturalDesign architecturalDesign)
    {
        if (ExistsDuplicateArchitecturalDesign(architecturalDesign.ArchitecturalDesignSource))
        {
            throw new DuplicateElementException(
                $"A architectural design with the name \"{architecturalDesign.ArchitecturalDesignSource.Name}\" already exists. " +
                "If you want to change information regarding this design try updating the existing architectural design");
        }

        return AddArchitecturalDesign(architecturalDesign);
    }

    private ArchitecturalDesign AddArchitecturalDesign(ArchitecturalDesign architecturalDesign)
    {
        var db = new RefactoringApproachContext();

        var newDesign = new ArchitecturalDesign
        {
            Identifier = architecturalDesign.Identifier,
            Category = architecturalDesign.Category,
            ArchitecturalDesignSource = architecturalDesign.ArchitecturalDesignSource,
            ApproachProcess = _processService.AddApproachProcess(architecturalDesign.ApproachProcess, ref db)

        };

        return Utils.AddEntityAndSaveChanges(newDesign, ref db);
    }

    public void DeleteArchitecturalDesign(int rarchitecturalDesignId)
    {
        var db = new RefactoringApproachContext();

        var design = db.ArchitecturalDesigns.Find(rarchitecturalDesignId) ?? throw new EntityNotFoundException(
            $"Design with ID \"{rarchitecturalDesignId}\" could not be deleted because entity does not exist");

        Utils.DeleteEntity<ArchitecturalDesign>(ref db, rarchitecturalDesignId);
        Utils.DeleteEntity<ArchitecturalDesignSource>(ref db, design.ArchitecturalDesignSourceId);
        _processService.DeleteApproachProcess(design.ApproachProcessId, ref db);

        db.SaveChanges();
        db.Dispose();
    }

    private bool ExistsDuplicateArchitecturalDesign(ArchitecturalDesignSource source)
    {
        var db = new RefactoringApproachContext();

        var savedSource = db.ArchitecturalDesignSources.FirstOrDefault(e => e.Name.Equals(source.Name));

        return savedSource != null;
    }


    public void AddQualityToProcess(int architecturalDesignId, Quality quality)
    {
        var db = new RefactoringApproachContext();

        var design = GetArchitecturalDesign(architecturalDesignId, ref db);

        design.ApproachProcess.Qualities ??= new List<Quality>();
        if (design.ApproachProcess.Qualities.Any(e => e.Name == quality.Name))
        {
            throw new DuplicateElementException(
                $"Quality with name \"{quality.Name}\" is already a process attribute of the given refactoring design(ID: {architecturalDesignId}).");
        }

        var savedQuality = _processService.GetProcessQuality(quality.Name, ref db);
        design.ApproachProcess.Qualities.Add(savedQuality);
        db.SaveChanges();
    }

    public void RemoveQualityFromProcess(int architecturalDesignId, string qualityName)
    {
        var db = new RefactoringApproachContext();

        var design = GetArchitecturalDesign(architecturalDesignId, ref db);

        if (design.ApproachProcess.Qualities.IsNullOrEmpty())
            return;

        var quality = design.ApproachProcess.Qualities!.FirstOrDefault(e => e.Name == qualityName);
        if (quality == null)
        {
            throw new EntityNotFoundException(
                $"Quality with name \"{qualityName}\" is not a process attribute of the given architectural design (ID: {architecturalDesignId}).");
        }

        design.ApproachProcess.Qualities!.Remove(quality);
        db.SaveChanges();
    }

    public void AddQualitySublevelToProcess(int architecturalDesignId, QualitySublevel qualitySublevel)
    {
        var db = new RefactoringApproachContext();

        var design = GetArchitecturalDesign(architecturalDesignId, ref db);

        design.ApproachProcess.QualitySublevels ??= new List<QualitySublevel>();
        if (design.ApproachProcess.QualitySublevels.Any(e => e.Name == qualitySublevel.Name))
        {
            throw new DuplicateElementException(
                $"Quality Sublevel with name \"{qualitySublevel.Name}\" is already a process attribute of the given architectural design (ID: {architecturalDesignId}).");
        }

        var savedQualitySublevel = _processService.GetProcessQualitySublevel(qualitySublevel.Name, ref db);
        design.ApproachProcess.QualitySublevels.Add(savedQualitySublevel);
        db.SaveChanges();
    }

    public void RemoveQualitySublevelFromProcess(int architecturalDesignId, string qualitySublevelName)
    {
        var db = new RefactoringApproachContext();

        var design = GetArchitecturalDesign(architecturalDesignId, ref db);

        if (design.ApproachProcess.QualitySublevels.IsNullOrEmpty())
            return;

        var qualitySublevel = design.ApproachProcess.QualitySublevels!.FirstOrDefault(e => e.Name == qualitySublevelName);
        if (qualitySublevel == null)
        {
            throw new EntityNotFoundException(
                $"Quality with name \"{qualitySublevelName}\" is not a process attribute of the  given architectural design (ID: {architecturalDesignId}).");
        }

        design.ApproachProcess.QualitySublevels!.Remove(qualitySublevel);
        db.SaveChanges();
    }


    public void AddDirectionToProcess(int architecturalDesignId, Direction direction)
    {
        var db = new RefactoringApproachContext();

        var design = GetArchitecturalDesign(architecturalDesignId, ref db);

        design.ApproachProcess.Directions ??= new List<Direction>();
        if (design.ApproachProcess.Directions.Any(e => e.Name == direction.Name))
        {
            throw new DuplicateElementException(
                $"Direction with name \"{direction.Name}\" is already a process attribute of the given architectural design (ID: {architecturalDesignId}).");
        }

        var savedDirection = _processService.GetProcessDirection(direction.Name, ref db);
        design.ApproachProcess.Directions.Add(savedDirection);
        db.SaveChanges();
    }

    public void RemoveDirectionFromProcess(int architecturalDesignId, string directionName)
    {
        var db = new RefactoringApproachContext();

        var design = GetArchitecturalDesign(architecturalDesignId, ref db);

        if (design.ApproachProcess.Directions.IsNullOrEmpty())
            return;

        var direction = design.ApproachProcess.Directions!.FirstOrDefault(e => e.Name == directionName);
        if (direction == null)
        {
            throw new EntityNotFoundException(
                $"Direction with name \"{directionName}\" is not a process attribute of the given architectural design (ID: {architecturalDesignId}).");
        }

        design.ApproachProcess.Directions!.Remove(direction);
        db.SaveChanges();
    }

    public void AddAutomationLevelToProcess(int architecturalDesignId, AutomationLevel automationLevel)
    {
        var db = new RefactoringApproachContext();

        var design = GetArchitecturalDesign(architecturalDesignId, ref db);

        design.ApproachProcess.AutomationLevels ??= new List<AutomationLevel>();
        if (design.ApproachProcess.AutomationLevels.Any(e => e.Name == automationLevel.Name))
        {
            throw new DuplicateElementException(
                $"Automation level with name \"{automationLevel.Name}\" is already a process attribute of the given architectural design (ID: {architecturalDesignId}).");
        }

        var savedAutomationLevel = _processService.GetProcessAutomationLevel(automationLevel.Name, ref db);
        design.ApproachProcess.AutomationLevels.Add(savedAutomationLevel);
        db.SaveChanges();
    }

    public void RemoveAutomationLevelFromProcess(int architecturalDesignId, string automationLevelName)
    {
        var db = new RefactoringApproachContext();

        var design = GetArchitecturalDesign(architecturalDesignId, ref db);

        if (design.ApproachProcess.AutomationLevels.IsNullOrEmpty())
            return;

        var automationLevel =
            design.ApproachProcess.AutomationLevels!.FirstOrDefault(e => e.Name == automationLevelName);
        if (automationLevel == null)
        {
            throw new EntityNotFoundException(
                $"Automation level with name \"{automationLevelName}\" is not a process attribute of the given architectural design (ID: {architecturalDesignId}).");
        }

        design.ApproachProcess.AutomationLevels!.Remove(automationLevel);
        db.SaveChanges();
    }

    public void AddAnalysisTypeToProcess(int architecturalDesignId, AnalysisType analysisType)
    {
        var db = new RefactoringApproachContext();

        var design = GetArchitecturalDesign(architecturalDesignId, ref db);

        design.ApproachProcess.AnalysisTypes ??= new List<AnalysisType>();
        if (design.ApproachProcess.AnalysisTypes.Any(e => e.Name == analysisType.Name))
        {
            throw new DuplicateElementException(
                $"Analysis type with name \"{analysisType.Name}\" is already a process attribute of the given architectural design (ID: {architecturalDesignId}).");
        }

        var savedAnalysisType = _processService.GetProcessAnalysisType(analysisType.Name, ref db);
        design.ApproachProcess.AnalysisTypes.Add(savedAnalysisType);
        db.SaveChanges();
    }

    public void RemoveAnalysisTypeFromProcess(int architecturalDesignId, string analysisTypeName)
    {
        var db = new RefactoringApproachContext();

        var design = GetArchitecturalDesign(architecturalDesignId, ref db);

        if (design.ApproachProcess.AnalysisTypes.IsNullOrEmpty())
            return;

        var analysisType = design.ApproachProcess.AnalysisTypes!.FirstOrDefault(e => e.Name == analysisTypeName);
        if (analysisType == null)
        {
            throw new EntityNotFoundException(
                $"Analysis type with name \"{analysisTypeName}\" is not a process attribute of the given architectural design (ID: {architecturalDesignId}).");
        }

        design.ApproachProcess.AnalysisTypes!.Remove(analysisType);
        db.SaveChanges();
    }

    public void AddTechniqueToProcess(int architecturalDesignId, Technique technique)
    {
        var db = new RefactoringApproachContext();

        var design = GetArchitecturalDesign(architecturalDesignId, ref db);

        design.ApproachProcess.Techniques ??= new List<Technique>();
        if (design.ApproachProcess.Techniques.Any(e => e.Name == technique.Name))
        {
            throw new DuplicateElementException(
                $"Technique with name \"{technique.Name}\" is already a process attribute of the given architectural design (ID: {architecturalDesignId}).");
        }

        var savedTechnique = _processService.GetProcessTechnique(technique.Name, ref db);
        design.ApproachProcess.Techniques.Add(savedTechnique);
        db.SaveChanges();
    }

    public void RemoveTechniqueFromProcess(int architecturalDesignId, string techniqueName)
    {
        var db = new RefactoringApproachContext();

        var design = GetArchitecturalDesign(architecturalDesignId, ref db);

        if (design.ApproachProcess.Techniques.IsNullOrEmpty())
            return;

        var technique = design.ApproachProcess.Techniques!.FirstOrDefault(e => e.Name == techniqueName);
        if (technique == null)
        {
            throw new EntityNotFoundException(
                $"Technique with name \"{techniqueName}\" is not a process attribute of the given architectural design (ID: {architecturalDesignId}).");
        }

        design.ApproachProcess.Techniques!.Remove(technique);
        db.SaveChanges();
    }

    private static void LoadAllData(ref IQueryable<ArchitecturalDesign> query)
    {
        query.Include(e => e.ApproachProcess)
            .ThenInclude(e => e.Qualities)
            .Load();

        query.Include(e => e.ApproachProcess)
            .ThenInclude(e => e.QualitySublevels)
            .Load();

        query.Include(e => e.ApproachProcess)
            .ThenInclude(e => e.Directions!)
            .Load();

        query.Include(e => e.ApproachProcess)
            .ThenInclude(e => e.AutomationLevels!)
            .Load();

        query.Include(e => e.ApproachProcess)
            .ThenInclude(e => e.AnalysisTypes!)
            .Load();

        query.Include(e => e.ApproachProcess)
            .ThenInclude(e => e.Techniques!)
            .Load();
    }
}
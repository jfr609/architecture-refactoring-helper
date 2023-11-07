using Microsoft.EntityFrameworkCore;
using Repository.Exceptions;
using Repository.Models;
using Repository.Models.Database;

namespace Repository.Services;

public class ApproachProcessService
{
    public IEnumerable<ApproachProcess> ListApproachProcesses()
    {
        var db = new RefactoringApproachContext();

        IQueryable<ApproachProcess> query = db.ApproachProcesses;
        var result = query.ToList();

        LoadAllData(ref query);

        return result;
    }

    public IEnumerable<Quality> ListQualities()
    {
        var db = new RefactoringApproachContext();

        return db.Qualities
            .OrderBy(e => e.Category)
            .ThenBy(e => e.Name)
            .Include(e => e.QualitySublevels)
            .ToList();
    }

    public IEnumerable<QualitySublevel> ListQualitySublevels()
    {
        var db = new RefactoringApproachContext();

        return db.QualitySublevels
            .OrderBy(e => e.Name)
            .ToList();
    }

    public IEnumerable<Direction> ListDirections()
    {
        var db = new RefactoringApproachContext();

        return db.Directions
            .OrderBy(e => e.Name)
            .ToList();
    }

    public IEnumerable<AutomationLevel> ListAutomationLevels()
    {
        var db = new RefactoringApproachContext();

        return db.AutomationLevels
            .OrderBy(e => e.Name)
            .ToList();
    }

    public IEnumerable<AnalysisType> ListAnalysisTypes()
    {
        var db = new RefactoringApproachContext();

        return db.AnalysisTypes
            .OrderBy(e => e.Name)
            .ToList();
    }

    public IEnumerable<Technique> ListTechniques()
    {
        var db = new RefactoringApproachContext();

        return db.Techniques
            .OrderBy(e => e.Name)
            .ToList();
    }

    public IEnumerable<ProcessStrategy> ListProcessStrategies()
    {
        var db = new RefactoringApproachContext();

        return db.Strategies
            .OrderBy(e => e.Name)
            .ToList();
    }

    public IEnumerable<AtomarUnit> ListAtomarUnits()
    {
        var db = new RefactoringApproachContext();

        return db.AtomarUnits
            .OrderBy(e => e.Name)
            .ToList();
    }

    public ApproachProcess GetApproachProcess(int processId)
    {
        var db = new RefactoringApproachContext();
        return GetApproachProcess(processId, ref db);
    }

    public ApproachProcess GetApproachProcess(int processId, ref RefactoringApproachContext db)
    {
        var query = db.ApproachProcesses
            .Where(e => e.ApproachProcessId == processId);
        var result = query.FirstOrDefault();

        LoadAllData(ref query);

        if (result == null)
        {
            throw new EntityNotFoundException($"Approach process with ID \"{processId}\" does not exist.");
        }

        return result;
    }

    public Quality GetProcessQuality(string name)
    {
        var db = new RefactoringApproachContext();
        return GetProcessQuality(name, ref db);
    }

    public Quality GetProcessQuality(string name, ref RefactoringApproachContext db)
    {
        return db.Qualities.Find(name) ??
               throw new EntityNotFoundException($"Process quality with name \"{name}\" does not exist.");
    }

    public QualitySublevel GetProcessQualitySublevel(string name)
    {
        var db = new RefactoringApproachContext();
        return GetProcessQualitySublevel(name, ref db);
    }

    public QualitySublevel GetProcessQualitySublevel(string name, ref RefactoringApproachContext db)
    {
        return db.QualitySublevels.Find(name) ??
               throw new EntityNotFoundException($"Process quality sublevel with name \"{name}\" does not exist.");
    }

    public Direction GetProcessDirection(string name)
    {
        var db = new RefactoringApproachContext();
        return GetProcessDirection(name, ref db);
    }

    public Direction GetProcessDirection(string name, ref RefactoringApproachContext db)
    {
        return db.Directions.Find(name) ??
               throw new EntityNotFoundException($"Process direction with name \"{name}\" does not exist.");
    }

    public AutomationLevel GetProcessAutomationLevel(string name)
    {
        var db = new RefactoringApproachContext();
        return GetProcessAutomationLevel(name, ref db);
    }

    public AutomationLevel GetProcessAutomationLevel(string name, ref RefactoringApproachContext db)
    {
        return db.AutomationLevels.Find(name) ??
               throw new EntityNotFoundException(
                   $"Process automation level with name \"{name}\" does not exist.");
    }

    public AnalysisType GetProcessAnalysisType(string name)
    {
        var db = new RefactoringApproachContext();
        return GetProcessAnalysisType(name, ref db);
    }

    public AnalysisType GetProcessAnalysisType(string name, ref RefactoringApproachContext db)
    {
        return db.AnalysisTypes.Find(name) ??
               throw new EntityNotFoundException(
                   $"Process analysis type with name \"{name}\" does not exist.");
    }

    public Technique GetProcessTechnique(string name)
    {
        var db = new RefactoringApproachContext();
        return GetProcessTechnique(name, ref db);
    }

    public Technique GetProcessTechnique(string name, ref RefactoringApproachContext db)
    {
        return db.Techniques.Find(name) ??
               throw new EntityNotFoundException($"Process technique with name \"{name}\" does not exist.");
    }

    public ProcessStrategy GetProcessStrategy(string name)
    {
        var db = new RefactoringApproachContext();
        return GetProcessStrategy(name, ref db);
    }

    public ProcessStrategy GetProcessStrategy(string name, ref RefactoringApproachContext db)
    {
        return db.Strategies.Find(name) ??
               throw new EntityNotFoundException($"Process strategy with name \"{name}\" does not exist.");
    }

    public AtomarUnit GetAtomarUnit(string name)
    {
        var db = new RefactoringApproachContext();
        return GetAtomarUnit(name, ref db);
    }

    public AtomarUnit GetAtomarUnit(string name, ref RefactoringApproachContext db)
    {
        return db.AtomarUnits.Find(name) ??
               throw new EntityNotFoundException($"Atomar unit with name \"{name}\" does not exist.");
    }

    public ApproachProcess AddApproachProcess(ApproachProcess process)
    {
        var db = new RefactoringApproachContext();
        var savedProcess = AddApproachProcess(process, ref db);
        db.SaveChanges();
        return savedProcess;
    }

    public ApproachProcess AddApproachProcess(ApproachProcess process, ref RefactoringApproachContext db)
    {
        var preparedProcess = new ApproachProcess
        {
            Qualities = AddQualitiesIfNotExist(process.Qualities, ref db),
            QualitySublevels = AddQualitySublevelsIfNotExist(process.QualitySublevels, ref db),
            Directions = AddDirectionsIfNotExist(process.Directions, ref db),
            AutomationLevels = AddAutomationLevelsIfNotExist(process.AutomationLevels, ref db),
            AnalysisTypes = AddAnalysisTypesIfNotExist(process.AnalysisTypes, ref db),
            Techniques = AddTechniquesIfNotExist(process.Techniques, ref db),
            ProcessStrategies = AddProcessStrategiesIfNotExist(process.ProcessStrategies, ref db),
            AtomarUnits = AddAtomarUnitsIfNotExist(process.AtomarUnits, ref db)
        };

        return db.ApproachProcesses.Add(preparedProcess).Entity;
    }

    public Quality AddQuality(Quality quality)
    {
        var db = new RefactoringApproachContext();
        return Utils.AddEntityAndSaveChanges(quality, ref db);
    }

    public Quality AddQuality(Quality quality, ref RefactoringApproachContext db)
    {
        return Utils.AddEntity(quality, ref db);
    }

    public ICollection<Quality> AddQualitiesIfNotExist(ICollection<Quality>? qualities,
        ref RefactoringApproachContext db)
    {
        return Utils.AddEntitiesIfNotExist(qualities, e => new object[] { e.Name }, ref db);
    }

    public QualitySublevel AddQualitySublevel(QualitySublevel qualitySublevel)
    {
        var db = new RefactoringApproachContext();
        return Utils.AddEntityAndSaveChanges(qualitySublevel, ref db);
    }

    public QualitySublevel AddQualitySublevel(QualitySublevel qualitySublevel, ref RefactoringApproachContext db)
    {
        return Utils.AddEntity(qualitySublevel, ref db);
    }

    public ICollection<QualitySublevel> AddQualitySublevelsIfNotExist(ICollection<QualitySublevel>? qualitySublevels,
        ref RefactoringApproachContext db)
    {
        return Utils.AddEntitiesIfNotExist(qualitySublevels, e => new object[] { e.Name }, ref db);
    }

    public Direction AddDirection(Direction direction)
    {
        var db = new RefactoringApproachContext();
        return Utils.AddEntityAndSaveChanges(direction, ref db);
    }

    public Direction AddDirection(Direction direction, ref RefactoringApproachContext db)
    {
        return Utils.AddEntity(direction, ref db);
    }

    public ICollection<Direction> AddDirectionsIfNotExist(ICollection<Direction>? directions,
        ref RefactoringApproachContext db)
    {
        return Utils.AddEntitiesIfNotExist(directions, e => new object[] { e.Name }, ref db);
    }

    public AutomationLevel AddAutomationLevel(AutomationLevel automationLevel)
    {
        var db = new RefactoringApproachContext();
        return Utils.AddEntityAndSaveChanges(automationLevel, ref db);
    }

    public AutomationLevel AddAutomationLevel(AutomationLevel automationLevel, ref RefactoringApproachContext db)
    {
        return Utils.AddEntity(automationLevel, ref db);
    }

    public ICollection<AutomationLevel> AddAutomationLevelsIfNotExist(ICollection<AutomationLevel>? automationLevels,
        ref RefactoringApproachContext db)
    {
        return Utils.AddEntitiesIfNotExist(automationLevels, e => new object[] { e.Name }, ref db);
    }

    public AnalysisType AddAnalysisType(AnalysisType analysisType)
    {
        var db = new RefactoringApproachContext();
        return Utils.AddEntityAndSaveChanges(analysisType, ref db);
    }

    public AnalysisType AddAnalysisType(AnalysisType analysisType, ref RefactoringApproachContext db)
    {
        return Utils.AddEntity(analysisType, ref db);
    }

    public ICollection<AnalysisType> AddAnalysisTypesIfNotExist(ICollection<AnalysisType>? analysisTypes,
        ref RefactoringApproachContext db)
    {
        return Utils.AddEntitiesIfNotExist(analysisTypes, e => new object[] { e.Name }, ref db);
    }

    public Technique AddTechnique(Technique technique)
    {
        var db = new RefactoringApproachContext();
        return Utils.AddEntityAndSaveChanges(technique, ref db);
    }

    public Technique AddTechnique(Technique technique, ref RefactoringApproachContext db)
    {
        return Utils.AddEntity(technique, ref db);
    }

    public ICollection<Technique> AddTechniquesIfNotExist(ICollection<Technique>? techniques,
        ref RefactoringApproachContext db)
    {
        return Utils.AddEntitiesIfNotExist(techniques, e => new object[] { e.Name }, ref db);
    }

    public ProcessStrategy AddProcessStrategy(ProcessStrategy processStrategy)
    {
        var db = new RefactoringApproachContext();
        return Utils.AddEntityAndSaveChanges(processStrategy, ref db);
    }

    public ProcessStrategy AddProcessStrategy(ProcessStrategy processStrategy, ref RefactoringApproachContext db)
    {
        return Utils.AddEntity(processStrategy, ref db);
    }

    public ICollection<ProcessStrategy> AddProcessStrategiesIfNotExist(ICollection<ProcessStrategy>? processStrategies,
        ref RefactoringApproachContext db)
    {
        return Utils.AddEntitiesIfNotExist(processStrategies, e => new object[] { e.Name }, ref db);
    }

    public AtomarUnit AddAtomarUnit(AtomarUnit atomarUnit)
    {
        var db = new RefactoringApproachContext();
        return Utils.AddEntityAndSaveChanges(atomarUnit, ref db);
    }

    public AtomarUnit AddAtomarUnit(AtomarUnit atomarUnit, ref RefactoringApproachContext db)
    {
        return Utils.AddEntity(atomarUnit, ref db);
    }

    public ICollection<AtomarUnit> AddAtomarUnitsIfNotExist(ICollection<AtomarUnit>? atomarUnits,
        ref RefactoringApproachContext db)
    {
        return Utils.AddEntitiesIfNotExist(atomarUnits, e => new object[] { e.Name }, ref db);
    }

    public void DeleteApproachProcess(int processId, ref RefactoringApproachContext db)
    {
        var deleteSuccess = Utils.DeleteEntity<ApproachProcess>(ref db, processId);
        if (!deleteSuccess)
            throw new EntityNotFoundException(
                $"Approach process with ID \"{processId}\" could not be deleted " +
                "because entity does not exist");
    }

    public void DeleteQuality(string name)
    {
        var db = new RefactoringApproachContext();

        var blockDelete = db.Qualities
            .Where(e => e.Name == name)
            .Any(e => e.ApproachProcesses!.Count > 0);
        if (blockDelete)
            throw new EntityReferenceException(
                $"Process quality with name \"{name}\" could not be deleted " +
                "because the entity is still in use by refactoring approaches");

        var deleteSuccess = Utils.DeleteEntityAndSaveChanges<Quality>(ref db, name);
        if (!deleteSuccess)
            throw new EntityNotFoundException(
                $"Process quality with name \"{name}\" could not be deleted " +
                $"because entity does not exist");
    }

    public void DeleteQualitySublevel(string name)
    {
        var db = new RefactoringApproachContext();

        var blockDelete = db.QualitySublevels
            .Where(e => e.Name == name)
            .Any(e => e.ApproachProcesses!.Count > 0);
        if (blockDelete)
            throw new EntityReferenceException(
                $"Process quality sublevel with name \"{name}\" could not be deleted " +
                "because the entity is still in use by refactoring approaches");

        var deleteSuccess = Utils.DeleteEntityAndSaveChanges<QualitySublevel>(ref db, name);
        if (!deleteSuccess)
            throw new EntityNotFoundException(
                $"Process quality sublevel with name \"{name}\" could not be deleted " +
                $"because entity does not exist");
    }

    public void DeleteDirection(string name)
    {
        var db = new RefactoringApproachContext();

        var blockDelete = db.Directions
            .Where(e => e.Name == name)
            .Any(e => e.ApproachProcesses!.Count > 0);
        if (blockDelete)
            throw new EntityReferenceException(
                $"Process direction with name \"{name}\" could not be deleted " +
                "because the entity is still in use by refactoring approaches");

        var deleteSuccess = Utils.DeleteEntityAndSaveChanges<Direction>(ref db, name);
        if (!deleteSuccess)
            throw new EntityNotFoundException(
                $"Process direction with name \"{name}\" could not be deleted " +
                $"because entity does not exist");
    }

    public void DeleteAutomationLevel(string name)
    {
        var db = new RefactoringApproachContext();

        var blockDelete = db.AutomationLevels
            .Where(e => e.Name == name)
            .Any(e => e.ApproachProcesses!.Count > 0);
        if (blockDelete)
            throw new EntityReferenceException(
                $"Process automation level with name \"{name}\" could not be deleted " +
                "because the entity is still in use by refactoring approaches");

        var deleteSuccess = Utils.DeleteEntityAndSaveChanges<AutomationLevel>(ref db, name);
        if (!deleteSuccess)
            throw new EntityNotFoundException(
                $"Process automation level with name \"{name}\" could not be deleted " +
                $"because entity does not exist");
    }

    public void DeleteAnalysisType(string name)
    {
        var db = new RefactoringApproachContext();

        var blockDelete = db.AnalysisTypes
            .Where(e => e.Name == name)
            .Any(e => e.ApproachProcesses!.Count > 0);
        if (blockDelete)
            throw new EntityReferenceException(
                $"Process analysis type with name \"{name}\" could not be deleted " +
                "because the entity is still in use by refactoring approaches");

        var deleteSuccess = Utils.DeleteEntityAndSaveChanges<AnalysisType>(ref db, name);
        if (!deleteSuccess)
            throw new EntityNotFoundException(
                $"Process analysis type with name \"{name}\" could not be deleted " +
                $"because entity does not exist");
    }

    public void DeleteTechnique(string name)
    {
        var db = new RefactoringApproachContext();

        var blockDelete = db.Techniques
            .Where(e => e.Name == name)
            .Any(e => e.ApproachProcesses!.Count > 0);
        if (blockDelete)
            throw new EntityReferenceException(
                $"Process technique with name \"{name}\" could not be deleted " +
                "because the entity is still in use by refactoring approaches");

        var deleteSuccess = Utils.DeleteEntityAndSaveChanges<Technique>(ref db, name);
        if (!deleteSuccess)
            throw new EntityNotFoundException(
                $"Process technique with name \"{name}\" could not be deleted " +
                $"because entity does not exist");
    }

    public void DeleteProcessStrategy(string name)
    {
        var db = new RefactoringApproachContext();

        var blockDelete = db.Strategies
            .Where(e => e.Name == name)
            .Any(e => e.ApproachProcesses!.Count > 0);
        if (blockDelete)
            throw new EntityReferenceException(
                $"Process strategy with name \"{name}\" could not be deleted " +
                "because the entity is still in use by refactoring approaches");

        var deleteSuccess = Utils.DeleteEntityAndSaveChanges<ProcessStrategy>(ref db, name);
        if (!deleteSuccess)
            throw new EntityNotFoundException(
                $"Process strategy with name \"{name}\" could not be deleted " +
                $"because entity does not exist");
    }

    public void DeleteAtomarUnit(string name)
    {
        var db = new RefactoringApproachContext();

        var blockDelete = db.AtomarUnits
            .Where(e => e.Name == name)
            .Any(e => e.ApproachProcesses!.Count > 0);
        if (blockDelete)
            throw new EntityReferenceException(
                $"Atomar unit with name \"{name}\" could not be deleted " +
                "because the entity is still in use by refactoring approaches");

        var deleteSuccess = Utils.DeleteEntityAndSaveChanges<AtomarUnit>(ref db, name);
        if (!deleteSuccess)
            throw new EntityNotFoundException(
                $"Atomar unit with name \"{name}\" could not be deleted " +
                $"because entity does not exist");
    }

    private static void LoadAllData(ref IQueryable<ApproachProcess> query)
    {
        query.Include(e => e.Qualities)
            .Load();

        query.Include(e => e.QualitySublevels)
            .Load();

        query.Include(e => e.Directions)
            .Load();

        query.Include(e => e.AutomationLevels)
            .Load();

        query.Include(e => e.AnalysisTypes)
            .Load();

        query.Include(e => e.Techniques)
            .Load();

        query.Include(e => e.ProcessStrategies)
            .Load();

        query.Include(e => e.AtomarUnits)
            .Load();
    }
}
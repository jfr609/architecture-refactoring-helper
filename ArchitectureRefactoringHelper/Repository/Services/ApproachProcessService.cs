using Repository.Exceptions;
using Repository.Models;

namespace Repository.Services;

public class ApproachProcessService
{
    public IEnumerable<ApproachProcess> ListApproachProcesses()
    {
        using (var db = new RefactoringApproachContext())
        {
            var list = db.ApproachProcesses
                .IncludeAllApproachProcessData()
                .ToList();
            return list;
        }
    }

    public IEnumerable<Quality> ListQualities()
    {
        using (var db = new RefactoringApproachContext())
        {
            return db.Qualities.ToList();
        }
    }

    public IEnumerable<Direction> ListDirections()
    {
        using (var db = new RefactoringApproachContext())
        {
            return db.Directions.ToList();
        }
    }

    public IEnumerable<AutomationLevel> ListAutomationLevels()
    {
        using (var db = new RefactoringApproachContext())
        {
            return db.AutomationLevels.ToList();
        }
    }

    public IEnumerable<AnalysisType> ListAnalysisTypes()
    {
        using (var db = new RefactoringApproachContext())
        {
            return db.AnalysisTypes.ToList();
        }
    }

    public IEnumerable<Technique> ListTechniques()
    {
        using (var db = new RefactoringApproachContext())
        {
            return db.Techniques.ToList();
        }
    }

    public ApproachProcess GetApproachProcess(int processId)
    {
        using (var db = new RefactoringApproachContext())
        {
            return db.ApproachProcesses
                       .Where(e => e.ApproachProcessId == processId)
                       .IncludeAllApproachProcessData()
                       .FirstOrDefault() ??
                   throw new ElementNotFoundException($"Approach process with ID '{processId}' does not exist.");
        }
    }

    public Quality GetProcessQuality(string qualityName)
    {
        var db = new RefactoringApproachContext();
        return GetProcessQuality(qualityName, ref db);
    }

    public Quality GetProcessQuality(string qualityName, ref RefactoringApproachContext db)
    {
        return db.Qualities.Find(qualityName) ??
               throw new ElementNotFoundException($"Process quality with name '{qualityName}' does not exist.");
    }

    public Direction GetProcessDirection(string directionName)
    {
        var db = new RefactoringApproachContext();
        return GetProcessDirection(directionName, ref db);
    }

    public Direction GetProcessDirection(string directionName, ref RefactoringApproachContext db)
    {
        return db.Directions.Find(directionName) ??
               throw new ElementNotFoundException($"Process direction with name '{directionName}' does not exist.");
    }

    public AutomationLevel GetProcessAutomationLevel(string automationLevelName)
    {
        var db = new RefactoringApproachContext();
        return GetProcessAutomationLevel(automationLevelName, ref db);
    }

    public AutomationLevel GetProcessAutomationLevel(string automationLevelName, ref RefactoringApproachContext db)
    {
        return db.AutomationLevels.Find(automationLevelName) ??
               throw new ElementNotFoundException(
                   $"Process automation level with name '{automationLevelName}' does not exist.");
    }

    public AnalysisType GetProcessAnalysisType(string analysisTypeName)
    {
        var db = new RefactoringApproachContext();
        return GetProcessAnalysisType(analysisTypeName, ref db);
    }

    public AnalysisType GetProcessAnalysisType(string analysisTypeName, ref RefactoringApproachContext db)
    {
        return db.AnalysisTypes.Find(analysisTypeName) ??
               throw new ElementNotFoundException(
                   $"Process analysis type with name '{analysisTypeName}' does not exist.");
    }

    public Technique GetProcessTechnique(string techniqueName)
    {
        var db = new RefactoringApproachContext();
        return GetProcessTechnique(techniqueName, ref db);
    }

    public Technique GetProcessTechnique(string techniqueName, ref RefactoringApproachContext db)
    {
        return db.Techniques.Find(techniqueName) ??
               throw new ElementNotFoundException($"Process technique with name '{techniqueName}' does not exist.");
    }

    public ApproachProcess AddApproachProcess(ApproachProcess process)
    {
        var db = new RefactoringApproachContext();
        return AddApproachProcess(process, ref db);
    }

    public ApproachProcess AddApproachProcess(ApproachProcess process, ref RefactoringApproachContext db)
    {
        var preparedProcess = new ApproachProcess
        {
            Qualities = AddQualitiesIfNotExist(process.Qualities, ref db),
            Directions = AddDirectionsIfNotExist(process.Directions, ref db),
            AutomationLevels = AddAutomationLevelsIfNotExist(process.AutomationLevels, ref db),
            AnalysisTypes = AddAnalysisTypesIfNotExist(process.AnalysisTypes, ref db),
            Techniques = AddTechniquesIfNotExist(process.Techniques, ref db)
        };

        return Utils.AddEntity(preparedProcess, ref db);
    }

    public Quality AddQuality(Quality quality)
    {
        var db = new RefactoringApproachContext();
        return AddQuality(quality, ref db);
    }

    public Quality AddQuality(Quality quality, ref RefactoringApproachContext db)
    {
        return Utils.AddEntity(quality, ref db);
    }

    public ICollection<Quality> AddQualitiesIfNotExist(ICollection<Quality>? qualities,
        ref RefactoringApproachContext db)
    {
        return Utils.AddEntitiesIfNotExist(qualities, e => new object[]{e.Name}, ref db);
    }

    public Direction AddDirection(Direction direction)
    {
        var db = new RefactoringApproachContext();
        return AddDirection(direction, ref db);
    }

    public Direction AddDirection(Direction direction, ref RefactoringApproachContext db)
    {
        return Utils.AddEntity(direction, ref db);
    }

    public ICollection<Direction> AddDirectionsIfNotExist(ICollection<Direction>? directions,
        ref RefactoringApproachContext db)
    {
        return Utils.AddEntitiesIfNotExist(directions, e => new object[]{e.Name}, ref db);
    }

    public AutomationLevel AddAutomationLevel(AutomationLevel automationLevel)
    {
        var db = new RefactoringApproachContext();
        return AddAutomationLevel(automationLevel, ref db);
    }

    public AutomationLevel AddAutomationLevel(AutomationLevel automationLevel, ref RefactoringApproachContext db)
    {
        return Utils.AddEntity(automationLevel, ref db);
    }

    public ICollection<AutomationLevel> AddAutomationLevelsIfNotExist(ICollection<AutomationLevel>? automationLevels,
        ref RefactoringApproachContext db)
    {
        return Utils.AddEntitiesIfNotExist(automationLevels, e => new object[]{e.Name}, ref db);
    }

    public AnalysisType AddAnalysisType(AnalysisType analysisType)
    {
        var db = new RefactoringApproachContext();
        return AddAnalysisType(analysisType, ref db);
    }

    public AnalysisType AddAnalysisType(AnalysisType analysisType, ref RefactoringApproachContext db)
    {
        return Utils.AddEntity(analysisType, ref db);
    }

    public ICollection<AnalysisType> AddAnalysisTypesIfNotExist(ICollection<AnalysisType>? analysisTypes,
        ref RefactoringApproachContext db)
    {
        return Utils.AddEntitiesIfNotExist(analysisTypes, e => new object[]{e.Name}, ref db);
    }

    public Technique AddTechnique(Technique technique)
    {
        var db = new RefactoringApproachContext();
        return AddTechnique(technique, ref db);
    }

    public Technique AddTechnique(Technique technique, ref RefactoringApproachContext db)
    {
        return Utils.AddEntity(technique, ref db);
    }

    public ICollection<Technique> AddTechniquesIfNotExist(ICollection<Technique>? techniques,
        ref RefactoringApproachContext db)
    {
        return Utils.AddEntitiesIfNotExist(techniques, e => new object[]{e.Name}, ref db);
    }

    public void DeleteApproachProcess(int processId)
    {
        using (var db = new RefactoringApproachContext())
        {
            var process = db.ApproachProcesses.Find(processId);
            if (process == null)
                return;
            db.ApproachProcesses.Remove(process);
            db.SaveChanges();
        }
    }

    public void DeleteQuality(string name)
    {
        var db = new RefactoringApproachContext();
        var deleteSuccess = Utils.DeleteEntity<Quality>(ref db, name);
        if (deleteSuccess)
            throw new ElementNotFoundException(
                $"Process quality with name {name} could not be deleted because entity does not exist");
    }

    public void DeleteDirection(string name)
    {
        var db = new RefactoringApproachContext();
        var deleteSuccess = Utils.DeleteEntity<Direction>(ref db, name);
        if (deleteSuccess)
            throw new ElementNotFoundException(
                $"Process direction with name {name} could not be deleted because entity does not exist");
    }

    public void DeleteAutomationLevel(string name)
    {
        var db = new RefactoringApproachContext();
        var deleteSuccess = Utils.DeleteEntity<AutomationLevel>(ref db, name);
        if (deleteSuccess)
            throw new ElementNotFoundException(
                $"Process automation level with name {name} could not be deleted because entity does not exist");
    }

    public void DeleteAnalysisType(string name)
    {
        var db = new RefactoringApproachContext();
        var deleteSuccess = Utils.DeleteEntity<AnalysisType>(ref db, name);
        if (deleteSuccess)
            throw new ElementNotFoundException(
                $"Process analysis type with name {name} could not be deleted because entity does not exist");
    }

    public void DeleteTechnique(string name)
    {
        var db = new RefactoringApproachContext();
        var deleteSuccess = Utils.DeleteEntity<Technique>(ref db, name);
        if (deleteSuccess)
            throw new ElementNotFoundException(
                $"Process technique with name {name} could not be deleted because entity does not exist");
    }
}
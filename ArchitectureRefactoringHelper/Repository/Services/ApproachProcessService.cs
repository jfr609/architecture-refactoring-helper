using Microsoft.EntityFrameworkCore;
using Repository.Models;

namespace Repository.Services;

public class ApproachProcessService
{
    public IEnumerable<ApproachProcess> ListApproachProcesses()
    {
        using (var db = new RefactoringApproachContext())
        {
            var list = db.ApproachProcesses.Include(e => e.Qualities)
                .Include(e => e.Directions)
                .Include(e => e.AutomationLevels)
                .Include(e => e.AnalysisTypes)
                .Include(e => e.Techniques)
                .ToList();
            Console.WriteLine(list.ToJsonString());

            return list;
        }
    }

    public ApproachProcess GetApproachProcess(Guid processId)
    {
        using (var db = new RefactoringApproachContext())
        {
            return db.ApproachProcesses.Find(processId) ?? throw new InvalidOperationException();
        }
    }

    public ApproachProcess AddApproachProcess(ApproachProcess process)
    {
        var preparedProcess = new ApproachProcess
        {
            Qualities = new List<Quality>(),
            Directions = new List<Direction>(),
            AutomationLevels = new List<AutomationLevel>(),
            AnalysisTypes = new List<AnalysisType>(),
            Techniques = new List<Technique>()
        };
        using (var db = new RefactoringApproachContext())
        {
            if (process.Qualities != null)
            {
                foreach (var quality in process.Qualities)
                {
                    var savedQuality = db.Qualities.Find(quality.Name);
                    if (savedQuality == null)
                    {
                        throw new InvalidOperationException();
                    }

                    preparedProcess.Qualities.Add(savedQuality);
                }
            }

            if (process.Directions != null)
            {
                foreach (var direction in process.Directions)
                {
                    var savedDirection = db.Directions.Find(direction.Name);
                    if (savedDirection == null)
                    {
                        throw new InvalidOperationException();
                    }

                    preparedProcess.Directions.Add(savedDirection);
                }
            }

            if (process.AutomationLevels != null)
            {
                foreach (var automationLevel in process.AutomationLevels)
                {
                    var savedAutomationLevel = db.AutomationLevels.Find(automationLevel.Name);
                    if (savedAutomationLevel == null)
                    {
                        throw new InvalidOperationException();
                    }

                    preparedProcess.AutomationLevels.Add(savedAutomationLevel);
                }
            }

            if (process.AnalysisTypes != null)
            {
                foreach (var analysisType in process.AnalysisTypes)
                {
                    var savedAnalysisType = db.AnalysisTypes.Find(analysisType.Name);
                    if (savedAnalysisType == null)
                    {
                        throw new InvalidOperationException();
                    }

                    preparedProcess.AnalysisTypes.Add(savedAnalysisType);
                }
            }

            if (process.Techniques != null)
            {
                foreach (var technique in process.Techniques)
                {
                    var savedTechnique = db.Techniques.Find(technique.Name);
                    if (savedTechnique == null)
                    {
                        throw new InvalidOperationException();
                    }

                    preparedProcess.Techniques.Add(savedTechnique);
                }
            }

            var savedProcess = db.ApproachProcesses.Add(preparedProcess);
            db.SaveChanges();
            return savedProcess.Entity;
        }
    }

    public void AddQuality(Quality quality)
    {
        using (var db = new RefactoringApproachContext())
        {
            db.Qualities.Add(quality);
            db.SaveChanges();
        }
    }

    public void AddDirection(Direction direction)
    {
        using (var db = new RefactoringApproachContext())
        {
            db.Directions.Add(direction);
            db.SaveChanges();
        }
    }

    public void AddAutomationLevel(AutomationLevel automationLevel)
    {
        using (var db = new RefactoringApproachContext())
        {
            db.AutomationLevels.Add(automationLevel);
            db.SaveChanges();
        }
    }

    public void AddAnalysisType(AnalysisType analysisType)
    {
        using (var db = new RefactoringApproachContext())
        {
            db.AnalysisTypes.Add(analysisType);
            db.SaveChanges();
        }
    }

    public void AddTechnique(Technique technique)
    {
        using (var db = new RefactoringApproachContext())
        {
            db.Techniques.Add(technique);
            db.SaveChanges();
        }
    }

    public void UpdateApproachProcess(int processId, ApproachProcess process)
    {
        using (var db = new RefactoringApproachContext())
        {
        }
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
    
    public void DeleteQuality(string qualityName)
    {
        using (var db = new RefactoringApproachContext())
        {
            var quality = db.Qualities.Find(qualityName);
            if (quality == null)
                return;
            db.Qualities.Remove(quality);
            db.SaveChanges();
        }
    }
    
    public void DeleteDirection(string directionName)
    {
        using (var db = new RefactoringApproachContext())
        {
            var direction = db.Directions.Find(directionName);
            if (direction == null)
                return;
            db.Directions.Remove(direction);
            db.SaveChanges();
        }
    }
    
    public void DeleteAutomationLevel(string automationLevelName)
    {
        using (var db = new RefactoringApproachContext())
        {
            var automationLevel = db.AutomationLevels.Find(automationLevelName);
            if (automationLevel == null)
                return;
            db.AutomationLevels.Remove(automationLevel);
            db.SaveChanges();
        }
    }
    
    public void DeleteAnalysisType(string analysisTypeName)
    {
        using (var db = new RefactoringApproachContext())
        {
            var analysisType = db.AnalysisTypes.Find(analysisTypeName);
            if (analysisType == null)
                return;
            db.AnalysisTypes.Remove(analysisType);
            db.SaveChanges();
        }
    }
    
    public void DeleteTechnique(string techniqueName)
    {
        using (var db = new RefactoringApproachContext())
        {
            var technique = db.Techniques.Find(techniqueName);
            if (technique == null)
                return;
            db.Techniques.Remove(technique);
            db.SaveChanges();
        }
    }
}
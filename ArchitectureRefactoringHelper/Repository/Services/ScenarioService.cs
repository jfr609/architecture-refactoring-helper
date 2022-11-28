using Microsoft.EntityFrameworkCore;
using Repository.Exceptions;
using Repository.Models;
using Repository.Models.Database;

namespace Repository.Services;

public class ScenarioService
{
    public IEnumerable<Scenario> ListScenarios()
    {
        var db = new RefactoringApproachContext();

        IQueryable<Scenario> query = db.Scenarios;
        var result = query.ToList();

        LoadAllData(ref query);

        db.Dispose();


        return result;
    }

    public IEnumerable<Quality> GetQualities(int scenarioId)
    {
        var db = new RefactoringApproachContext();
        var query = db.Scenarios
            .Where(e => e.ScenarioId == scenarioId).Select(e => e.Qualities).ToList();
        var result = query.FirstOrDefault();


        if (result == null)
        {
            throw new EntityNotFoundException($"Scenario with ID \"{scenarioId}\" does not exist.");
        }

        return result;
    }

    public IEnumerable<QualitySublevel> GetQualitySublevels(int scenarioId)
    {
        var db = new RefactoringApproachContext();
        var query = db.Scenarios
            .Where(e => e.ScenarioId == scenarioId).Select(e => e.QualitySublevels).ToList();
        var result = query.FirstOrDefault();


        if (result == null)
        {
            throw new EntityNotFoundException($"Scenario with ID \"{scenarioId}\" does not exist.");
        }

        return result;
    }

    public int GetWeightByQualityName(string qualityName)
    {

        var weight = 0;
        foreach (var s in ListScenarios())
        {
            if (s.Qualities != null)
            {
                if (s.Qualities.Any(s => s.Name == qualityName))
                {
                    if (s.Importance == Scenario.RatingLevel.A)
                    {
                        weight = weight + Constants.weightA;
                    }
                    else if (s.Importance == Scenario.RatingLevel.B)
                    {
                        weight = weight + Constants.weightB;
                    }
                    else
                    {
                        weight = weight + Constants.weightC;
                    }
                }
                else
                {
                    weight = weight + 1;
                }
            }
        }

        return weight > 0 ? weight : 1;
    }

    public int GetWeightByQualitySubName(string qualitySubName)
    {

        var weight = 0;
        foreach (var s in ListScenarios())
        {
            if (s.QualitySublevels != null)
            {

                if (s.QualitySublevels.Any(s => s.Name == qualitySubName))
                {
                    if (s.Importance == Scenario.RatingLevel.A)
                    {
                        weight = weight + Constants.weightA;
                    }
                    else if (s.Importance == Scenario.RatingLevel.B)
                    {
                        weight = weight + Constants.weightB;
                    }
                    else
                    {
                        weight = weight + Constants.weightC;
                    }
                }
                else
                {
                    weight = weight + 1;
                }
            }
        }

        return weight > 0 ? weight : 1;
    }


    public Scenario GetScenario(int scenarioId)
    {
        var db = new RefactoringApproachContext();
        return GetScenario(scenarioId, ref db);
    }

    public Scenario GetScenario(int scenarioId, ref RefactoringApproachContext db)
    {
        var query = db.Scenarios
            .Where(e => e.ScenarioId == scenarioId);
        var result = query.FirstOrDefault();

        LoadAllData(ref query);

        if (result == null)
        {
            throw new EntityNotFoundException($"Scenario with ID \"{scenarioId}\" does not exist.");
        }

        return result;
    }

    public Scenario AddScenario(Scenario scenario)
    {
        var db = new RefactoringApproachContext();

        var newScenario = new Scenario
        {
            ScenarioId = scenario.ScenarioId,
            Name = scenario.Name,
            Description = scenario.Description,
            Difficulty = scenario.Difficulty,
            Importance = scenario.Importance
        };

        if (scenario.Qualities != null)

        {
            var subList = new List<QualitySublevel>();
            foreach (var quality in scenario.Qualities)
            {
                db.Qualities.Attach(quality);

                if (quality.QualitySublevels != null)
                {
                    foreach (var subQuality in quality.QualitySublevels)
                    {
                        if (scenario.QualitySublevels!.Any(q => q.Name == subQuality.Name))
                        {
                            subList.Add(subQuality);
                        }
                    }
                }
            }

            newScenario.Qualities = scenario.Qualities;
            newScenario.QualitySublevels = subList;
        }


        return Utils.AddEntityAndSaveChanges(newScenario, ref db);
    }

    public void UpdateScenario(int id, Scenario scenario)
    {
        var db = new RefactoringApproachContext();

        var existingScenario = db.Scenarios.Where(s => s.ScenarioId == id).Include(s => s.Qualities!).ThenInclude(q => q.QualitySublevels).Include(s => s.QualitySublevels).Single();

        db.Scenarios.Attach(existingScenario);

        // Remove Qualities first and detach so it is not tracked
        foreach (var q in existingScenario.Qualities ?? Enumerable.Empty<Quality>())
        {
            existingScenario.Qualities?.Remove(q);
            q.Scenarios?.Remove(existingScenario);
            db.Entry(q).State = EntityState.Detached;
        }

        // Remove Subqualities first and detach so it is not tracked
        foreach (var q in existingScenario.QualitySublevels ?? Enumerable.Empty<QualitySublevel>())
        {
            existingScenario.QualitySublevels?.Remove(q);
            q.Scenarios?.Remove(existingScenario);
            db.Entry(q).State = EntityState.Detached;
        }

        existingScenario.Qualities?.Clear();
        existingScenario.QualitySublevels?.Clear();

        db.SaveChanges();

        var newScenario = new Scenario
        {
            ScenarioId = scenario.ScenarioId,
            Name = scenario.Name,
            Description = scenario.Description,
            Difficulty = scenario.Difficulty,
            Importance = scenario.Importance
        };

        db.Entry(existingScenario).CurrentValues.SetValues(newScenario);

        if (scenario.Qualities != null)

        {
            var subList = new List<QualitySublevel>();
            foreach (var quality in scenario.Qualities)
            {
                quality.QualitySublevels?.Clear();
                db.Qualities.Attach(quality);
                existingScenario.Qualities?.Add(quality);

            }

            foreach (var subQuality in scenario.QualitySublevels ?? Enumerable.Empty<QualitySublevel>())
            {
                db.QualitySublevels.Attach(subQuality);
                existingScenario.QualitySublevels?.Add(subQuality);
            }

        }

        Utils.UpdateEntityAndSaveChanges(ref db);
    }

    public void DeleteScenario(int scenarioId)
    {
        var db = new RefactoringApproachContext();

        var scenario = db.Scenarios.Find(scenarioId) ?? throw new EntityNotFoundException(
            $"Scenario with ID \"{scenarioId}\" could not be deleted because entity does not exist");

        Utils.DeleteEntity<Scenario>(ref db, scenarioId);

        db.SaveChanges();
        db.Dispose();
    }

    private static void LoadAllData(ref IQueryable<Scenario> query)
    {
        query
        .Include(s => s.Qualities!)
        .ThenInclude(qu => qu.QualitySublevels)
        .Include(s => s.QualitySublevels)
        .Load();

    }
}
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
                        subList.Add(subQuality);
                    }
                }
            }

            newScenario.Qualities = scenario.Qualities;
            newScenario.QualitySublevels = subList;
        }


        return Utils.AddEntityAndSaveChanges(newScenario, ref db);
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
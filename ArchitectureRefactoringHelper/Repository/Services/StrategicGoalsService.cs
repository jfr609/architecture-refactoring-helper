using Microsoft.EntityFrameworkCore;
using Repository.Exceptions;
using Repository.Models;
using Repository.Models.Database;

namespace Repository.Services;

public class StrategicGoalsService
{
    public IEnumerable<StrategicGoals> ListStrategicGoals()
    {
        var db = new RefactoringApproachContext();

        IQueryable<StrategicGoals> query = db.StrategicGoals;
        var result = query.ToList();

        LoadAllData(ref query);

        db.Dispose();

        return result;
    }

    public StrategicGoals GetStrategicGoals(int strategicGoals)
    {
        var db = new RefactoringApproachContext();
        return GetStrategicGoals(strategicGoals, ref db);
    }

    public StrategicGoals GetStrategicGoals(int StrategicGoalsId, ref RefactoringApproachContext db)
    {
        var query = db.StrategicGoals
            .Where(e => e.StrategicGoalsId == StrategicGoalsId);
        var result = query.FirstOrDefault();

        LoadAllData(ref query);

        if (result == null)
        {
            throw new EntityNotFoundException($"StrategicGoals with ID \"{StrategicGoalsId}\" does not exist.");
        }

        return result;
    }

    public StrategicGoals AddStrategicGoals(StrategicGoals strategicGoals)
    {
        var db = new RefactoringApproachContext();

        var newStrategicGoals = new StrategicGoals
        {
            StrategicGoalsId = strategicGoals.StrategicGoalsId,
            Method = strategicGoals.Method,
            Owner = strategicGoals.Owner,
            Participants = strategicGoals.Participants,
        };

        return Utils.AddEntityAndSaveChanges(newStrategicGoals, ref db);
    }

    public void UpdateStrategicGoals(int id, StrategicGoals strategicGoals)
    {
        var db = new RefactoringApproachContext();

        var existingStrategicGoals = db.StrategicGoals.Where(s => s.StrategicGoalsId == id).Single();

        db.StrategicGoals.Attach(existingStrategicGoals);

        db.SaveChanges();

        var newStrategicGoals = new StrategicGoals
        {
            StrategicGoalsId = strategicGoals.StrategicGoalsId,
            Method = strategicGoals.Method,
            Owner = strategicGoals.Owner,
            Participants = strategicGoals.Participants,
        };

        db.Entry(existingStrategicGoals).CurrentValues.SetValues(newStrategicGoals);

        Utils.UpdateEntityAndSaveChanges(ref db);
    }

    public void DeleteStrategicGoals(int StrategicGoalsId)
    {
        var db = new RefactoringApproachContext();

        var StrategicGoals = db.StrategicGoals.Find(StrategicGoalsId) ?? throw new EntityNotFoundException(
            $"StrategicGoals with ID \"{StrategicGoalsId}\" could not be deleted because entity does not exist");

        Utils.DeleteEntity<StrategicGoals>(ref db, StrategicGoalsId);

        db.SaveChanges();
        db.Dispose();
    }

    private static void LoadAllData(ref IQueryable<StrategicGoals> query)
    {
       query
       .Load();

    }
}
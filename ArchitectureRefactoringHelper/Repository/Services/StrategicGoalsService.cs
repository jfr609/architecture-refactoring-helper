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

   

    public StrategicGoals GetStrategicGoals(int StrategicGoalsId)
    {
        var db = new RefactoringApproachContext();
        return GetStrategicGoals(StrategicGoalsId, ref db);
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

    public StrategicGoals AddStrategicGoals(StrategicGoals StrategicGoals)
    {
        var db = new RefactoringApproachContext();

        var newStrategicGoals = new StrategicGoals
        {
            StrategicGoalsId = StrategicGoals.StrategicGoalsId,
            Method = StrategicGoals.Method,
            Owner = StrategicGoals.Owner,
            Objectives = StrategicGoals.Objectives
            //Organizational_objectives = StrategicGoals.Organizational_objectives,
            //Process_objectives = StrategicGoals.Process_objectives
        };

        return Utils.AddEntityAndSaveChanges(newStrategicGoals, ref db);
    }

    public void UpdateStrategicGoals(int id, StrategicGoals StrategicGoals)
    {
        var db = new RefactoringApproachContext();

        var existingStrategicGoals = db.StrategicGoals.Where(s => s.StrategicGoalsId == id);

        db.StrategicGoals.Attach((StrategicGoals)existingStrategicGoals);

        db.SaveChanges();

        var newStrategicGoals = new StrategicGoals
        {
            StrategicGoalsId = StrategicGoals.StrategicGoalsId,
            Method = StrategicGoals.Method,
            Owner = StrategicGoals.Owner,
            Objectives = StrategicGoals.Objectives
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
using Microsoft.EntityFrameworkCore;
using Repository.Exceptions;
using Repository.Models;
using Repository.Models.Database;

namespace Repository.Services;

public class ObjectivesService
{
    public IEnumerable<Objectives> ListObjectives()
    {
        var db = new RefactoringApproachContext();

        IQueryable<Objectives> query = db.Objectives;
        var result = query.ToList();

        LoadAllData(ref query);

        db.Dispose();


        return result;
    }
    

    public Objectives GetObjective(int ObjectivesId)
    {
        var db = new RefactoringApproachContext();
        return GetObjective(ObjectivesId, ref db);
    }

    public Objectives GetObjective(int ObjectivesId, ref RefactoringApproachContext db)
    {
        var query = db.Objectives
            .Where(e => e.ObjectivesId == ObjectivesId);
        var result = query.FirstOrDefault();

        LoadAllData(ref query);

        if (result == null)
        {
            throw new EntityNotFoundException($"Objective with ID \"{ObjectivesId}\" does not exist.");
        }

        return result;
    }

    public Objectives AddObjective(Objectives objectives)
    {
        var db = new RefactoringApproachContext();

        var newObjectives = new Objectives
        {
            ObjectivesId = objectives.ObjectivesId,
            ObjectivesName = objectives.ObjectivesName,
            ObjectivesGoalType = objectives.ObjectivesGoalType,
        };
        return Utils.AddEntityAndSaveChanges(newObjectives, ref db);
    }

    public void UpdateObjective(int id, Objectives objectives)
    {
        var db = new RefactoringApproachContext();

        var existingObjectives = db.Objectives.Where(s => s.ObjectivesId == id).Single();

        db.Objectives.Attach(existingObjectives);//hier ist der fehler

        db.SaveChanges();

        var newObjective = new Objectives
        {
            ObjectivesId = objectives.ObjectivesId,
            ObjectivesName = objectives.ObjectivesName,
            ObjectivesGoalType = objectives.ObjectivesGoalType,
        };

        db.Entry(existingObjectives).CurrentValues.SetValues(newObjective);

        Utils.UpdateEntityAndSaveChanges(ref db);
    }

    public void DeleteObjective(int ObjectivesId)
    {
        var db = new RefactoringApproachContext();

        var Objective = db.Objectives.Find(ObjectivesId) ?? throw new EntityNotFoundException(
            $"Objectives with ID \"{ObjectivesId}\" could not be deleted because entity does not exist");

        Utils.DeleteEntity<Objectives>(ref db, ObjectivesId);

        db.SaveChanges();
        db.Dispose();
    }

    private static void LoadAllData(ref IQueryable<Objectives> query)
    {
       query
       .Load();

    }
}
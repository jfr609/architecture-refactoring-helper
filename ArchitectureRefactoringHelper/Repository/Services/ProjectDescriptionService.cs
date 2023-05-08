using Microsoft.EntityFrameworkCore;
using Repository.Exceptions;
using Repository.Models;
using Repository.Models.Database;

namespace Repository.Services;

public class ProjectDescriptionService
{
    public IEnumerable<ProjectDescription> ListProjectDescription()
    {
        var db = new RefactoringApproachContext();

        IQueryable<ProjectDescription> query = db.ProjectDescriptions;
        var result = query.ToList();

        LoadAllData(ref query);

        db.Dispose();


        return result;
    }

   

    public ProjectDescription GetProjectDescription(int projectDescriptionId)
    {
        var db = new RefactoringApproachContext();
        return GetProjectDescription(projectDescriptionId, ref db);
    }

    public ProjectDescription GetProjectDescription(int projectDescriptionId, ref RefactoringApproachContext db)
    {
        var query = db.ProjectDescriptions
            .Where(e => e.ProjectDescriptionId == projectDescriptionId);
        var result = query.FirstOrDefault();

        LoadAllData(ref query);

        if (result == null)
        {
            throw new EntityNotFoundException($"ProjectDescription with ID \"{projectDescriptionId}\" does not exist.");
        }

        return result;
    }

    public ProjectDescription AddProjectDescription(ProjectDescription projectDescription)
    {
        var db = new RefactoringApproachContext();

        var newProjectDescription = new ProjectDescription
        {
            ProjectDescriptionId = projectDescription.ProjectDescriptionId,
            Systemname = projectDescription.Systemname,
            Ownership = projectDescription.Ownership,
            Creationdate = projectDescription.Creationdate,
            Systemsize = projectDescription.Systemsize,
            Hosting = projectDescription.Hosting,
            Teams = projectDescription.Teams,
            Developers  = projectDescription.Developers,
            Processmodel = projectDescription.Processmodel,
            Architecturepattern = projectDescription.Architecturepattern,
            Languages = projectDescription.Languages,
            Persistence = projectDescription.Persistence,
            Purpose = projectDescription.Purpose,
            Functionality = projectDescription.Functionality,
            Designdiagrams = projectDescription.Designdiagrams,
        };

        return Utils.AddEntityAndSaveChanges(newProjectDescription, ref db);
    }

    public void UpdateProjectDescription(int id, ProjectDescription projectDescription)
    {
        var db = new RefactoringApproachContext();

        var existingProjectDescription = db.ProjectDescriptions.Where(s => s.ProjectDescriptionId == id);

        db.ProjectDescriptions.Attach((ProjectDescription)existingProjectDescription);

        db.SaveChanges();

        var newProjectDescription = new ProjectDescription
        {
            ProjectDescriptionId = projectDescription.ProjectDescriptionId,
            Systemname = projectDescription.Systemname,
            Ownership = projectDescription.Ownership,
            Creationdate = projectDescription.Creationdate,
            Systemsize = projectDescription.Systemsize,
            Hosting = projectDescription.Hosting,
            Teams = projectDescription.Teams,
            Developers  = projectDescription.Developers,
            Processmodel = projectDescription.Processmodel,
            Architecturepattern = projectDescription.Architecturepattern,
            Languages = projectDescription.Languages,
            Persistence = projectDescription.Persistence,
            Purpose = projectDescription.Purpose,
            Functionality = projectDescription.Functionality,
            Designdiagrams = projectDescription.Designdiagrams,
        };

        db.Entry(existingProjectDescription).CurrentValues.SetValues(newProjectDescription);

        Utils.UpdateEntityAndSaveChanges(ref db);
    }

    public void DeleteProjectDescription(int ProjectDescriptionId)
    {
        var db = new RefactoringApproachContext();

        var ProjectDescription = db.ProjectDescriptions.Find(ProjectDescriptionId) ?? throw new EntityNotFoundException(
            $"ProjectDescription with ID \"{ProjectDescriptionId}\" could not be deleted because entity does not exist");

        Utils.DeleteEntity<ProjectDescription>(ref db, ProjectDescriptionId);

        db.SaveChanges();
        db.Dispose();
    }

    private static void LoadAllData(ref IQueryable<ProjectDescription> query)
    {
       // query
       // .Load();

    }
}
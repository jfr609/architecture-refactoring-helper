using Repository.Exceptions;
using Repository.Models;
using Repository.Models.Database;

namespace Repository.Services;

public class ToolTypeService
{
    public IEnumerable<ToolType> ListToolTypes()
    {
        var db = new RefactoringApproachContext();

        return db.ToolTypes
            .OrderBy(e => e.Name)
            .ToList();
    }
    public ToolType GetToolType(string typeName)
    {
        var db = new RefactoringApproachContext();
        return GetToolType(typeName, ref db);
    }

    public ToolType GetToolType(string typeName, ref RefactoringApproachContext db)
    {
        return db.ToolTypes.Find(typeName) ??
               throw new EntityNotFoundException($"Tool type with name \"{typeName}\" does not exist");
    }
    public ToolType AddToolType(ToolType type)
    {
        var db = new RefactoringApproachContext();
        return Utils.AddEntityAndSaveChanges(type, ref db);
    }

    public ToolType AddToolType(ToolType type, ref RefactoringApproachContext db)
    {
        return Utils.AddEntity(type, ref db);
    }

    public ICollection<ToolType> AddToolTypesIfNotExist(ICollection<ToolType>? types,
        ref RefactoringApproachContext db)
    {
        return Utils.AddEntitiesIfNotExist(types, e => new object[] { e.Name }, ref db);
    }

    public void DeleteToolType(string typeName)
    {
        var db = new RefactoringApproachContext();

        var blockDelete = db.ToolTypes
            .Where(e => e.Name == typeName)
            .Any(e => e.Tools!.Count > 0);
        if (blockDelete)
            throw new EntityReferenceException(
                $"Tool type with name \"{typeName}\" could not be deleted " +
                "because the entity is still in use by tools");

        var deleteSuccess = Utils.DeleteEntityAndSaveChanges<ToolType>(ref db, typeName);
        if (!deleteSuccess)
            throw new EntityNotFoundException(
                $"Tool type with name \"{typeName}\" could not be deleted " +
                "because entity does not exist");
    }
}
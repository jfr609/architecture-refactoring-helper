using Microsoft.EntityFrameworkCore;
using Repository.Exceptions;
using Repository.Models;
using Repository.Models.Database;

namespace Repository.Services;

public class ToolService
{
    private readonly ToolTypeService _typeService;

    public ToolService(ToolTypeService typeService)
    {
        _typeService = typeService;
    }

    public IEnumerable<Tool> ListTools(bool? withDetails)
    {
        var db = new RefactoringApproachContext();

        //if (!withDetails.HasValue || !withDetails.Value)
        //    return db.Tools
        //        .Include(e => e.ToolSource)
        //        .ToList();

        IQueryable<Tool> query = db.Tools
            .Include(e => e.ToolSource);
        var result = query.ToList();

        LoadAllData(ref query);

        return result;
    }

    public Tool GetTool(int toolId)
    {
        var db = new RefactoringApproachContext();
        return GetTool(toolId, ref db);
    }

    public Tool GetTool(int toolId, ref RefactoringApproachContext db)
    {
        IQueryable<Tool> query = db.Tools
            .Where(e => e.ToolId == toolId)
            .Include(e => e.ToolSource);
        var result = query.FirstOrDefault();

        LoadAllData(ref query);

        if (result == null)
        {
            throw new EntityNotFoundException(
                $"Tool with ID \"{toolId}\" does not exist.");
        }

        return result;
    }

    public IEnumerable<Tool> GetTools(int[] toolIds, ref RefactoringApproachContext db)
    {
        IQueryable<Tool> query = db.Tools
            .Where(t => toolIds.Contains(t.ToolId))
            .Include(e => e.ToolTypes)
            .Include(e => e.ToolSource);
        var result = query.ToList();

        //LoadAllData(ref query);

        if (result == null)
        {
            throw new EntityNotFoundException(
                $"Tool with ID \"{toolIds}\" does not exist.");
        }

        return result;
    }

    public IEnumerable<Tool> GetToolsByIdentifiers(string[] toolIdentifiers, ref RefactoringApproachContext db)
    {
        IQueryable<Tool> query = db.Tools
            .Where(t => toolIdentifiers.Contains(t.Identifier))
            .Include(e => e.ToolTypes)
            .Include(e => e.ToolSource);
        var result = query.ToList();

        //LoadAllData(ref query);

        if (result == null)
        {
            throw new EntityNotFoundException(
                $"Tool with Identifier \"{toolIdentifiers}\" does not exist.");
        }

        return result;
    }

    public Tool AddToolIfNotExists(Tool tool)
    {
        if (ExistsDuplicateTool(tool.ToolSource))
        {
            throw new DuplicateElementException(
                $"A tool with the title \"{tool.ToolSource.Name}\" already exists. " +
                "If you want to change information regarding this tool try updating the existing tool");
        }

        return AddTool(tool);
    }

    public ICollection<Tool> AddToolsIfNotExist(ICollection<Tool>? tools,
        ref RefactoringApproachContext db)
    {
        return Utils.AddEntitiesIfNotExist(tools, e => new object[] { e.ToolId }, ref db);
    }

    private Tool AddTool(Tool tool)
    {
        var db = new RefactoringApproachContext();

        var newTool = new Tool
        {
            Identifier = tool.Identifier,
            ToolSource = tool.ToolSource,
            ToolTypes =
                _typeService.AddToolTypesIfNotExist(tool.ToolTypes, ref db)
        };

        return Utils.AddEntityAndSaveChanges(newTool, ref db);
    }
    private bool ExistsDuplicateTool(ToolSource source)
    {
        var db = new RefactoringApproachContext();

        var savedSource = db.ToolSources.FirstOrDefault(e => e.Name.Equals(source.Name));

        return savedSource != null;
    }
    public void DeleteTool(int toolId)
    {
        var db = new RefactoringApproachContext();

        var tool = db.Tools.Find(toolId) ?? throw new EntityNotFoundException(
            $"Tool with ID \"{toolId}\" could not be deleted because entity does not exist");

        var blockDelete = db.Tools
            .Where(e => e.ToolId == toolId)
            .Any(e => e.ApproachUsabilities!.Count > 0);
        if (blockDelete)
            throw new EntityReferenceException(
                $"Tool could not be deleted " +
                "because the entity is still in use by refactoring approaches");

        Utils.DeleteEntity<Tool>(ref db, toolId);
        Utils.DeleteEntity<ToolSource>(ref db, tool.ToolSourceId);

        db.SaveChanges();
        db.Dispose();
    }
    private static void LoadAllData(ref IQueryable<Tool> query)
    {
        query.Include(e => e.ToolTypes!)
            .Load();

        query.Include(e => e.ApproachUsabilities)
            .ThenInclude(e => e.RefactoringApproach)
            .ThenInclude(e => e.ApproachSource)
            .Load();
    }
    public void RemoveToolExistingCards(int toolId)
    {
        var db = new RefactoringApproachContext();

        var tool = GetTool(toolId, ref db);

        tool.ToolTypes?.Clear();

        db.SaveChanges();
    }
    public void AddToolTypeToTool(int toolId, ToolType toolType)
    {
        var db = new RefactoringApproachContext();

        var tool = GetTool(toolId, ref db);

        tool.ToolTypes ??= new List<ToolType>();
        if (tool.ToolTypes.Any(e => e.Name == toolType.Name))
        {
            throw new DuplicateElementException(
                $"Tool type with name \"{toolType.Name}\" is already an type of the given tool(ID: {toolId}).");
        }

        var input = _typeService.GetToolType(toolType.Name, ref db);
        tool.ToolTypes.Add(input);
        db.SaveChanges();
    }
}
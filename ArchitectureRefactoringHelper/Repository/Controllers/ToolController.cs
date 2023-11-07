using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Repository.Exceptions;
using Repository.Models.Database;
using Repository.Models.Recommendation;
using Repository.Services;

namespace Repository.Controllers;

[ApiController]
[Route($"api/v{Constants.ApiVersion}/{Constants.ApiSubPathTools}")]
[Produces("application/json")]
[TypeFilter(typeof(ServiceExceptionFilter))]
public class ToolController : ControllerBase
{
    private readonly ToolService _toolService;
    private readonly ToolTypeService _toolTypeService;
    private readonly IRecommendationService _recommendationService;

    public ToolController(ToolService toolService,
        ToolTypeService toolTypeService,
        IRecommendationService recommendationService)
    {
        _toolService = toolService;
        _toolTypeService = toolTypeService;
        _recommendationService = recommendationService;
    }

    /// <summary>
    /// Receives a complete list of all Tool items
    /// </summary>
    /// <param name="withDetails">Decides whether the tools are returned with all details or not</param>
    /// <returns>List of Tool items</returns>
    [HttpGet(Name = "ListTools")]
    public ActionResult<IEnumerable<Tool>> ListTools([FromQuery] bool? withDetails)
    {
        return Ok(_toolService.ListTools(withDetails));
    }

    /// <summary>
    /// Receives a Tool
    /// </summary>
    /// <param name="id"></param>
    /// <returns>The Tool with the given ID</returns>
    [HttpGet("{id:int}", Name = "GetTool")]
    public ActionResult<Tool> GetTool(int id)
    {
        return Ok(_toolService.GetTool(id));
    }

    /// <summary>
    /// Creates a new Tool.
    /// ToolTypes that don't exist will be created in the process.
    /// </summary>
    /// <param name="toolParam">The Tool we want to add</param>
    /// <returns>The created Tool</returns>
    /// <response code="201">Returns the newly created Tool</response>
    /// <response code="400">If the Tool is null</response>
    /// <response code="409">If a Tool with the same title already exists</response>
    [HttpPost(Name = "AddTool")]
    [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(Tool))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    public ActionResult<Tool> AddTool([FromBody] Tool toolParam)
    {
        var tool = _toolService.AddToolIfNotExists(toolParam);
        var url = Url.Action("GetTool", "Tool",
            new { id = tool.ToolId }, Request.Scheme) ?? "";
        return Created(url, tool);
    }

    /// <summary>
    /// Deletes a Tool
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    [HttpDelete("{id:int}", Name = "DeleteTool")]
    public IActionResult DeleteTool(int id)
    {
        _toolService.DeleteTool(id);

        return NoContent();
    }

    [HttpPost("{id:int}/" + Constants.ApiSubPathToolTypes,
        Name = "AddToolTypeToTool")]
    public IActionResult AddToolTypeToTool(int id, [FromBody] ToolType toolType)
    {
        _toolService.AddToolTypeToTool(id, toolType);

        return NoContent();
    }

    [HttpDelete(
        "{id:int}/" + Constants.ApiSubPathExistingCards,
        Name = "RemoveToolExistingCards")]
    public IActionResult RemoveToolExistingCards(int id)
    {
        _toolService.RemoveToolExistingCards(id);

        return NoContent();
    }

    [HttpGet(Constants.ApiSubPathToolTypes, Name = "ListToolTypes")]
    public ActionResult<IEnumerable<ToolType>> ListToolTypes()
    {
        return Ok(_toolTypeService.ListToolTypes());
    }

    [HttpPost(Constants.ApiSubPathToolTypes, Name = "AddToolType")]
    public ActionResult<ToolType> AddToolType([FromBody] ToolType type)
    {
        var savedType = _toolTypeService.AddToolType(type);
        return Created("", savedType);
    }

    [HttpDelete(Constants.ApiSubPathToolTypes + "/{name}", Name = "DeleteToolType")]
    public IActionResult DeleteToolType(string name)
    {
        _toolTypeService.DeleteToolType(name);
        return NoContent();
    }

}
using Microsoft.AspNetCore.Mvc;
using Repository.Exceptions;
using Repository.Models.Database;
using Repository.Services;

namespace Repository.Controllers;

[ApiController]
[Route($"api/v{Constants.ApiVersion}/{Constants.ApiSubPathProjects}/{Constants.ApiSubPathObjectives}")]
[Produces("application/json")]
[TypeFilter(typeof(ServiceExceptionFilter))]
public class ObjectiveController : ControllerBase
{
    private readonly ObjectivesService _objectivesService;

    public ObjectiveController(ObjectivesService objectivesService)
    {
        _objectivesService = objectivesService;
    }

    [HttpGet(Name = "ListObjectives")]
    public ActionResult<IEnumerable<Objectives>> ListObjectives()
    {
        return Ok(_objectivesService.ListObjectives());
    }

    [HttpGet("{id:int}", Name = "GetObjective")]
    public ActionResult<Objectives> GetObjective(int id)
    {
        return Ok(_objectivesService.GetObjective(id));
    }

    [HttpPost(Name = "AddObjective")]
    public IActionResult AddObjective([FromBody] Objectives objective)
    {
        _objectivesService.AddObjective(objective);
        return Ok();
    }

    [HttpPut("{id:int}", Name = "UpdateObjective")]
    public IActionResult UpdateObjective(int id, [FromBody] Objectives objective)
    {
        _objectivesService.UpdateObjective(id, objective);
        return Ok();
    }

    [HttpDelete("{id:int}", Name = "DeleteObjectives")]
    public IActionResult DeleteObjective(int id)
    {
        _objectivesService.DeleteObjective(id);
        return Ok();
    }
}
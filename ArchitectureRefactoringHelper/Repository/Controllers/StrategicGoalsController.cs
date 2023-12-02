using Microsoft.AspNetCore.Mvc;
using Repository.Exceptions;
using Repository.Models.Database;
using Repository.Services;

namespace Repository.Controllers;

[ApiController]
[Route($"api/v{Constants.ApiVersion}/{Constants.ApiSubPathProjects}/{Constants.ApiSubPathStrategicGoals}")]
[Produces("application/json")]
[TypeFilter(typeof(ServiceExceptionFilter))]
public class StrategicGoalsController : ControllerBase
{
    private readonly StrategicGoalsService _StrategicGoalsService;

    public StrategicGoalsController(StrategicGoalsService StrategicGoalsService)
    {
        _StrategicGoalsService = StrategicGoalsService;
    }

    [HttpGet(Name = "ListStrategicGoals")]
    public ActionResult<IEnumerable<StrategicGoals>> ListStrategicGoalss()
    {
        return Ok(_StrategicGoalsService.ListStrategicGoals());
    }

    [HttpGet("{id:int}", Name = "GetStrategicGoals")]
    public ActionResult<StrategicGoals> GetStrategicGoals(int id)
    {
        return Ok(_StrategicGoalsService.GetStrategicGoals(id));
    }

    [HttpPost(Name = "AddStrategicGoals")]
    public IActionResult AddStrategicGoals([FromBody] StrategicGoals StrategicGoals)
    {
        _StrategicGoalsService.AddStrategicGoals(StrategicGoals);
        return Ok();
    }

    [HttpPut("{id:int}", Name = "UpdateStrategicGoals")]
    public IActionResult UpdateStrategicGoals(int id, [FromBody] StrategicGoals StrategicGoals)
    {
        _StrategicGoalsService.UpdateStrategicGoals(id, StrategicGoals);
        return Ok();
    }

    [HttpDelete("{id:int}", Name = "DeleteStrategicGoals")]
    public IActionResult DeleteStrategicGoals(int id)
    {
        _StrategicGoalsService.DeleteStrategicGoals(id);
        return Ok();
    }
}
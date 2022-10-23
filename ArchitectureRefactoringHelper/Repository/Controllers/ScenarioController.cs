using Microsoft.AspNetCore.Mvc;
using Repository.Exceptions;
using Repository.Models.Database;
using Repository.Services;

namespace Repository.Controllers;

[ApiController]
[Route($"api/v{Constants.ApiVersion}/{Constants.ApiSubPathProjects}/{Constants.ApiSubPathScenarios}")]
[Produces("application/json")]
[TypeFilter(typeof(ServiceExceptionFilter))]
public class ScenarioController : ControllerBase
{
    private readonly ScenarioService _scenarioService;

    public ScenarioController(ScenarioService scenarioService)
    {
        _scenarioService = scenarioService;
    }

    [HttpGet(Name = "ListScenario")]
    public ActionResult<IEnumerable<Scenario>> ListScenarios()
    {
        return Ok(_scenarioService.ListScenarios());
    }

    [HttpGet("{id:int}", Name = "GetScenario")]
    public ActionResult<Scenario> GetScenario(int id)
    {
        return Ok(_scenarioService.GetScenario(id));
    }

    [HttpPost(Name = "AddScenario")]
    public IActionResult AddScenario([FromBody] Scenario scenario)
    {
        _scenarioService.AddScenario(scenario);
        return Ok();
    }
        
    [HttpDelete("{id:int}", Name = "DeleteScenario")]
    public IActionResult DeleteScenario(int id)
    {
        _scenarioService.DeleteScenario(id);
        return Ok();
    }


}
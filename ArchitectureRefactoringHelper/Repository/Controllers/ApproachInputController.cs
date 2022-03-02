using Microsoft.AspNetCore.Mvc;
using Repository.Exceptions;
using Repository.Models.Database;
using Repository.Services;

namespace Repository.Controllers;

[ApiController]
[Route($"api/v{Constants.ApiVersion}/{Constants.ApiSubPathInputs}")]
[Produces("application/json")]
[TypeFilter(typeof(ServiceExceptionFilter))]
public class ApproachInputController : ControllerBase
{
    private readonly ApproachInputService _inputService;

    public ApproachInputController(ApproachInputService inputService)
    {
        _inputService = inputService;
    }

    [HttpGet(Constants.ApiSubPathDomainArtifacts, Name = "ListDomainArtifacts")]
    public ActionResult<IEnumerable<DomainArtifactInput>> ListDomainArtifacts()
    {
        return Ok(_inputService.ListDomainArtifactInputs());
    }

    [HttpPost(Constants.ApiSubPathDomainArtifacts, Name = "AddDomainArtifact")]
    public ActionResult<DomainArtifactInput> AddDomainArtifact([FromBody] DomainArtifactInput input)
    {
        var savedInput = _inputService.AddDomainArtifactInput(input);
        return Created("", savedInput);
    }

    [HttpDelete(Constants.ApiSubPathDomainArtifacts + "/{name}", Name = "DeleteDomainArtifact")]
    public IActionResult DeleteDomainArtifact(string name)
    {
        _inputService.DeleteDomainArtifactInput(name);
        return NoContent();
    }

    [HttpGet(Constants.ApiSubPathRuntimeArtifacts, Name = "ListRuntimeArtifact")]
    public ActionResult<IEnumerable<RuntimeArtifactInput>> ListRuntimeArtifact()
    {
        return Ok(_inputService.ListRuntimeArtifactInputs());
    }

    [HttpPost(Constants.ApiSubPathRuntimeArtifacts, Name = "AddRuntimeArtifact")]
    public ActionResult<RuntimeArtifactInput> AddRuntimeArtifact([FromBody] RuntimeArtifactInput input)
    {
        var savedInput = _inputService.AddRuntimeArtifactInput(input);
        return Created("", savedInput);
    }

    [HttpDelete(Constants.ApiSubPathRuntimeArtifacts + "/{name}", Name = "DeleteRuntimeArtifact")]
    public IActionResult DeleteRuntimeArtifact(string name)
    {
        _inputService.DeleteRuntimeArtifactInput(name);
        return NoContent();
    }

    [HttpGet(Constants.ApiSubPathModelArtifacts, Name = "ListModelArtifacts")]
    public ActionResult<IEnumerable<ModelArtifactInput>> ListModelArtifacts()
    {
        return Ok(_inputService.ListModelArtifactInputs());
    }

    [HttpPost(Constants.ApiSubPathModelArtifacts, Name = "AddModelArtifact")]
    public ActionResult<ModelArtifactInput> AddModelArtifact([FromBody] ModelArtifactInput input)
    {
        var savedInput = _inputService.AddModelArtifactInput(input);
        return Created("", savedInput);
    }

    [HttpDelete(Constants.ApiSubPathModelArtifacts + "/{name}", Name = "DeleteModelArtifact")]
    public IActionResult DeleteModelArtifact(string name)
    {
        _inputService.DeleteModelArtifactInput(name);
        return NoContent();
    }

    [HttpGet(Constants.ApiSubPathExecutables, Name = "ListExecutables")]
    public ActionResult<IEnumerable<ExecutableInput>> ListExecutables()
    {
        return Ok(_inputService.ListExecutableInputs());
    }

    [HttpPost(Constants.ApiSubPathExecutables, Name = "AddExecutable")]
    public ActionResult<ExecutableInput> AddExecutable([FromBody] ExecutableInput input)
    {
        var savedInput = _inputService.AddExecutableInput(input);
        return Created("", savedInput);
    }

    [HttpDelete(Constants.ApiSubPathExecutables + "/{name}/{language}", Name = "DeleteExecutable")]
    public IActionResult DeleteExecutable(string name, string language)
    {
        _inputService.DeleteExecutableInput(name, language);
        return NoContent();
    }
}
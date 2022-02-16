using Microsoft.AspNetCore.Mvc;
using Repository.Models;
using Repository.Services;

namespace Repository.Controllers;

[ApiController]
[Route($"api/v{Constants.API_VERSION}/{Constants.API_SUBPATH_INPUTS}")]
public class ApproachInputController : ControllerBase
{
    private readonly ApproachInputService _inputService;

    public ApproachInputController(ApproachInputService inputService)
    {
        _inputService = inputService;
    }
    
    [HttpGet(Constants.API_SUBPATH_DOMAINARTIFACTS, Name = "ListDomainArtifacts")]
    public ActionResult<IEnumerable<DomainArtifactInput>> ListDomainArtifacts()
    {
        return Ok(_inputService.ListDomainArtifactInputs());
    }
    
    [HttpPost(Constants.API_SUBPATH_DOMAINARTIFACTS, Name = "AddDomainArtifact")]
    public IActionResult AddDomainArtifact([FromBody] DomainArtifactInput input)
    {
        _inputService.AddDomainArtifactInput(input);
        return Ok();
    }
    
    [HttpDelete(Constants.API_SUBPATH_DOMAINARTIFACTS + "/{name}", Name = "DeleteDomainArtifact")]
    public IActionResult DeleteDomainArtifact(string name)
    {
        _inputService.DeleteDomainArtifactInput(name);
        return Ok();
    }
    
    [HttpGet(Constants.API_SUBPATH_RUNTIMEARTIFACTS, Name = "ListRuntimeArtifact")]
    public ActionResult<IEnumerable<RuntimeArtifactInput>> ListRuntimeArtifact()
    {
        return Ok(_inputService.ListRuntimeArtifactInputs());
    }
    
    [HttpPost(Constants.API_SUBPATH_RUNTIMEARTIFACTS, Name = "AddRuntimeArtifact")]
    public IActionResult AddRuntimeArtifact([FromBody] RuntimeArtifactInput input)
    {
        _inputService.AddRuntimeArtifactInput(input);
        return Ok();
    }
    
    [HttpDelete(Constants.API_SUBPATH_RUNTIMEARTIFACTS + "/{name}", Name = "DeleteRuntimeArtifact")]
    public IActionResult DeleteRuntimeArtifact(string name)
    {
        _inputService.DeleteRuntimeArtifactInput(name);
        return Ok();
    }
    
    [HttpGet(Constants.API_SUBPATH_MODELARTIFACTS, Name = "ListModelArtifacts")]
    public ActionResult<IEnumerable<ModelArtifactInput>> ListModelArtifacts()
    {
        return Ok(_inputService.ListModelArtifactInputs());
    }
    
    [HttpPost(Constants.API_SUBPATH_MODELARTIFACTS, Name = "AddModelArtifact")]
    public IActionResult AddModelArtifact([FromBody] ModelArtifactInput input)
    {
        _inputService.AddModelArtifactInput(input);
        return Ok();
    }
    
    [HttpDelete(Constants.API_SUBPATH_MODELARTIFACTS + "/{name}", Name = "DeleteModelArtifact")]
    public IActionResult DeleteModelArtifact(string name)
    {
        _inputService.DeleteModelArtifactInput(name);
        return Ok();
    }
    
    [HttpGet(Constants.API_SUBPATH_EXECUTABLES, Name = "ListExecutables")]
    public ActionResult<IEnumerable<ExecutableInput>> ListExecutables()
    {
        return Ok(_inputService.ListExecutableInputs());
    }
    
    [HttpPost(Constants.API_SUBPATH_EXECUTABLES, Name = "AddExecutable")]
    public IActionResult AddExecutable([FromBody] ExecutableInput input)
    {
        _inputService.AddExecutableInput(input);
        return Ok();
    }
    
    [HttpDelete(Constants.API_SUBPATH_EXECUTABLES + "/{name}/{language}", Name = "DeleteExecutable")]
    public IActionResult DeleteExecutable(string name, string language)
    {
        _inputService.DeleteExecutableInput(name, language);
        return Ok();
    }
}
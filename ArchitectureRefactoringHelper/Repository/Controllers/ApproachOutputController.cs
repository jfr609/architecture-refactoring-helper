using Microsoft.AspNetCore.Mvc;
using Repository.Models;
using Repository.Services;

namespace Repository.Controllers;

[ApiController]
[Route($"api/v{Constants.API_VERSION}/{Constants.API_SUBPATH_OUTPUTS}")]
[Produces("application/json")]
public class ApproachOutputController : ControllerBase
{
    private readonly ApproachOutputService _outputService;

    public ApproachOutputController(ApproachOutputService outputService)
    {
        _outputService = outputService;
    }
    
    [HttpGet(Name = "ListApproachOutputs")]
    public ActionResult<IEnumerable<ApproachOutput>> ListApproachOutputs()
    {
        return Ok(_outputService.ListApproachOutputs());
    }
    
    [HttpGet("{id:int}", Name = "GetApproachOutput")]
    public ActionResult<ApproachOutput> GetApproachOutput(int id)
    {
        return Ok(_outputService.GetApproachOutput(id));
    }
    
    [HttpGet(Constants.API_SUBPATH_ARCHITECTURES, Name = "ListArchitectures")]
    public ActionResult<IEnumerable<Architecture>> ListArchitectures()
    {
        return Ok(_outputService.ListArchitectures());
    }
    
    [HttpPost(Constants.API_SUBPATH_ARCHITECTURES, Name = "AddArchitecture")]
    public IActionResult AddArchitecture([FromBody] Architecture architecture)
    {
        _outputService.AddArchitecture(architecture);
        return Ok();
    }
    
    [HttpDelete(Constants.API_SUBPATH_ARCHITECTURES + "/{name}", Name = "DeleteArchitecture")]
    public IActionResult DeleteArchitecture(string name)
    {
        _outputService.DeleteArchitecture(name);
        return Ok();
    }
    
    [HttpGet(Constants.API_SUBPATH_SERVICETYPES, Name = "ListServiceTypes")]
    public ActionResult<IEnumerable<ServiceType>> ListServiceTypes()
    {
        return Ok(_outputService.ListServiceTypes());
    }
    
    [HttpPost(Constants.API_SUBPATH_SERVICETYPES, Name = "AddServiceType")]
    public IActionResult AddServiceType([FromBody] ServiceType serviceType)
    {
        _outputService.AddServiceType(serviceType);
        return Ok();
    }
    
    [HttpDelete(Constants.API_SUBPATH_SERVICETYPES + "/{name}", Name = "DeleteServiceType")]
    public IActionResult DeleteServiceType(string name)
    {
        _outputService.DeleteServiceType(name);
        return Ok();
    }
}
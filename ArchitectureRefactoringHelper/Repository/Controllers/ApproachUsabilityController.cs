using Microsoft.AspNetCore.Mvc;
using Repository.Models;
using Repository.Services;

namespace Repository.Controllers;

[ApiController]
[Route($"api/v{Constants.API_VERSION}/{Constants.API_SUBPATH_USABILITIES}")]
public class ApproachUsabilityController : ControllerBase
{
    private readonly ApproachUsabilityService _usabilityService;

    public ApproachUsabilityController(ApproachUsabilityService usabilityService)
    {
        _usabilityService = usabilityService;
    }
    
    [HttpGet(Name = "ListApproachUsabilities")]
    public ActionResult<IEnumerable<ApproachUsability>> ListApproachUsabilities()
    {
        return Ok(_usabilityService.ListApproachUsabilities());
    }
    
    [HttpGet("{id:int}", Name = "GetApproachUsability")]
    public ActionResult<ApproachUsability> GetApproachUsability(int id)
    {
        return Ok(_usabilityService.GetApproachUsability(id));
    }
}
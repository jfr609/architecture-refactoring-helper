using Microsoft.AspNetCore.Mvc;
using Repository.Models;
using Repository.Services;

namespace Repository.Controllers;

[ApiController]
[Route($"api/v{Constants.API_VERSION}/{Constants.API_SUBPATH_PROCESSES}")]
public class ApproachProcessController : ControllerBase
{
    private readonly ApproachProcessService _processService;
    
    public ApproachProcessController(ApproachProcessService processService)
    {
        _processService = processService;
    }
    
    [HttpGet(Name = "ListApproachProcess")]
    public ActionResult<IEnumerable<ApproachProcess>> List()
    {
        return Ok(_processService.ListApproachProcesses());
    }
    
    [HttpGet("{id:guid}", Name = "GetApproachProcess")]
    public ActionResult<ApproachProcess> Get(Guid id)
    {
        return Ok(_processService.GetApproachProcess(id));
    }

    [HttpPost(Name = "AddApproachProcess")]
    public IActionResult Add([FromBody] ApproachProcess process)
    {
        _processService.AddApproachProcess(process);
        return Ok();
    }
    
    [HttpPut("{id:guid}", Name = "UpdateApproachProcess")]
    public IActionResult Update(Guid id, [FromBody] ApproachProcess process)
    {
        return Ok();
    }
    
    [HttpDelete("{id:guid}", Name = "DeleteApproachProcess")]
    public IActionResult Delete(Guid id)
    {
        return Ok();
    }
    
}
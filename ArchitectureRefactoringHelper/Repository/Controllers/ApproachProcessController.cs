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
    public ActionResult<IEnumerable<ApproachProcess>> ListApproachProcesses()
    {
        return Ok(_processService.ListApproachProcesses());
    }
    
    [HttpGet("{id:int}", Name = "GetApproachProcess")]
    public ActionResult<ApproachProcess> GetApproachProcess(int id)
    {
        return Ok(_processService.GetApproachProcess(id));
    }

    /*[HttpPost(Name = "AddApproachProcess")]
    public IActionResult AddApproachProcess([FromBody] ApproachProcess process)
    {
        _processService.AddApproachProcess(process);
        return Ok();
    }
    
    [HttpPut("{id:int}", Name = "UpdateApproachProcess")]
    public IActionResult UpdateApproachProcess(int id, [FromBody] ApproachProcess process)
    {
        _processService.UpdateApproachProcess(id, process);
        return Ok();
    }
    
    [HttpDelete("{id:int}", Name = "DeleteApproachProcess")]
    public IActionResult DeleteApproachProcess(int id)
    {
        _processService.DeleteApproachProcess(id);
        return Ok();
    }*/
    
    [HttpGet(Constants.API_SUBPATH_QUALITIES, Name = "ListQualities")]
    public ActionResult<IEnumerable<Quality>> ListQualities()
    {
        return Ok(_processService.ListQualities());
    }
    
    [HttpPost(Constants.API_SUBPATH_QUALITIES, Name = "AddQuality")]
    public IActionResult AddQuality([FromBody] Quality quality)
    {
        _processService.AddQuality(quality);
        return Ok();
    }
    
    [HttpDelete(Constants.API_SUBPATH_QUALITIES + "/{name}", Name = "DeleteQuality")]
    public IActionResult DeleteQuality(string name)
    {
        _processService.DeleteQuality(name);
        return Ok();
    }
    
    [HttpGet(Constants.API_SUBPATH_DIRECTIONS, Name = "ListDirections")]
    public ActionResult<IEnumerable<Direction>> ListDirections()
    {
        return Ok(_processService.ListDirections());
    }
    
    [HttpPost(Constants.API_SUBPATH_DIRECTIONS, Name = "AddDirection")]
    public IActionResult AddDirection([FromBody] Direction direction)
    {
        _processService.AddDirection(direction);
        return Ok();
    }
    
    [HttpDelete(Constants.API_SUBPATH_DIRECTIONS + "/{name}", Name = "DeleteDirection")]
    public IActionResult DeleteDirection(string name)
    {
        _processService.DeleteDirection(name);
        return Ok();
    }
    
    [HttpGet(Constants.API_SUBPATH_AUTOMATIONLEVELS, Name = "ListAutomationLevels")]
    public ActionResult<IEnumerable<AutomationLevel>> ListAutomationLevels()
    {
        return Ok(_processService.ListAutomationLevels());
    }
    
    [HttpPost(Constants.API_SUBPATH_AUTOMATIONLEVELS, Name = "AddAutomationLevel")]
    public IActionResult AddAutomationLevel([FromBody] AutomationLevel automationLevel)
    {
        _processService.AddAutomationLevel(automationLevel);
        return Ok();
    }
    
    [HttpDelete(Constants.API_SUBPATH_AUTOMATIONLEVELS + "/{name}", Name = "DeleteAutomationLevel")]
    public IActionResult DeleteAutomationLevel(string name)
    {
        _processService.DeleteAutomationLevel(name);
        return Ok();
    }
    
    [HttpGet(Constants.API_SUBPATH_ANALYSISTYPES, Name = "ListAnalysisTypes")]
    public ActionResult<IEnumerable<AnalysisType>> ListAnalysisTypes()
    {
        return Ok(_processService.ListAnalysisTypes());
    }
    
    [HttpPost(Constants.API_SUBPATH_ANALYSISTYPES, Name = "AddAnalysisType")]
    public IActionResult AddAnalysisType([FromBody] AnalysisType analysisType)
    {
        _processService.AddAnalysisType(analysisType);
        return Ok();
    }
    
    [HttpDelete(Constants.API_SUBPATH_ANALYSISTYPES + "/{name}", Name = "DeleteAnalysisType")]
    public IActionResult DeleteAnalysisType(string name)
    {
        _processService.DeleteAnalysisType(name);
        return Ok();
    }
    
    [HttpGet(Constants.API_SUBPATH_TECHNIQUES, Name = "ListTechniques")]
    public ActionResult<IEnumerable<Quality>> ListTechniques()
    {
        return Ok(_processService.ListTechniques());
    }
    
    [HttpPost(Constants.API_SUBPATH_TECHNIQUES, Name = "AddTechnique")]
    public IActionResult AddTechnique([FromBody] Technique technique)
    {
        _processService.AddTechnique(technique);
        return Ok();
    }
    
    [HttpDelete(Constants.API_SUBPATH_TECHNIQUES + "/{name}", Name = "DeleteTechnique")]
    public IActionResult DeleteTechnique(string name)
    {
        _processService.DeleteTechnique(name);
        return Ok();
    }
    
}
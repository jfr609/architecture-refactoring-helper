using Microsoft.AspNetCore.Mvc;
using Repository.Exceptions;
using Repository.Models.Database;
using Repository.Services;

namespace Repository.Controllers;

[ApiController]
[Route($"api/v{Constants.ApiVersion}/{Constants.ApiSubPathProcesses}")]
[Produces("application/json")]
[TypeFilter(typeof(ServiceExceptionFilter))]
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
        
    [HttpDelete("{id:int}", Name = "DeleteApproachProcess")]
    public IActionResult DeleteApproachProcess(int id)
    {
        _processService.DeleteApproachProcess(id);
        return Ok();
    }*/

    [HttpGet(Constants.ApiSubPathQualities, Name = "ListQualities")]
    public ActionResult<IEnumerable<Quality>> ListQualities()
    {
        return Ok(_processService.ListQualities());
    }

    [HttpPost(Constants.ApiSubPathQualities, Name = "AddQuality")]
    public ActionResult<Quality> AddQuality([FromBody] Quality quality)
    {
        var savedQuality = _processService.AddQuality(quality);
        return Created("", savedQuality);
    }

    [HttpDelete(Constants.ApiSubPathQualities + "/{name}", Name = "DeleteQuality")]
    public IActionResult DeleteQuality(string name)
    {
        _processService.DeleteQuality(name);
        return NoContent();
    }

    [HttpGet(Constants.ApiSubPathQualitySubs, Name = "ListQualitySubs")]
    public ActionResult<IEnumerable<QualitySub>> ListQualitySub()
    {
        return Ok(_processService.ListQualitySubs());
    }

    [HttpGet(Constants.ApiSubPathDirections, Name = "ListDirections")]
    public ActionResult<IEnumerable<Direction>> ListDirections()
    {
        return Ok(_processService.ListDirections());
    }

    [HttpPost(Constants.ApiSubPathDirections, Name = "AddDirection")]
    public ActionResult<Direction> AddDirection([FromBody] Direction direction)
    {
        var savedDirection = _processService.AddDirection(direction);
        return Created("", savedDirection);
    }

    [HttpDelete(Constants.ApiSubPathDirections + "/{name}", Name = "DeleteDirection")]
    public IActionResult DeleteDirection(string name)
    {
        _processService.DeleteDirection(name);
        return NoContent();
    }

    [HttpGet(Constants.ApiSubPathAutomationLevels, Name = "ListAutomationLevels")]
    public ActionResult<IEnumerable<AutomationLevel>> ListAutomationLevels()
    {
        return Ok(_processService.ListAutomationLevels());
    }

    [HttpPost(Constants.ApiSubPathAutomationLevels, Name = "AddAutomationLevel")]
    public ActionResult<AutomationLevel> AddAutomationLevel([FromBody] AutomationLevel automationLevel)
    {
        var savedAutomationLevel = _processService.AddAutomationLevel(automationLevel);
        return Created("", savedAutomationLevel);
    }

    [HttpDelete(Constants.ApiSubPathAutomationLevels + "/{name}", Name = "DeleteAutomationLevel")]
    public IActionResult DeleteAutomationLevel(string name)
    {
        _processService.DeleteAutomationLevel(name);
        return NoContent();
    }

    [HttpGet(Constants.ApiSubPathAnalysisTypes, Name = "ListAnalysisTypes")]
    public ActionResult<IEnumerable<AnalysisType>> ListAnalysisTypes()
    {
        return Ok(_processService.ListAnalysisTypes());
    }

    [HttpPost(Constants.ApiSubPathAnalysisTypes, Name = "AddAnalysisType")]
    public ActionResult<AnalysisType> AddAnalysisType([FromBody] AnalysisType analysisType)
    {
        var savedAnalysisType = _processService.AddAnalysisType(analysisType);
        return Created("", savedAnalysisType);
    }

    [HttpDelete(Constants.ApiSubPathAnalysisTypes + "/{name}", Name = "DeleteAnalysisType")]
    public IActionResult DeleteAnalysisType(string name)
    {
        _processService.DeleteAnalysisType(name);
        return NoContent();
    }

    [HttpGet(Constants.ApiSubPathTechniques, Name = "ListTechniques")]
    public ActionResult<IEnumerable<Quality>> ListTechniques()
    {
        return Ok(_processService.ListTechniques());
    }

    [HttpPost(Constants.ApiSubPathTechniques, Name = "AddTechnique")]
    public ActionResult<Technique> AddTechnique([FromBody] Technique technique)
    {
        var savedTechnique = _processService.AddTechnique(technique);
        return Created("", savedTechnique);
    }

    [HttpDelete(Constants.ApiSubPathTechniques + "/{name}", Name = "DeleteTechnique")]
    public IActionResult DeleteTechnique(string name)
    {
        _processService.DeleteTechnique(name);
        return NoContent();
    }
}
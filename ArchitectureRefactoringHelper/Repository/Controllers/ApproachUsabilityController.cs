using Microsoft.AspNetCore.Mvc;
using Repository.Models;
using Repository.Services;

namespace Repository.Controllers;

[ApiController]
[Route($"api/v{Constants.API_VERSION}/{Constants.API_SUBPATH_USABILITIES}")]
[Produces("application/json")]
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
    
    [HttpGet(Constants.API_SUBPATH_RESULTSQUALITIES, Name = "ListResultsQualities")]
    public ActionResult<IEnumerable<ResultsQuality>> ListResultsQualities()
    {
        return Ok(_usabilityService.ListResultsQualities());
    }
    
    [HttpPost(Constants.API_SUBPATH_RESULTSQUALITIES, Name = "AddResultsQuality")]
    public IActionResult AddResultsQuality([FromBody] ResultsQuality resultsQuality)
    {
        _usabilityService.AddResultsQuality(resultsQuality);
        return Ok();
    }
    
    [HttpDelete(Constants.API_SUBPATH_RESULTSQUALITIES + "/{name}", Name = "DeleteResultsQuality")]
    public IActionResult DeleteResultsQuality(string name)
    {
        _usabilityService.DeleteResultsQuality(name);
        return Ok();
    }
    
    [HttpGet(Constants.API_SUBPATH_TOOLSUPPORTS, Name = "ListToolSupports")]
    public ActionResult<IEnumerable<ToolSupport>> ListToolSupports()
    {
        return Ok(_usabilityService.ListToolSupports());
    }
    
    [HttpPost(Constants.API_SUBPATH_TOOLSUPPORTS, Name = "AddToolSupport")]
    public IActionResult AddToolSupport([FromBody] ToolSupport toolSupport)
    {
        _usabilityService.AddToolSupport(toolSupport);
        return Ok();
    }
    
    [HttpDelete(Constants.API_SUBPATH_TOOLSUPPORTS + "/{name}", Name = "DeleteToolSupport")]
    public IActionResult DeleteToolSupport(string name)
    {
        _usabilityService.DeleteToolSupport(name);
        return Ok();
    }
    
    [HttpGet(Constants.API_SUBPATH_ACCURACYPRECISIONS, Name = "ListAccuracyPrecisions")]
    public ActionResult<IEnumerable<AccuracyPrecision>> ListAccuracyPrecisions()
    {
        return Ok(_usabilityService.ListAccuracyPrecisions());
    }
    
    [HttpPost(Constants.API_SUBPATH_ACCURACYPRECISIONS, Name = "AddAccuracyPrecision")]
    public IActionResult AddAccuracyPrecision([FromBody] AccuracyPrecision accuracyPrecision)
    {
        _usabilityService.AddAccuracyPrecision(accuracyPrecision);
        return Ok();
    }
    
    [HttpDelete(Constants.API_SUBPATH_ACCURACYPRECISIONS + "/{name}", Name = "DeleteAccuracyPrecision")]
    public IActionResult DeleteAccuracyPrecision(string name)
    {
        _usabilityService.DeleteAccuracyPrecision(name);
        return Ok();
    }
    
    [HttpGet(Constants.API_SUBPATH_VALIDATIONMETHODS, Name = "ListValidationMethods")]
    public ActionResult<IEnumerable<ValidationMethod>> ListValidationMethods()
    {
        return Ok(_usabilityService.ListValidationMethods());
    }
    
    [HttpPost(Constants.API_SUBPATH_VALIDATIONMETHODS, Name = "AddValidationMethod")]
    public IActionResult AddValidationMethod([FromBody] ValidationMethod validationMethod)
    {
        _usabilityService.AddValidationMethod(validationMethod);
        return Ok();
    }
    
    [HttpDelete(Constants.API_SUBPATH_VALIDATIONMETHODS + "/{name}", Name = "DeleteValidationMethod")]
    public IActionResult DeleteValidationMethod(string name)
    {
        _usabilityService.DeleteValidationMethod(name);
        return Ok();
    }
}
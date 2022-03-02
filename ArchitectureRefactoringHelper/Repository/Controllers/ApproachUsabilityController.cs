using Microsoft.AspNetCore.Mvc;
using Repository.Exceptions;
using Repository.Models.Database;
using Repository.Services;

namespace Repository.Controllers;

[ApiController]
[Route($"api/v{Constants.ApiVersion}/{Constants.ApiSubPathUsabilities}")]
[Produces("application/json")]
[TypeFilter(typeof(ServiceExceptionFilter))]
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

    [HttpGet(Constants.ApiSubPathResultsQualities, Name = "ListResultsQualities")]
    public ActionResult<IEnumerable<ResultsQuality>> ListResultsQualities()
    {
        return Ok(_usabilityService.ListResultsQualities());
    }

    [HttpPost(Constants.ApiSubPathResultsQualities, Name = "AddResultsQuality")]
    public ActionResult<ResultsQuality> AddResultsQuality([FromBody] ResultsQuality resultsQuality)
    {
        var savedResultsQuality = _usabilityService.AddResultsQuality(resultsQuality);
        return Created("", savedResultsQuality);
    }

    [HttpDelete(Constants.ApiSubPathResultsQualities + "/{name}", Name = "DeleteResultsQuality")]
    public IActionResult DeleteResultsQuality(string name)
    {
        _usabilityService.DeleteResultsQuality(name);
        return NoContent();
    }

    [HttpGet(Constants.ApiSubPathToolSupports, Name = "ListToolSupports")]
    public ActionResult<IEnumerable<ToolSupport>> ListToolSupports()
    {
        return Ok(_usabilityService.ListToolSupports());
    }

    [HttpPost(Constants.ApiSubPathToolSupports, Name = "AddToolSupport")]
    public ActionResult<ToolSupport> AddToolSupport([FromBody] ToolSupport toolSupport)
    {
        var savedToolSupport = _usabilityService.AddToolSupport(toolSupport);
        return Created("", savedToolSupport);
    }

    [HttpDelete(Constants.ApiSubPathToolSupports + "/{name}", Name = "DeleteToolSupport")]
    public IActionResult DeleteToolSupport(string name)
    {
        _usabilityService.DeleteToolSupport(name);
        return NoContent();
    }

    [HttpGet(Constants.ApiSubPathAccuracyPrecisions, Name = "ListAccuracyPrecisions")]
    public ActionResult<IEnumerable<AccuracyPrecision>> ListAccuracyPrecisions()
    {
        return Ok(_usabilityService.ListAccuracyPrecisions());
    }

    [HttpPost(Constants.ApiSubPathAccuracyPrecisions, Name = "AddAccuracyPrecision")]
    public ActionResult<AccuracyPrecision> AddAccuracyPrecision([FromBody] AccuracyPrecision accuracyPrecision)
    {
        var savedAccuracyPrecision = _usabilityService.AddAccuracyPrecision(accuracyPrecision);
        return Created("", savedAccuracyPrecision);
    }

    [HttpDelete(Constants.ApiSubPathAccuracyPrecisions + "/{name}", Name = "DeleteAccuracyPrecision")]
    public IActionResult DeleteAccuracyPrecision(string name)
    {
        _usabilityService.DeleteAccuracyPrecision(name);
        return NoContent();
    }

    [HttpGet(Constants.ApiSubPathValidationMethods, Name = "ListValidationMethods")]
    public ActionResult<IEnumerable<ValidationMethod>> ListValidationMethods()
    {
        return Ok(_usabilityService.ListValidationMethods());
    }

    [HttpPost(Constants.ApiSubPathValidationMethods, Name = "AddValidationMethod")]
    public ActionResult<ValidationMethod> AddValidationMethod([FromBody] ValidationMethod validationMethod)
    {
        var savedValidationMethod = _usabilityService.AddValidationMethod(validationMethod);
        return Created("", savedValidationMethod);
    }

    [HttpDelete(Constants.ApiSubPathValidationMethods + "/{name}", Name = "DeleteValidationMethod")]
    public IActionResult DeleteValidationMethod(string name)
    {
        _usabilityService.DeleteValidationMethod(name);
        return NoContent();
    }
}
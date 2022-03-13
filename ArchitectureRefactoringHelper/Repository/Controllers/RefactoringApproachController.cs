using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Repository.Exceptions;
using Repository.Models.Database;
using Repository.Models.Recommendation;
using Repository.Services;

namespace Repository.Controllers;

[ApiController]
[Route($"api/v{Constants.ApiVersion}/{Constants.ApiSubPathApproaches}")]
[Produces("application/json")]
[TypeFilter(typeof(ServiceExceptionFilter))]
public class RefactoringApproachController : ControllerBase
{
    private readonly RefactoringApproachService _refactoringApproachService;
    private readonly IRecommendationService _recommendationService;

    public RefactoringApproachController(RefactoringApproachService refactoringApproachService,
        IRecommendationService recommendationService)
    {
        _refactoringApproachService = refactoringApproachService;
        _recommendationService = recommendationService;
    }

    /// <summary>
    /// Receives a complete list of all RefactoringApproach items  
    /// </summary>
    /// <returns>List of Refactoring approach items</returns>
    [HttpGet(Name = "ListRefactoringApproaches")]
    public ActionResult<IEnumerable<RefactoringApproach>> ListRefactoringApproaches()
    {
        return Ok(_refactoringApproachService.ListRefactoringApproaches());
    }

    /// <summary>
    /// Receives a RefactoringApproach
    /// </summary>
    /// <param name="id"></param>
    /// <returns>The RefactoringApproach with the given ID</returns>
    [HttpGet("{id:int}", Name = "GetRefactoringApproach")]
    public ActionResult<RefactoringApproach> GetRefactoringApproach(int id)
    {
        return Ok(_refactoringApproachService.GetRefactoringApproach(id));
    }

    /// <summary>
    /// Creates a new RefactoringApproach.
    /// Inputs, process attributes, outputs or usability attributes that don't exist will be created in the process.
    /// </summary>
    /// <param name="approach">The RefactoringApproach we want to add</param>
    /// <returns>The created RefactoringApproach</returns>
    /// <response code="201">Returns the newly created RefactoringApproach</response>
    /// <response code="400">If the RefactoringApproach is null</response>
    /// <response code="409">If a RefactoringApproach with the same title already exists</response>
    [HttpPost(Name = "AddRefactoringApproach")]
    [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(RefactoringApproach))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    public ActionResult<RefactoringApproach> AddRefactoringApproach([FromBody] RefactoringApproach approach)
    {
        var refactoringApproach = _refactoringApproachService.AddRefactoringApproachIfNotExists(approach);
        var url = Url.Action("GetRefactoringApproach", "RefactoringApproach",
            new { id = refactoringApproach.RefactoringApproachId }, Request.Scheme) ?? "";
        return Created(url, refactoringApproach);
    }

    /// <summary>
    /// Deletes a RefactoringApproach
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    [HttpDelete("{id:int}", Name = "DeleteRefactoringApproach")]
    public IActionResult DeleteRefactoringApproach(int id)
    {
        _refactoringApproachService.DeleteRefactoringApproach(id);

        return NoContent();
    }

    [HttpPost("recommendations", Name = "RecommendRefactoringApproaches")]
    public ActionResult<IEnumerable<ApproachRecommendation>> RecommendRefactoringApproaches(
        [FromBody(EmptyBodyBehavior = EmptyBodyBehavior.Allow)] ApproachRecommendationRequest? approachRecommendationRequest,
        [FromQuery] int? count,
        [FromQuery] RecommendationPreset? preset)
    {
        // Console.WriteLine(approachRecommendationRequest.ToJsonString());
        var numberOfRecommendations = count ?? Constants.DefaultNumberOfRecommendations;

        IEnumerable<ApproachRecommendation> recommendations;
        if (preset == null)
        {
            if (approachRecommendationRequest == null)
                return BadRequest("Either a request body or a preset is required");

            recommendations =
                _recommendationService.GetApproachRecommendations(approachRecommendationRequest,
                    numberOfRecommendations);
        }
        else
        {
            recommendations =
                _recommendationService.GetApproachRecommendations((RecommendationPreset)preset,
                    numberOfRecommendations);
        }

        return Ok(recommendations);
    }

    [HttpPost("{id:int}/" + Constants.ApiSubPathInputs + "/" + Constants.ApiSubPathDomainArtifacts,
        Name = "AddDomainArtifactAsInput")]
    public IActionResult AddDomainArtifactAsInput(int id, [FromBody] DomainArtifactInput domainArtifact)
    {
        _refactoringApproachService.AddDomainArtifactAsInput(id, domainArtifact);

        return NoContent();
    }

    [HttpDelete(
        "{id:int}/" + Constants.ApiSubPathInputs + "/" + Constants.ApiSubPathDomainArtifacts + "/{inputName}",
        Name = "RemoveDomainArtifactFromInputs")]
    public IActionResult RemoveDomainArtifactFromInputs(int id, string inputName)
    {
        _refactoringApproachService.RemoveDomainArtifactFromInputs(id, inputName);

        return NoContent();
    }

    [HttpPost("{id:int}/" + Constants.ApiSubPathInputs + "/" + Constants.ApiSubPathRuntimeArtifacts,
        Name = "AddRuntimeArtifactAsInput")]
    public IActionResult AddRuntimeArtifactAsInput(int id, [FromBody] RuntimeArtifactInput runtimeArtifact)
    {
        _refactoringApproachService.AddRuntimeArtifactAsInput(id, runtimeArtifact);

        return NoContent();
    }

    [HttpDelete(
        "{id:int}/" + Constants.ApiSubPathInputs + "/" + Constants.ApiSubPathRuntimeArtifacts + "/{inputName}",
        Name = "RemoveRuntimeArtifactFromInputs")]
    public IActionResult RemoveRuntimeArtifactFromInputs(int id, string inputName)
    {
        _refactoringApproachService.RemoveRuntimeArtifactFromInputs(id, inputName);

        return NoContent();
    }

    [HttpPost("{id:int}/" + Constants.ApiSubPathInputs + "/" + Constants.ApiSubPathModelArtifacts,
        Name = "AddModelArtifactAsInput")]
    public IActionResult AddModelArtifactAsInput(int id, [FromBody] ModelArtifactInput modelArtifact)
    {
        _refactoringApproachService.AddModelArtifactAsInput(id, modelArtifact);

        return NoContent();
    }

    [HttpDelete(
        "{id:int}/" + Constants.ApiSubPathInputs + "/" + Constants.ApiSubPathModelArtifacts + "/{inputName}",
        Name = "RemoveModelArtifactFromInputs")]
    public IActionResult RemoveModelArtifactFromInputs(int id, string inputName)
    {
        _refactoringApproachService.RemoveModelArtifactFromInputs(id, inputName);

        return NoContent();
    }

    [HttpPost("{id:int}/" + Constants.ApiSubPathInputs + "/" + Constants.ApiSubPathExecutables,
        Name = "AddExecutableAsInput")]
    public IActionResult AddExecutableAsInput(int id, [FromBody] ExecutableInput executable)
    {
        _refactoringApproachService.AddExecutableAsInput(id, executable);

        return NoContent();
    }

    [HttpDelete(
        "{id:int}/" + Constants.ApiSubPathInputs + "/" + Constants.ApiSubPathExecutables +
        "/{inputName}/{language}",
        Name = "RemoveExecutableFromInputs")]
    public IActionResult RemoveExecutableFromInputs(int id, string inputName, string language)
    {
        _refactoringApproachService.RemoveExecutableFromInputs(id, inputName, language);

        return NoContent();
    }

    [HttpPost("{id:int}/" + Constants.ApiSubPathProcesses + "/" + Constants.ApiSubPathQualities,
        Name = "AddQualityToProcess")]
    public IActionResult AddQualityToProcess(int id, [FromBody] Quality quality)
    {
        _refactoringApproachService.AddQualityToProcess(id, quality);

        return NoContent();
    }

    [HttpDelete(
        "{id:int}/" + Constants.ApiSubPathProcesses + "/" + Constants.ApiSubPathQualities + "/{qualityName}",
        Name = "RemoveQualityFromProcess")]
    public IActionResult RemoveQualityFromProcess(int id, string qualityName)
    {
        _refactoringApproachService.RemoveQualityFromProcess(id, qualityName);

        return NoContent();
    }

    [HttpPost("{id:int}/" + Constants.ApiSubPathProcesses + "/" + Constants.ApiSubPathDirections,
        Name = "AddDirectionToProcess")]
    public IActionResult AddDirectionToProcess(int id, [FromBody] Direction direction)
    {
        _refactoringApproachService.AddDirectionToProcess(id, direction);

        return NoContent();
    }

    [HttpDelete(
        "{id:int}/" + Constants.ApiSubPathProcesses + "/" + Constants.ApiSubPathDirections + "/{directionName}",
        Name = "RemoveDirectionFromProcess")]
    public IActionResult RemoveDirectionFromProcess(int id, string directionName)
    {
        _refactoringApproachService.RemoveDirectionFromProcess(id, directionName);

        return NoContent();
    }

    [HttpPost("{id:int}/" + Constants.ApiSubPathProcesses + "/" + Constants.ApiSubPathAutomationLevels,
        Name = "AddAutomationLevelToProcess")]
    public IActionResult AddAutomationLevelToProcess(int id, [FromBody] AutomationLevel automationLevel)
    {
        _refactoringApproachService.AddAutomationLevelToProcess(id, automationLevel);

        return NoContent();
    }

    [HttpDelete(
        "{id:int}/" + Constants.ApiSubPathProcesses + "/" + Constants.ApiSubPathAutomationLevels +
        "/{automationLevelName}",
        Name = "RemoveAutomationLevelFromProcess")]
    public IActionResult RemoveAutomationLevelFromProcess(int id, string automationLevelName)
    {
        _refactoringApproachService.RemoveAutomationLevelFromProcess(id, automationLevelName);

        return NoContent();
    }

    [HttpPost("{id:int}/" + Constants.ApiSubPathProcesses + "/" + Constants.ApiSubPathAnalysisTypes,
        Name = "AddAnalysisTypeToProcess")]
    public IActionResult AddAnalysisTypeToProcess(int id, [FromBody] AnalysisType analysisType)
    {
        _refactoringApproachService.AddAnalysisTypeToProcess(id, analysisType);

        return NoContent();
    }

    [HttpDelete(
        "{id:int}/" + Constants.ApiSubPathProcesses + "/" + Constants.ApiSubPathAnalysisTypes +
        "/{analysisTypeName}",
        Name = "RemoveAnalysisTypeFromProcess")]
    public IActionResult RemoveAnalysisTypeFromProcess(int id, string analysisTypeName)
    {
        _refactoringApproachService.RemoveAnalysisTypeFromProcess(id, analysisTypeName);

        return NoContent();
    }

    [HttpPost("{id:int}/" + Constants.ApiSubPathProcesses + "/" + Constants.ApiSubPathTechniques,
        Name = "AddTechniqueToProcess")]
    public IActionResult AddTechniqueToProcess(int id, [FromBody] Technique technique)
    {
        _refactoringApproachService.AddTechniqueToProcess(id, technique);

        return NoContent();
    }

    [HttpDelete(
        "{id:int}/" + Constants.ApiSubPathProcesses + "/" + Constants.ApiSubPathTechniques + "/{techniqueName}",
        Name = "RemoveTechniqueFromProcess")]
    public IActionResult RemoveTechniqueFromProcess(int id, string techniqueName)
    {
        _refactoringApproachService.RemoveTechniqueFromProcess(id, techniqueName);

        return NoContent();
    }

    [HttpPost("{id:int}/" + Constants.ApiSubPathOutputs,
        Name = "AddOutput")]
    public IActionResult AddOutput(int id, [FromBody] ApproachOutput output)
    {
        _refactoringApproachService.AddOutput(id, output);

        return NoContent();
    }

    [HttpDelete("{id:int}/" + Constants.ApiSubPathOutputs + "/{outputId:int}",
        Name = "RemoveOutput")]
    public IActionResult RemoveOutput(int id, int outputId)
    {
        _refactoringApproachService.RemoveOutput(id, outputId);

        return NoContent();
    }

    [HttpPost("{id:int}/" + Constants.ApiSubPathUsabilities + "/" + Constants.ApiSubPathResultsQualities,
        Name = "UpdateResultsQuality")]
    public IActionResult UpdateResultsQuality(int id, [FromBody] ResultsQuality resultsQuality)
    {
        _refactoringApproachService.UpdateResultsQuality(id, resultsQuality);

        return NoContent();
    }

    [HttpPost("{id:int}/" + Constants.ApiSubPathUsabilities + "/" + Constants.ApiSubPathToolSupports,
        Name = "UpdateToolSupport")]
    public IActionResult UpdateToolSupport(int id, [FromBody] ToolSupport toolSupport)
    {
        _refactoringApproachService.UpdateToolSupport(id, toolSupport);

        return NoContent();
    }

    [HttpPost("{id:int}/" + Constants.ApiSubPathUsabilities + "/" + Constants.ApiSubPathAccuracyPrecisions,
        Name = "UpdateAccuracyPrecision")]
    public IActionResult UpdateAccuracyPrecision(int id, [FromBody] AccuracyPrecision accuracyPrecision)
    {
        _refactoringApproachService.UpdateAccuracyPrecision(id, accuracyPrecision);

        return NoContent();
    }

    [HttpPost("{id:int}/" + Constants.ApiSubPathUsabilities + "/" + Constants.ApiSubPathValidationMethods,
        Name = "UpdateValidationMethod")]
    public IActionResult UpdateValidationMethod(int id, [FromBody] ValidationMethod validationMethod)
    {
        _refactoringApproachService.UpdateValidationMethod(id, validationMethod);

        return NoContent();
    }
}
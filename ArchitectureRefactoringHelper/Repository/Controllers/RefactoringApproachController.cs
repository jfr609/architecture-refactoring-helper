using Microsoft.AspNetCore.Mvc;
using Repository.Exceptions;
using Repository.Models;
using Repository.Services;

namespace Repository.Controllers;

[ApiController]
[Route($"api/v{Constants.API_VERSION}/{Constants.API_SUBPATH_APPROACHES}")]
[Produces("application/json")]
[TypeFilter(typeof(ServiceExceptionFilter))]
public class RefactoringApproachController : ControllerBase
{
    private readonly RefactoringApproachService _refactoringApproachService;

    public RefactoringApproachController(RefactoringApproachService refactoringApproachService)
    {
        _refactoringApproachService = refactoringApproachService;
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
    /// Creates a RefactoringApproach
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
        
        return Created(
            Url.Action("GetRefactoringApproach", "RefactoringApproach",
                new { id = refactoringApproach.RefactoringApproachId }, Request.Scheme)!, refactoringApproach);
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

        return Ok();
    }

    [HttpPost("{id:int}/" + Constants.API_SUBPATH_INPUTS + "/" + Constants.API_SUBPATH_DOMAINARTIFACTS,
        Name = "AddDomainArtifactAsInput")]
    public IActionResult AddDomainArtifactAsInput(int id, [FromBody] DomainArtifactInput domainArtifact)
    {
        _refactoringApproachService.AddDomainArtifactAsInput(id, domainArtifact);

        return Ok();
    }

    [HttpDelete(
        "{id:int}/" + Constants.API_SUBPATH_INPUTS + "/" + Constants.API_SUBPATH_DOMAINARTIFACTS + "/{inputName}",
        Name = "RemoveDomainArtifactFromInputs")]
    public IActionResult RemoveDomainArtifactFromInputs(int id, string inputName)
    {
        _refactoringApproachService.RemoveDomainArtifactFromInputs(id, inputName);

        return Ok();
    }

    [HttpPost("{id:int}/" + Constants.API_SUBPATH_INPUTS + "/" + Constants.API_SUBPATH_RUNTIMEARTIFACTS,
        Name = "AddRuntimeArtifactAsInput")]
    public IActionResult AddRuntimeArtifactAsInput(int id, [FromBody] RuntimeArtifactInput runtimeArtifact)
    {
        _refactoringApproachService.AddRuntimeArtifactAsInput(id, runtimeArtifact);

        return Ok();
    }

    [HttpDelete(
        "{id:int}/" + Constants.API_SUBPATH_INPUTS + "/" + Constants.API_SUBPATH_RUNTIMEARTIFACTS + "/{inputName}",
        Name = "RemoveRuntimeArtifactFromInputs")]
    public IActionResult RemoveRuntimeArtifactFromInputs(int id, string inputName)
    {
        _refactoringApproachService.RemoveRuntimeArtifactFromInputs(id, inputName);

        return Ok();
    }

    [HttpPost("{id:int}/" + Constants.API_SUBPATH_INPUTS + "/" + Constants.API_SUBPATH_MODELARTIFACTS,
        Name = "AddModelArtifactAsInput")]
    public IActionResult AddModelArtifactAsInput(int id, [FromBody] ModelArtifactInput modelArtifact)
    {
        _refactoringApproachService.AddModelArtifactAsInput(id, modelArtifact);

        return Ok();
    }

    [HttpDelete(
        "{id:int}/" + Constants.API_SUBPATH_INPUTS + "/" + Constants.API_SUBPATH_MODELARTIFACTS + "/{inputName}",
        Name = "RemoveModelArtifactFromInputs")]
    public IActionResult RemoveModelArtifactFromInputs(int id, string inputName)
    {
        _refactoringApproachService.RemoveModelArtifactFromInputs(id, inputName);

        return Ok();
    }

    [HttpPost("{id:int}/" + Constants.API_SUBPATH_INPUTS + "/" + Constants.API_SUBPATH_EXECUTABLES,
        Name = "AddExecutableAsInput")]
    public IActionResult AddExecutableAsInput(int id, [FromBody] ExecutableInput executable)
    {
        _refactoringApproachService.AddExecutableAsInput(id, executable);

        return Ok();
    }

    [HttpDelete(
        "{id:int}/" + Constants.API_SUBPATH_INPUTS + "/" + Constants.API_SUBPATH_EXECUTABLES +
        "/{inputName}/{language}",
        Name = "RemoveExecutableFromInputs")]
    public IActionResult RemoveExecutableFromInputs(int id, string inputName, string language)
    {
        _refactoringApproachService.RemoveExecutableFromInputs(id, inputName, language);

        return Ok();
    }

    [HttpPost("{id:int}/" + Constants.API_SUBPATH_PROCESSES + "/" + Constants.API_SUBPATH_QUALITIES,
        Name = "AddQualityToProcess")]
    public IActionResult AddQualityToProcess(int id, [FromBody] Quality quality)
    {
        _refactoringApproachService.AddQualityToProcess(id, quality);
        
        return Ok();
    }

    [HttpDelete(
        "{id:int}/" + Constants.API_SUBPATH_PROCESSES + "/" + Constants.API_SUBPATH_QUALITIES + "/{qualityName}",
        Name = "RemoveQualityFromProcess")]
    public IActionResult RemoveQualityFromProcess(int id, string qualityName)
    {
        _refactoringApproachService.RemoveQualityFromProcess(id, qualityName);
        
        return Ok();
    }

    [HttpPost("{id:int}/" + Constants.API_SUBPATH_PROCESSES + "/" + Constants.API_SUBPATH_DIRECTIONS,
        Name = "AddDirectionToProcess")]
    public IActionResult AddDirectionToProcess(int id, [FromBody] Direction direction)
    {
        _refactoringApproachService.AddDirectionToProcess(id, direction);
        
        return Ok();
    }

    [HttpDelete(
        "{id:int}/" + Constants.API_SUBPATH_PROCESSES + "/" + Constants.API_SUBPATH_DIRECTIONS + "/{directionName}",
        Name = "RemoveDirectionFromProcess")]
    public IActionResult RemoveDirectionFromProcess(int id, string directionName)
    {
        _refactoringApproachService.RemoveDirectionFromProcess(id, directionName);
        
        return Ok();
    }

    [HttpPost("{id:int}/" + Constants.API_SUBPATH_PROCESSES + "/" + Constants.API_SUBPATH_AUTOMATIONLEVELS,
        Name = "AddAutomationLevelToProcess")]
    public IActionResult AddAutomationLevelToProcess(int id, [FromBody] AutomationLevel automationLevel)
    {
        _refactoringApproachService.AddAutomationLevelToProcess(id, automationLevel);
        
        return Ok();
    }

    [HttpDelete(
        "{id:int}/" + Constants.API_SUBPATH_PROCESSES + "/" + Constants.API_SUBPATH_AUTOMATIONLEVELS +
        "/{automationLevelName}",
        Name = "RemoveAutomationLevelFromProcess")]
    public IActionResult RemoveAutomationLevelFromProcess(int id, string automationLevelName)
    {
        _refactoringApproachService.RemoveAutomationLevelFromProcess(id, automationLevelName);
        
        return Ok();
    }

    [HttpPost("{id:int}/" + Constants.API_SUBPATH_PROCESSES + "/" + Constants.API_SUBPATH_ANALYSISTYPES,
        Name = "AddAnalysisTypeToProcess")]
    public IActionResult AddAnalysisTypeToProcess(int id, [FromBody] AnalysisType analysisType)
    {
        _refactoringApproachService.AddAnalysisTypeToProcess(id, analysisType);
        
        return Ok();
    }

    [HttpDelete(
        "{id:int}/" + Constants.API_SUBPATH_PROCESSES + "/" + Constants.API_SUBPATH_ANALYSISTYPES +
        "/{analysisTypeName}",
        Name = "RemoveAnalysisTypeFromProcess")]
    public IActionResult RemoveAnalysisTypeFromProcess(int id, string analysisTypeName)
    {
        _refactoringApproachService.RemoveAnalysisTypeFromProcess(id, analysisTypeName);
        
        return Ok();
    }

    [HttpPost("{id:int}/" + Constants.API_SUBPATH_PROCESSES + "/" + Constants.API_SUBPATH_TECHNIQUES,
        Name = "AddTechniqueToProcess")]
    public IActionResult AddTechniqueToProcess(int id, [FromBody] Technique technique)
    {
        _refactoringApproachService.AddTechniqueToProcess(id, technique);
        
        return Ok();
    }

    [HttpDelete(
        "{id:int}/" + Constants.API_SUBPATH_PROCESSES + "/" + Constants.API_SUBPATH_TECHNIQUES + "/{techniqueName}",
        Name = "RemoveTechniqueFromProcess")]
    public IActionResult RemoveTechniqueFromProcess(int id, string techniqueName)
    {
        _refactoringApproachService.RemoveTechniqueFromProcess(id, techniqueName);
        
        return Ok();
    }

    [HttpPost("{id:int}/" + Constants.API_SUBPATH_OUTPUTS,
        Name = "AddOutput")]
    public IActionResult AddOutput(int id, [FromBody] ApproachOutput output)
    {
        _refactoringApproachService.AddOutput(id, output);
        
        return Ok();
    }

    [HttpDelete("{id:int}/" + Constants.API_SUBPATH_OUTPUTS + "/{outputId:int}",
        Name = "RemoveOutput")]
    public IActionResult RemoveOutput(int id, int outputId)
    {
        _refactoringApproachService.RemoveOutput(id, outputId);
        
        return Ok();
    }

    [HttpPost("{id:int}/" + Constants.API_SUBPATH_USABILITIES + "/" + Constants.API_SUBPATH_RESULTSQUALITIES,
        Name = "UpdateResultsQuality")]
    public IActionResult UpdateResultsQuality(int id, [FromBody] ResultsQuality resultsQuality)
    {
        _refactoringApproachService.UpdateResultsQuality(id, resultsQuality);
        
        return Ok();
    }

    [HttpPost("{id:int}/" + Constants.API_SUBPATH_USABILITIES + "/" + Constants.API_SUBPATH_TOOLSUPPORTS,
        Name = "UpdateToolSupport")]
    public IActionResult UpdateToolSupport(int id, [FromBody] ToolSupport toolSupport)
    {
        _refactoringApproachService.UpdateToolSupport(id, toolSupport);
        
        return Ok();
    }

    [HttpPost("{id:int}/" + Constants.API_SUBPATH_USABILITIES + "/" + Constants.API_SUBPATH_ACCURACYPRECISIONS,
        Name = "UpdateAccuracyPrecision")]
    public IActionResult UpdateAccuracyPrecision(int id, [FromBody] AccuracyPrecision accuracyPrecision)
    {
        _refactoringApproachService.UpdateAccuracyPrecision(id, accuracyPrecision);
        
        return Ok();
    }

    [HttpPost("{id:int}/" + Constants.API_SUBPATH_USABILITIES + "/" + Constants.API_SUBPATH_VALIDATIONMETHODS,
        Name = "UpdateValidationMethod")]
    public IActionResult UpdateValidationMethod(int id, [FromBody] ValidationMethod validationMethod)
    {
        _refactoringApproachService.UpdateValidationMethod(id, validationMethod);
        
        return Ok();
    }
}
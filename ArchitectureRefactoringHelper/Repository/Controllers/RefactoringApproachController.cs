using Microsoft.AspNetCore.Mvc;
using Repository.Exceptions;
using Repository.Models;
using Repository.Services;

namespace Repository.Controllers;

[ApiController]
[Route($"api/v{Constants.API_VERSION}/{Constants.API_SUBPATH_APPROACHES}")]
[Produces("application/json")]
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
        RefactoringApproach refactoringApproach;
        try
        {
            refactoringApproach = _refactoringApproachService.AddRefactoringApproachIfNotExists(approach);
        }
        catch (DuplicateElementException e)
        {
            return Conflict(e.Message);
        }

        return Created(
            Url.Action("GetRefactoringApproach", "RefactoringApproach",
                new { id = refactoringApproach.RefactoringApproachId }, Request.Scheme)!, refactoringApproach);
    }

    /// <summary>
    /// Updated an existing RefactoringApproach (Not yet implemented)
    /// </summary>
    /// <param name="id"></param>
    /// <param name="approach"></param>
    /// <returns></returns>
    [HttpPut("{id:int}", Name = "UpdateRefactoringApproach")]
    public IActionResult UpdateRefactoringApproach(int id, [FromBody] RefactoringApproach approach)
    {
        // _refactoringApproachService.UpdateRefactoringApproach(id, approach);
        return Ok();
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
        return Ok();
    }

    [HttpDelete("{id:int}/" + Constants.API_SUBPATH_INPUTS + "/" + Constants.API_SUBPATH_DOMAINARTIFACTS + "/{inputName}",
        Name = "RemoveDomainArtifactFromInputs")]
    public IActionResult RemoveDomainArtifactFromInputs(int id, string inputName)
    {
        return Ok();
    }
    
    [HttpPost("{id:int}/" + Constants.API_SUBPATH_INPUTS + "/" + Constants.API_SUBPATH_RUNTIMEARTIFACTS,
        Name = "AddRuntimeArtifactAsInput")]
    public IActionResult AddRuntimeArtifactAsInput(int id, [FromBody] RuntimeArtifactInput runtimeArtifact)
    {
        return Ok();
    }

    [HttpDelete("{id:int}/" + Constants.API_SUBPATH_INPUTS + "/" + Constants.API_SUBPATH_RUNTIMEARTIFACTS + "/{inputName}",
        Name = "RemoveRuntimeArtifactFromInputs")]
    public IActionResult RemoveRuntimeArtifactFromInputs(int id, string inputName)
    {
        return Ok();
    }
    
    [HttpPost("{id:int}/" + Constants.API_SUBPATH_INPUTS + "/" + Constants.API_SUBPATH_MODELARTIFACTS,
        Name = "AddModelArtifactAsInput")]
    public IActionResult AddModelArtifactAsInput(int id, [FromBody] ModelArtifactInput modelArtifact)
    {
        return Ok();
    }

    [HttpDelete("{id:int}/" + Constants.API_SUBPATH_INPUTS + "/" + Constants.API_SUBPATH_MODELARTIFACTS + "/{inputName}",
        Name = "RemoveModelArtifactFromInputs")]
    public IActionResult RemoveModelArtifactFromInputs(int id, string inputName)
    {
        return Ok();
    }
    
    [HttpPost("{id:int}/" + Constants.API_SUBPATH_INPUTS + "/" + Constants.API_SUBPATH_EXECUTABLES,
        Name = "AddExecutableAsInput")]
    public IActionResult AddExecutableAsInput(int id, [FromBody] ExecutableInput executable)
    {
        return Ok();
    }

    [HttpDelete("{id:int}/" + Constants.API_SUBPATH_INPUTS + "/" + Constants.API_SUBPATH_EXECUTABLES + "/{inputName}/{language}",
        Name = "RemoveExecutableFromInputs")]
    public IActionResult RemoveExecutableFromInputs(int id, string inputName, string language)
    {
        return Ok();
    }
    
    [HttpPost("{id:int}/" + Constants.API_SUBPATH_PROCESSES + "/" + Constants.API_SUBPATH_QUALITIES,
        Name = "AddQualityToProcess")]
    public IActionResult AddQualityToProcess(int id, [FromBody] Quality quality)
    {
        return Ok();
    }

    [HttpDelete("{id:int}/" + Constants.API_SUBPATH_PROCESSES + "/" + Constants.API_SUBPATH_QUALITIES + "/{qualityName}",
        Name = "RemoveQualityFromProcess")]
    public IActionResult RemoveQualityFromProcess(int id, string qualityName)
    {
        return Ok();
    }
    
    [HttpPost("{id:int}/" + Constants.API_SUBPATH_PROCESSES + "/" + Constants.API_SUBPATH_DIRECTIONS,
        Name = "AddDirectionToProcess")]
    public IActionResult AddDirectionToProcess(int id, [FromBody] Direction direction)
    {
        return Ok();
    }

    [HttpDelete("{id:int}/" + Constants.API_SUBPATH_PROCESSES + "/" + Constants.API_SUBPATH_DIRECTIONS + "/{directionName}",
        Name = "RemoveDirectionFromProcess")]
    public IActionResult RemoveDirectionFromProcess(int id, string directionName)
    {
        return Ok();
    }
    [HttpPost("{id:int}/" + Constants.API_SUBPATH_PROCESSES + "/" + Constants.API_SUBPATH_AUTOMATIONLEVELS,
        Name = "AddAutomationLevelToProcess")]
    public IActionResult AddAutomationLevelToProcess(int id, [FromBody] AutomationLevel automationLevel)
    {
        return Ok();
    }

    [HttpDelete("{id:int}/" + Constants.API_SUBPATH_PROCESSES + "/" + Constants.API_SUBPATH_AUTOMATIONLEVELS + "/{automationLevelName}",
        Name = "RemoveAutomationLevelFromProcess")]
    public IActionResult RemoveAutomationLevelFromProcess(int id, string automationLevelName)
    {
        return Ok();
    }
    [HttpPost("{id:int}/" + Constants.API_SUBPATH_PROCESSES + "/" + Constants.API_SUBPATH_ANALYSISTYPES,
        Name = "AddAnalysisTypeToProcess")]
    public IActionResult AddAnalysisTypeToProcess(int id, [FromBody] AnalysisType analysisType)
    {
        return Ok();
    }

    [HttpDelete("{id:int}/" + Constants.API_SUBPATH_PROCESSES + "/" + Constants.API_SUBPATH_ANALYSISTYPES + "/{analysisTypeName}",
        Name = "RemoveAnalysisTypeFromProcess")]
    public IActionResult RemoveAnalysisTypeFromProcess(int id, string analysisTypeName)
    {
        return Ok();
    }
    [HttpPost("{id:int}/" + Constants.API_SUBPATH_PROCESSES + "/" + Constants.API_SUBPATH_TECHNIQUES,
        Name = "AddTechniqueToProcess")]
    public IActionResult AddTechniqueToProcess(int id, [FromBody] Technique technique)
    {
        return Ok();
    }

    [HttpDelete("{id:int}/" + Constants.API_SUBPATH_PROCESSES + "/" + Constants.API_SUBPATH_TECHNIQUES + "/{techniqueName}",
        Name = "RemoveTechniqueFromProcess")]
    public IActionResult RemoveTechniqueFromProcess(int id, string techniqueName)
    {
        return Ok();
    }
    
    [HttpPost("{id:int}/" + Constants.API_SUBPATH_OUTPUTS,
        Name = "AddOutput")]
    public IActionResult AddOutput(int id, [FromBody] ApproachOutput output)
    {
        return Ok();
    }

    [HttpDelete("{id:int}/" + Constants.API_SUBPATH_OUTPUTS + "/{outputId:int}",
        Name = "RemoveOutput")]
    public IActionResult RemoveOutput(int id, int outputId)
    {
        return Ok();
    }
    
    [HttpPost("{id:int}/" + Constants.API_SUBPATH_USABILITIES + "/" + Constants.API_SUBPATH_RESULTSQUALITIES,
        Name = "UpdateResultsQuality")]
    public IActionResult UpdateResultsQuality(int id, [FromBody] ResultsQuality resultsQuality)
    {
        return Ok();
    }
    
    [HttpPost("{id:int}/" + Constants.API_SUBPATH_USABILITIES + "/" + Constants.API_SUBPATH_TOOLSUPPORTS,
        Name = "UpdateToolSupport")]
    public IActionResult UpdateToolSupport(int id, [FromBody] ToolSupport toolSupport)
    {
        return Ok();
    }
    
    [HttpPost("{id:int}/" + Constants.API_SUBPATH_USABILITIES + "/" + Constants.API_SUBPATH_ACCURACYPRECISIONS,
        Name = "UpdateAccuracyPrecision")]
    public IActionResult UpdateAccuracyPrecision(int id, [FromBody] AccuracyPrecision accuracyPrecision)
    {
        return Ok();
    }
    
    [HttpPost("{id:int}/" + Constants.API_SUBPATH_USABILITIES + "/" + Constants.API_SUBPATH_VALIDATIONMETHODS,
        Name = "UpdateValidationMethod")]
    public IActionResult UpdateValidationMethod(int id, [FromBody] ValidationMethod validationMethod)
    {
        return Ok();
    }
}
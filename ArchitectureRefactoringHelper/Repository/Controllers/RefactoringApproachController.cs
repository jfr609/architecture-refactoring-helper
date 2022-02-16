using Microsoft.AspNetCore.Mvc;
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
    [HttpPost(Name = "AddRefactoringApproach")]
    [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(RefactoringApproach))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public ActionResult<RefactoringApproach> AddRefactoringApproach([FromBody] RefactoringApproach approach)
    {
        var refactoringApproach = _refactoringApproachService.AddRefactoringApproach(approach);
        return Created(
            Url.Action("GetRefactoringApproach", "RefactoringApproach",
                new { id = refactoringApproach.RefactoringApproachId }, Request.Scheme)!, refactoringApproach);
    }

    /// <summary>
    /// Updated an existing RefactoringApproach
    /// </summary>
    /// <param name="id"></param>
    /// <param name="approach"></param>
    /// <returns></returns>
    [HttpPut("{id:int}", Name = "UpdateRefactoringApproach")]
    public IActionResult UpdateRefactoringApproach(int id, [FromBody] RefactoringApproach approach)
    {
        _refactoringApproachService.UpdateRefactoringApproach(id, approach);
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
}
using Microsoft.AspNetCore.Mvc;
using Repository.Models;
using Repository.Services;

namespace Repository.Controllers;

[ApiController]
[Route($"api/v{Constants.API_VERSION}/{Constants.API_SUBPATH_APPROACHES}")]
public class RefactoringApproachController : ControllerBase
{
    private readonly RefactoringApproachService _refactoringApproachService;

    public RefactoringApproachController(RefactoringApproachService refactoringApproachService)
    {
        _refactoringApproachService = refactoringApproachService;
    }

    [HttpGet(Name = "ListRefactoringApproaches")]
    public ActionResult<IEnumerable<RefactoringApproach>> List()
    {
        return Ok(_refactoringApproachService.ListRefactoringApproaches());
    }
    
    [HttpGet("{id:int}", Name = "GetRefactoringApproach")]
    public ActionResult<RefactoringApproach> Get(int id)
    {
        return Ok(_refactoringApproachService.GetRefactoringApproach(id));
    }

    [HttpPost(Name = "AddRefactoringApproach")]
    public IActionResult Add([FromBody] RefactoringApproach approach)
    {
        _refactoringApproachService.AddRefactoringApproach(approach);
        return Ok();
    }
    
    [HttpPut("{id:int}", Name = "UpdateRefactoringApproach")]
    public IActionResult Update(int id, [FromBody] RefactoringApproach approach)
    {
        _refactoringApproachService.UpdateRefactoringApproach(id, approach);
        return Ok();
    }
    
    [HttpDelete("{id:int}", Name = "DeleteRefactoringApproach")]
    public IActionResult Delete(int id)
    {
        _refactoringApproachService.DeleteRefactoringApproach(id);
        return Ok();
    }
}
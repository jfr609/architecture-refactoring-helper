using Microsoft.AspNetCore.Mvc;
using Repository.Exceptions;
using Repository.Models.Database;
using Repository.Services;

namespace Repository.Controllers;

[ApiController]
[Route($"api/v{Constants.ApiVersion}/{Constants.ApiSubPathProjects}/{Constants.ApiSubPathProjectDescriptions}")]
[Produces("application/json")]
[TypeFilter(typeof(ServiceExceptionFilter))]
public class ProjectDescriptionController : ControllerBase
{
    private readonly ProjectDescriptionService _projectDescriptionService;

    public ProjectDescriptionController(ProjectDescriptionService projectDescriptionService)
    {
        _projectDescriptionService = projectDescriptionService;
    }

    [HttpGet(Name = "ListProjectDescription")]
    public ActionResult<IEnumerable<ProjectDescription>> ListProjectDescriptions()
    {
        return Ok(_projectDescriptionService.ListProjectDescription());
    }


    [HttpGet("{id:int}", Name = "GetProjectDescription")]
    public ActionResult<ProjectDescription> GetProjectDescription(int id)
    {
        return Ok(_projectDescriptionService.GetProjectDescription(id));
    }

    [HttpPost(Name = "AddProjectDescription")]
    public IActionResult AddProjectDescription([FromBody] ProjectDescription projectDescription)
    {
        _projectDescriptionService.AddProjectDescription(projectDescription);
        return Ok();
    }


    [HttpPut("{id:int}", Name = "UpdateProjectDescription")]
    public IActionResult UpdateProjectDescription(int id, [FromBody] ProjectDescription projectDescription)
    {
        _projectDescriptionService.UpdateProjectDescription(id, projectDescription);
        return Ok();
    }


    [HttpDelete("{id:int}", Name = "DeleteProjectDescription")]
    public IActionResult DeleteProjectDescription(int id)
    {
        _projectDescriptionService.DeleteProjectDescription(id);
        return Ok();
    }


}
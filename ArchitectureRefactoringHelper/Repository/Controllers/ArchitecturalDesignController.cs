using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Repository.Exceptions;
using Repository.Models.Database;
using Repository.Models.Recommendation;
using Repository.Services;

namespace Repository.Controllers;

[ApiController]
[Route($"api/v{Constants.ApiVersion}/{Constants.ApiSubPathArchitecturalDesigns}")]
[Produces("application/json")]
[TypeFilter(typeof(ServiceExceptionFilter))]
public class ArchitecturalDesignController : ControllerBase
{
    private readonly ArchitecturalDesignService _architecturalDesignService;

    public ArchitecturalDesignController(ArchitecturalDesignService architecturalDesignService)
    {
        _architecturalDesignService = architecturalDesignService;

    }

    [HttpGet(Name = "ListArchitecturalDesigns")]
    public ActionResult<IEnumerable< ArchitecturalDesign>> ListArchitecturalDesigns([FromQuery] bool? withDetails)
    {
        return Ok(_architecturalDesignService.ListArchitecturalDesigns(withDetails));
    }

    [HttpGet("{id:int}", Name = "GetArchitecturalDesign")]
    public ActionResult<ArchitecturalDesign> GetArchitecturalDesign(int id)
    {
        return Ok(_architecturalDesignService.GetArchitecturalDesign(id));
    }

}
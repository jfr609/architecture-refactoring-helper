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
    private readonly IRecommendationService _recommendationService;

    public ArchitecturalDesignController(ArchitecturalDesignService architecturalDesignService, IRecommendationService recommendationService)
    {
        _architecturalDesignService = architecturalDesignService;
        _recommendationService = recommendationService;

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

 
    [HttpPost("recommendations", Name = "RecommendArchitecturalDesigns")]
    public ActionResult<IEnumerable<ArchitecturalDesignRecommendation>> RecommendArchitecturalDesigns(
        [FromBody(EmptyBodyBehavior = EmptyBodyBehavior.Allow)]
        ArchitecturalDesignRecommendationRequest? architecturalRequest,
        [FromQuery] int? count)
    {
        var numberOfRecommendations = count ?? Constants.DefaultNumberOfRecommendations;

        IEnumerable<ArchitecturalDesignRecommendation> recommendations;
    
            if (architecturalRequest == null)
                return BadRequest("Either a request body or a preset is required");

            recommendations =
                _recommendationService.GetArchitecturalDesignRecommendations(architecturalRequest,
                    numberOfRecommendations);
        
    
        return Ok(recommendations);
    }
}
using Repository.Models.Recommendation;

namespace Repository.Services;

public interface IRecommendationService
{
    public IEnumerable<ApproachRecommendation> GetApproachRecommendations(
        ApproachRecommendationRequest recommendationRequest, 
        int? numberOfRecommendations = 10);
}
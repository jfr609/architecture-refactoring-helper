using Repository.Models.Recommendation;

namespace Repository.Services;

public class SimpleRecommendationService : IRecommendationService
{
    public IEnumerable<ApproachRecommendation> GetApproachRecommendations(
        ApproachRecommendationRequest recommendationRequest,
        int? numberOfRecommendations = 10)
    {
        throw new NotImplementedException();
    }
}
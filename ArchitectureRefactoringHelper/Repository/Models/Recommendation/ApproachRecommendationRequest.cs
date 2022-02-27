using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Repository.Models.Recommendation;

public class ApproachRecommendationRequest
{
    [Required]
    [JsonPropertyName("inputRecommendationInformation")]
    public InputRecommendationInformation InputRecommendationInformation { get; set; }

    [Required]
    [JsonPropertyName("processRecommendationInformation")]
    public ProcessRecommendationInformation ProcessRecommendationInformation { get; set; }

    [Required]
    [JsonPropertyName("outputRecommendationInformation")]
    public OutputRecommendationInformation OutputRecommendationInformation { get; set; }

    [Required]
    [JsonPropertyName("usabilityRecommendationInformation")]
    public UsabilityRecommendationInformation UsabilityRecommendationInformation { get; set; }
}
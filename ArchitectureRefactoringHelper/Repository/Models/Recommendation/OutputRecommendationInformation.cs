using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Repository.Models.Database;

namespace Repository.Models.Recommendation;

public class OutputRecommendationInformation
{
    [JsonPropertyName("architectureInformation")]
    public IEnumerable<ArchitectureInformation> ArchitectureInformation { get; set; }

    [JsonPropertyName("serviceTypeInformation")]
    public IEnumerable<ServiceTypeInformation> ServiceTypeInformation { get; set; }
}

public class ArchitectureInformation
{
    [Required]
    [JsonPropertyName("architecture")]
    public Architecture Architecture { get; set; }

    [Required]
    [JsonPropertyName("recommendationSuitability")]
    public RecommendationSuitability RecommendationSuitability { get; set; }
}

public class ServiceTypeInformation
{
    [Required]
    [JsonPropertyName("serviceType")]
    public ServiceType ServiceType { get; set; }

    [Required]
    [JsonPropertyName("recommendationSuitability")]
    public RecommendationSuitability RecommendationSuitability { get; set; }
}
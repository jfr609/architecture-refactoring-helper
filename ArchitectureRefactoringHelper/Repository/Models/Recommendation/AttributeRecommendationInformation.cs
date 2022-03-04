using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Repository.Models.Recommendation;

public class AttributeRecommendationInformation<T>
{
    [Required]
    [JsonPropertyName("attribute")]
    public T Attribute { get; set; }

    [Required]
    [JsonPropertyName("recommendationSuitability")]
    public RecommendationSuitability RecommendationSuitability { get; set; }
}

public enum RecommendationSuitability
{
    Include,
    Neutral,
    Exclude
}
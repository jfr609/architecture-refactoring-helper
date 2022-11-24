using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Repository.Models.Database;

namespace Repository.Models.Recommendation;

public class ArchitecturalDesignRecommendationRequest
{
        public ArchitecturalDesignRecommendationRequest()
    {
        QualityInformation = new List<AttributeRecommendationInformation<Quality>>();
        QualitySublevelInformation = new List<AttributeRecommendationInformation<QualitySublevel>>();
    }
    [Required]
    [JsonPropertyName("qualityInformation")]
    public List<AttributeRecommendationInformation<Quality>> QualityInformation { get; set; }

    [Required]
    [JsonPropertyName("qualitySublevelInformation")]
    public List<AttributeRecommendationInformation<QualitySublevel>> QualitySublevelInformation { get; set; }
}
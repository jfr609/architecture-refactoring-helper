using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Repository.Models.Database;
namespace Repository.Models.Recommendation
{
    public class ArchitecturalDesignRecommendation
    {
    [Required]
    [JsonPropertyName("architecturalDesignId")]
    public int ArchitecturalDesignId { get; set; }
    [Required]
    [JsonPropertyName("identifier")]
    public string Identifier { get; set; }

    [Required]
    [JsonPropertyName("architecturalDesignSource")]
    public ArchitecturalDesignSource ArchitecturalDesignSource { get; set; }


    [JsonPropertyName("qualityEvaluations")]
    public IList<ApproachAttributeEvaluation<Quality>> QualityEvaluations { get; set; }
    [JsonPropertyName("qualitySublevelEvaluations")]
    public IList<ApproachAttributeEvaluation<QualitySublevel>> QualitySublevelEvaluations { get; set; }

    [Required]
    [JsonPropertyName("suitabilityScore")]
    public int SuitabilityScore { get; set; }

    [Required]
    [JsonPropertyName("matchesCount")]
    public int MatchesCount { get; set; }

    [Required]
    [JsonPropertyName("totalIncludeCount")]
    public int TotalIncludeCount { get; set; }

    [Required]
    [JsonPropertyName("qualityScore")]
    public QualityScore? QualityScore { get; set; }

    [Required]
    [JsonPropertyName("systemPropertiesScore")]
    public SystemPropertiesScore? SystemPropertiesScore { get; set; }

    [Required]
    [JsonPropertyName("totalScore")]
    public int TotalScore { get; set; }

    [Required]
    [JsonPropertyName("weightedScore")]
    public int WeightedScore { get; set; }
        
    }
}
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Repository.Models.Database;

namespace Repository.Models.Recommendation;

public class ProcessRecommendationInformation
{
    [JsonPropertyName("qualityInformation")]
    public IEnumerable<QualityInformation> QualityInformation { get; set; }

    [JsonPropertyName("directionInformation")]
    public IEnumerable<DirectionInformation> DirectionInformation { get; set; }

    [JsonPropertyName("automationLevelInformation")]
    public IEnumerable<AutomationLevelInformation> AutomationLevelInformation { get; set; }

    [JsonPropertyName("analysisTypeInformation")]
    public IEnumerable<AnalysisTypeInformation> AnalysisTypeInformation { get; set; }

    [JsonPropertyName("techniqueInformation")]
    public IEnumerable<TechniqueInformation> TechniqueInformation { get; set; }
}

public class QualityInformation
{
    [Required]
    [JsonPropertyName("quality")]
    public Quality Quality { get; set; }

    [Required]
    [JsonPropertyName("recommendationSuitability")]
    public RecommendationSuitability RecommendationSuitability { get; set; }
}

public class DirectionInformation
{
    [Required]
    [JsonPropertyName("direction")]
    public Direction Direction { get; set; }

    [Required]
    [JsonPropertyName("recommendationSuitability")]
    public RecommendationSuitability RecommendationSuitability { get; set; }
}

public class AutomationLevelInformation
{
    [Required]
    [JsonPropertyName("automationLevel")]
    public AutomationLevel AutomationLevel { get; set; }

    [Required]
    [JsonPropertyName("recommendationSuitability")]
    public RecommendationSuitability RecommendationSuitability { get; set; }
}

public class AnalysisTypeInformation
{
    [Required]
    [JsonPropertyName("analysisType")]
    public AnalysisType AnalysisType { get; set; }

    [Required]
    [JsonPropertyName("recommendationSuitability")]
    public RecommendationSuitability RecommendationSuitability { get; set; }
}

public class TechniqueInformation
{
    [Required]
    [JsonPropertyName("technique")]
    public Technique Technique { get; set; }

    [Required]
    [JsonPropertyName("recommendationSuitability")]
    public RecommendationSuitability RecommendationSuitability { get; set; }
}
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Repository.Models.Database;

namespace Repository.Models.Recommendation;

public class UsabilityRecommendationInformation
{
    [JsonPropertyName("resultsQualityInformation")]
    public IEnumerable<ResultsQualityInformation> ResultsQualityInformation { get; set; }

    [JsonPropertyName("toolSupportInformation")]
    public IEnumerable<ToolSupportInformation> ToolSupportInformation { get; set; }

    [JsonPropertyName("accuracyPrecisionInformation")]
    public IEnumerable<AccuracyPrecisionInformation> AccuracyPrecisionInformation { get; set; }

    [JsonPropertyName("validationMethodInformation")]
    public IEnumerable<ValidationMethodInformation> ValidationMethodInformation { get; set; }
}

public class ResultsQualityInformation
{
    [Required]
    [JsonPropertyName("resultsQuality")]
    public ResultsQuality ResultsQuality { get; set; }

    [Required]
    [JsonPropertyName("recommendationSuitability")]
    public RecommendationSuitability RecommendationSuitability { get; set; }
}

public class ToolSupportInformation
{
    [Required]
    [JsonPropertyName("toolSupport")]
    public ToolSupport ToolSupport { get; set; }

    [Required]
    [JsonPropertyName("recommendationSuitability")]
    public RecommendationSuitability RecommendationSuitability { get; set; }
}

public class AccuracyPrecisionInformation
{
    [Required]
    [JsonPropertyName("accuracyPrecision")]
    public AccuracyPrecision AccuracyPrecision { get; set; }

    [Required]
    [JsonPropertyName("recommendationSuitability")]
    public RecommendationSuitability RecommendationSuitability { get; set; }
}

public class ValidationMethodInformation
{
    [Required]
    [JsonPropertyName("validationMethod")]
    public ValidationMethod ValidationMethod { get; set; }

    [Required]
    [JsonPropertyName("recommendationSuitability")]
    public RecommendationSuitability RecommendationSuitability { get; set; }
}
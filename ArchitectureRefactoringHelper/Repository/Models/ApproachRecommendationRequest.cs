using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Repository.Models;

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

public class InputRecommendationInformation
{
    [JsonPropertyName("domainArtifactInformation")]
    public Dictionary<DomainArtifactInput, RecommendationSuitability> DomainArtifactInformation { get; set; }
    [JsonPropertyName("runtimeArtifactInformation")]
    public Dictionary<RuntimeArtifactInput, RecommendationSuitability> RuntimeArtifactInformation { get; set; }
    [JsonPropertyName("modelArtifactInformation")]
    public Dictionary<ModelArtifactInput, RecommendationSuitability> ModelArtifactInformation { get; set; }
    [JsonPropertyName("executableInformation")]
    public Dictionary<ExecutableInput, RecommendationSuitability> ExecutableInformation { get; set; }
}
public class ProcessRecommendationInformation
{
    [JsonPropertyName("qualityInformation")]
    public Dictionary<Quality, RecommendationSuitability> QualityInformation { get; set; }
    [JsonPropertyName("directionInformation")]
    public Dictionary<Direction, RecommendationSuitability> DirectionInformation { get; set; }
    [JsonPropertyName("automationLevelInformation")]
    public Dictionary<AutomationLevel, RecommendationSuitability> AutomationLevelInformation { get; set; }
    [JsonPropertyName("analysisTypeInformation")]
    public Dictionary<AnalysisType, RecommendationSuitability> AnalysisTypeInformation { get; set; }
    [JsonPropertyName("techniqueInformation")]
    public Dictionary<Technique, RecommendationSuitability> TechniqueInformation { get; set; }
}
public class OutputRecommendationInformation
{
    public Dictionary<ApproachOutput, RecommendationSuitability> Information { get; set; }
}
public class UsabilityRecommendationInformation
{
    [JsonPropertyName("resultsQualityInformation")]
    public Dictionary<ResultsQuality, RecommendationSuitability> ResultsQualityInformation { get; set; }
    [JsonPropertyName("toolSupportInformation")]
    public Dictionary<ToolSupport, RecommendationSuitability> ToolSupportInformation { get; set; }
    [JsonPropertyName("accuracyPrecisionInformation")]
    public Dictionary<AccuracyPrecision, RecommendationSuitability> AccuracyPrecisionInformation { get; set; }
    [JsonPropertyName("validationMethodInformation")]
    public Dictionary<ValidationMethod, RecommendationSuitability> ValidationMethodInformation { get; set; }
}

public enum RecommendationSuitability
{
    Include,
    Neutral,
    Exclude
}
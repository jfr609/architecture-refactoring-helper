using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Repository.Models.Database;

namespace Repository.Models.Recommendation;

public class ApproachRecommendationRequest
{
    [Required]
    [JsonPropertyName("domainArtifactInformation")]
    public IList<AttributeRecommendationInformation<DomainArtifactInput>> DomainArtifactInformation { get; set; }

    [Required]
    [JsonPropertyName("runtimeArtifactInformation")]
    public IList<AttributeRecommendationInformation<RuntimeArtifactInput>> RuntimeArtifactInformation { get; set; }

    [Required]
    [JsonPropertyName("modelArtifactInformation")]
    public IList<AttributeRecommendationInformation<ModelArtifactInput>> ModelArtifactInformation { get; set; }

    [Required]
    [JsonPropertyName("executableInformation")]
    public IList<AttributeRecommendationInformation<ExecutableInput>> ExecutableInformation { get; set; }

    [Required]
    [JsonPropertyName("qualityInformation")]
    public IList<AttributeRecommendationInformation<Quality>> QualityInformation { get; set; }

    [Required]
    [JsonPropertyName("directionInformation")]
    public IList<AttributeRecommendationInformation<Direction>> DirectionInformation { get; set; }

    [Required]
    [JsonPropertyName("automationLevelInformation")]
    public IList<AttributeRecommendationInformation<AutomationLevel>> AutomationLevelInformation { get; set; }

    [Required]
    [JsonPropertyName("analysisTypeInformation")]
    public IList<AttributeRecommendationInformation<AnalysisType>> AnalysisTypeInformation { get; set; }

    [Required]
    [JsonPropertyName("techniqueInformation")]
    public IList<AttributeRecommendationInformation<Technique>> TechniqueInformation { get; set; }

    [Required]
    [JsonPropertyName("architectureInformation")]
    public IList<AttributeRecommendationInformation<Architecture>> ArchitectureInformation { get; set; }

    [Required]
    [JsonPropertyName("serviceTypeInformation")]
    public IList<AttributeRecommendationInformation<ServiceType>> ServiceTypeInformation { get; set; }

    [Required]
    [JsonPropertyName("resultsQualityInformation")]
    public IList<AttributeRecommendationInformation<ResultsQuality>> ResultsQualityInformation { get; set; }

    [Required]
    [JsonPropertyName("toolSupportInformation")]
    public IList<AttributeRecommendationInformation<ToolSupport>> ToolSupportInformation { get; set; }

    [Required]
    [JsonPropertyName("accuracyPrecisionInformation")]
    public IList<AttributeRecommendationInformation<AccuracyPrecision>> AccuracyPrecisionInformation { get; set; }

    [Required]
    [JsonPropertyName("validationMethodInformation")]
    public IList<AttributeRecommendationInformation<ValidationMethod>> ValidationMethodInformation { get; set; }
}
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Repository.Models.Database;

namespace Repository.Models.Recommendation;

public class ApproachRecommendationRequest
{
    public ApproachRecommendationRequest()
    {
        DomainArtifactInformation = new List<AttributeRecommendationInformation<DomainArtifactInput>>();
        RuntimeArtifactInformation = new List<AttributeRecommendationInformation<RuntimeArtifactInput>>();
        ModelArtifactInformation = new List<AttributeRecommendationInformation<ModelArtifactInput>>();
        ExecutableInformation = new List<AttributeRecommendationInformation<ExecutableInput>>();
        QualityInformation = new List<AttributeRecommendationInformation<Quality>>();
        QualitySublevelInformation = new List<AttributeRecommendationInformation<QualitySublevel>>();
        DirectionInformation = new List<AttributeRecommendationInformation<Direction>>();
        AutomationLevelInformation = new List<AttributeRecommendationInformation<AutomationLevel>>();
        AnalysisTypeInformation = new List<AttributeRecommendationInformation<AnalysisType>>();
        TechniqueInformation = new List<AttributeRecommendationInformation<Technique>>();
        ArchitectureInformation = new List<AttributeRecommendationInformation<Architecture>>();
        ServiceTypeInformation = new List<AttributeRecommendationInformation<ServiceType>>();
        ResultsQualityInformation = new List<AttributeRecommendationInformation<ResultsQuality>>();
        ToolSupportInformation = new List<AttributeRecommendationInformation<ToolSupport>>();
        AccuracyPrecisionInformation = new List<AttributeRecommendationInformation<AccuracyPrecision>>();
        ValidationMethodInformation = new List<AttributeRecommendationInformation<ValidationMethod>>();
    }

    [Required]
    [JsonPropertyName("domainArtifactInformation")]
    public List<AttributeRecommendationInformation<DomainArtifactInput>> DomainArtifactInformation { get; set; }

    [Required]
    [JsonPropertyName("runtimeArtifactInformation")]
    public List<AttributeRecommendationInformation<RuntimeArtifactInput>> RuntimeArtifactInformation { get; set; }

    [Required]
    [JsonPropertyName("modelArtifactInformation")]
    public List<AttributeRecommendationInformation<ModelArtifactInput>> ModelArtifactInformation { get; set; }

    [Required]
    [JsonPropertyName("executableInformation")]
    public List<AttributeRecommendationInformation<ExecutableInput>> ExecutableInformation { get; set; }

    [Required]
    [JsonPropertyName("qualityInformation")]
    public List<AttributeRecommendationInformation<Quality>> QualityInformation { get; set; }

    [Required]
    [JsonPropertyName("qualitySublevelInformation")]
    public List<AttributeRecommendationInformation<QualitySublevel>> QualitySublevelInformation { get; set; }

    [Required]
    [JsonPropertyName("directionInformation")]
    public List<AttributeRecommendationInformation<Direction>> DirectionInformation { get; set; }

    [Required]
    [JsonPropertyName("automationLevelInformation")]
    public List<AttributeRecommendationInformation<AutomationLevel>> AutomationLevelInformation { get; set; }

    [Required]
    [JsonPropertyName("analysisTypeInformation")]
    public List<AttributeRecommendationInformation<AnalysisType>> AnalysisTypeInformation { get; set; }

    [Required]
    [JsonPropertyName("techniqueInformation")]
    public List<AttributeRecommendationInformation<Technique>> TechniqueInformation { get; set; }

    [Required]
    [JsonPropertyName("architectureInformation")]
    public List<AttributeRecommendationInformation<Architecture>> ArchitectureInformation { get; set; }

    [Required]
    [JsonPropertyName("serviceTypeInformation")]
    public List<AttributeRecommendationInformation<ServiceType>> ServiceTypeInformation { get; set; }

    [Required]
    [JsonPropertyName("resultsQualityInformation")]
    public List<AttributeRecommendationInformation<ResultsQuality>> ResultsQualityInformation { get; set; }

    [Required]
    [JsonPropertyName("toolSupportInformation")]
    public List<AttributeRecommendationInformation<ToolSupport>> ToolSupportInformation { get; set; }

    [Required]
    [JsonPropertyName("accuracyPrecisionInformation")]
    public List<AttributeRecommendationInformation<AccuracyPrecision>> AccuracyPrecisionInformation { get; set; }

    [Required]
    [JsonPropertyName("validationMethodInformation")]
    public List<AttributeRecommendationInformation<ValidationMethod>> ValidationMethodInformation { get; set; }
}
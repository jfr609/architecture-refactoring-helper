using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Repository.Models.Database;

namespace Repository.Models.Recommendation;

public class ApproachRecommendation
{
    [Required]
    [JsonPropertyName("refactoringApproachId")]
    public int RefactoringApproachId { get; set; }
    [Required]
    [JsonPropertyName("identifier")]
    public string Identifier { get; set; }

    [Required]
    [JsonPropertyName("approachSource")]
    public ApproachSource ApproachSource { get; set; }

    [JsonPropertyName("domainArtifactInputEvaluations")]
    public IList<ApproachAttributeEvaluation<DomainArtifactInput>> DomainArtifactInputEvaluations { get; set; }

    [JsonPropertyName("runtimeArtifactInputEvaluations")]
    public IList<ApproachAttributeEvaluation<RuntimeArtifactInput>> RuntimeArtifactInputEvaluations { get; set; }

    [JsonPropertyName("modelArtifactInputEvaluations")]
    public IList<ApproachAttributeEvaluation<ModelArtifactInput>> ModelArtifactInputEvaluations { get; set; }

    [JsonPropertyName("executableInputEvaluations")]
    public IList<ApproachAttributeEvaluation<ExecutableInput>> ExecutableInputEvaluations { get; set; }

    [JsonPropertyName("qualityEvaluations")]
    public IList<ApproachAttributeEvaluation<Quality>> QualityEvaluations { get; set; }
    [JsonPropertyName("qualitySublevelEvaluations")]
    public IList<ApproachAttributeEvaluation<QualitySublevel>> QualitySublevelEvaluations { get; set; }

    [JsonPropertyName("directionEvaluations")]
    public IList<ApproachAttributeEvaluation<Direction>> DirectionEvaluations { get; set; }

    [JsonPropertyName("automationLevelEvaluations")]
    public IList<ApproachAttributeEvaluation<AutomationLevel>> AutomationLevelEvaluations { get; set; }

    [JsonPropertyName("analysisTypeEvaluations")]
    public IList<ApproachAttributeEvaluation<AnalysisType>> AnalysisTypeEvaluations { get; set; }

    [JsonPropertyName("techniqueEvaluations")]
    public IList<ApproachAttributeEvaluation<Technique>> TechniqueEvaluations { get; set; }

    [JsonPropertyName("architectureEvaluations")]
    public IList<ApproachAttributeEvaluation<Architecture>> ArchitectureEvaluations { get; set; }

    [JsonPropertyName("serviceTypeEvaluations")]
    public IList<ApproachAttributeEvaluation<ServiceType>> ServiceTypeEvaluations { get; set; }

    [JsonPropertyName("validationMethodEvaluations")]
    public IList<ApproachAttributeEvaluation<ValidationMethod>> ValidationMethodEvaluations { get; set; }

    [JsonPropertyName("toolSupportEvaluations")]
    public IList<ApproachAttributeEvaluation<ToolSupport>> ToolSupportEvaluations { get; set; }

    [JsonPropertyName("resultsQualityEvaluations")]
    public IList<ApproachAttributeEvaluation<ResultsQuality>> ResultsQualityEvaluations { get; set; }

    [JsonPropertyName("accuracyPrecisionEvaluations")]
    public IList<ApproachAttributeEvaluation<AccuracyPrecision>> AccuracyPrecisionEvaluations { get; set; }

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
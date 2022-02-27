using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Repository.Models.Database;

namespace Repository.Models.Recommendation;

public class InputRecommendationInformation
{
    [JsonPropertyName("domainArtifactInformation")]
    public IEnumerable<DomainArtifactInformation> DomainArtifactInformation { get; set; }

    [JsonPropertyName("runtimeArtifactInformation")]
    public IEnumerable<RuntimeArtifactInformation> RuntimeArtifactInformation { get; set; }

    [JsonPropertyName("modelArtifactInformation")]
    public IEnumerable<ModelArtifactInformation> ModelArtifactInformation { get; set; }

    [JsonPropertyName("executableInformation")]
    public IEnumerable<ExecutableInformation> ExecutableInformation { get; set; }
}

public class DomainArtifactInformation
{
    [Required]
    [JsonPropertyName("domainArtifactInput")]
    public DomainArtifactInput DomainArtifactInput { get; set; }

    [Required]
    [JsonPropertyName("recommendationSuitability")]
    public RecommendationSuitability RecommendationSuitability { get; set; }
}

public class RuntimeArtifactInformation
{
    [Required]
    [JsonPropertyName("runtimeArtifactInput")]
    public RuntimeArtifactInput RuntimeArtifactInput { get; set; }

    [Required]
    [JsonPropertyName("recommendationSuitability")]
    public RecommendationSuitability RecommendationSuitability { get; set; }
}

public class ModelArtifactInformation
{
    [Required]
    [JsonPropertyName("modelArtifactInput")]
    public ModelArtifactInput ModelArtifactInput { get; set; }

    [Required]
    [JsonPropertyName("recommendationSuitability")]
    public RecommendationSuitability RecommendationSuitability { get; set; }
}

public class ExecutableInformation
{
    [Required]
    [JsonPropertyName("executableInput")]
    public ExecutableInput ExecutableInput { get; set; }

    [Required]
    [JsonPropertyName("recommendationSuitability")]
    public RecommendationSuitability RecommendationSuitability { get; set; }
}
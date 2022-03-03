using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Repository.Models.Database;

namespace Repository.Models.Recommendation;

public class ApproachRecommendation
{
    [Required]
    [JsonPropertyName("approachSource")]
    public ApproachSource ApproachSource { get; set; }

    [Required]
    [JsonPropertyName("attributeEvaluations")]
    public IEnumerable<ApproachAttributeEvaluation> AttributeEvaluations { get; set; }

    [Required]
    [JsonPropertyName("suitabilityScore")]
    public int SuitabilityScore { get; set; }
}

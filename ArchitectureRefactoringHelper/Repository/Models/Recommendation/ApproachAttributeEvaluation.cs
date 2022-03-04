using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Repository.Models.Recommendation;

public class ApproachAttributeEvaluation<T>
{
    [Required]
    [JsonPropertyName("approachAttribute")]
    public T ApproachAttribute { get; set; }

    [Required]
    [JsonPropertyName("attributeEvaluation")]
    public AttributeEvaluation AttributeEvaluation { get; set; }
}

public enum AttributeEvaluation
{
    Match,
    Neutral,
    Mismatch,
    Error
}
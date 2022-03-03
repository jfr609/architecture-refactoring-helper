using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Repository.Models.Recommendation;

public class ApproachAttributeEvaluation
{
    [Required]
    [JsonPropertyName("approachAttribute")]
    public object ApproachAttribute { get; set; }

    [Required]
    [JsonPropertyName("attributeEvaluation")]
    public AttributeEvaluation AttributeEvaluation { get; set; }
}
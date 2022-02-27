using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Repository.Models;

[Table(Constants.TABLE_NAME_APPROACH_USABILITY)]
public class ApproachUsability
{
    [Key]
    [JsonPropertyName("approachUsabilityId")]
    public int ApproachUsabilityId { get; set; }
    [JsonIgnore]
    public RefactoringApproach? RefactoringApproach { get; set; }
    
    [Required]
    [JsonPropertyName("resultsQuality")]
    public ResultsQuality ResultsQuality { get; set; }
    [Required]
    [JsonPropertyName("toolSupport")]
    public ToolSupport ToolSupport { get; set; }
    [Required]
    [JsonPropertyName("accuracyPrecision")]
    public AccuracyPrecision AccuracyPrecision { get; set; }
    [Required]
    [JsonPropertyName("validationMethod")]
    public ValidationMethod ValidationMethod { get; set; }
}
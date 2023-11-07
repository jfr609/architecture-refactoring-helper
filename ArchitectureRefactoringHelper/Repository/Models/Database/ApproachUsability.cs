using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Repository.Models.Database;

[Table(Constants.TableNameApproachUsability)]
public class ApproachUsability
{
    [Key]
    [JsonPropertyName("approachUsabilityId")]
    public int ApproachUsabilityId { get; set; }
    [JsonPropertyName("noToolSupport")]
    public bool? NoToolSupport { get; set; }
    [JsonPropertyName("refactoringApproach")]
    public RefactoringApproach? RefactoringApproach { get; set; }
    
    
    [JsonPropertyName("resultsQuality")]
    public ResultsQuality? ResultsQuality { get; set; }
    
    [JsonPropertyName("toolSupport")]
    public ToolSupport? ToolSupport { get; set; }
    [Required]
    [JsonPropertyName("accuracyPrecision")]
    public AccuracyPrecision AccuracyPrecision { get; set; }
    [Required]
    [JsonPropertyName("validationMethod")]
    public ValidationMethod ValidationMethod { get; set; }
    [JsonPropertyName("tools")]
    public ICollection<Tool>? Tools { get; set; }
}
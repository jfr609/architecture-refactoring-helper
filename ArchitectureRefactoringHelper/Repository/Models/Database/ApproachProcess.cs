using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Repository.Models.Database;

[Table(Constants.TABLE_NAME_APPROACH_PROCESS)]
public class ApproachProcess
{
    [Key]
    [JsonPropertyName("approachProcessId")]
    public int ApproachProcessId { get; set; }
    [JsonIgnore]
    public RefactoringApproach? RefactoringApproach { get; set; }
    
    [JsonPropertyName("qualities")]
    public ICollection<Quality>? Qualities { get; set; }
    [JsonPropertyName("directions")]
    public ICollection<Direction>? Directions { get; set; }
    [JsonPropertyName("automationLevels")]
    public ICollection<AutomationLevel>? AutomationLevels { get; set; }
    [JsonPropertyName("analysisTypes")]
    public ICollection<AnalysisType>? AnalysisTypes { get; set; }
    [JsonPropertyName("techniques")]
    public ICollection<Technique>? Techniques { get; set; }
}
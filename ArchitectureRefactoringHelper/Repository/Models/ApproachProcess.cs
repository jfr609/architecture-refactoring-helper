using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Repository.Models;

[Table(Constants.TABLE_NAME_APPROACH_PROCESS)]
public class ApproachProcess
{
    [Key]
    public int ApproachProcessId { get; set; }
    [JsonIgnore]
    public RefactoringApproach? RefactoringApproach { get; set; }
    
    public ICollection<Quality>? Qualities { get; set; }
    public ICollection<Direction>? Directions { get; set; }
    public ICollection<AutomationLevel>? AutomationLevels { get; set; }
    public ICollection<AnalysisType>? AnalysisTypes { get; set; }
    public ICollection<Technique>? Techniques { get; set; }
    
    // public ICollection<ProcessStrategy> ProcessStrategies { get; set; }
    // public ICollection<DecompositionStrategy> DecompositionStrategies { get; set; }
}
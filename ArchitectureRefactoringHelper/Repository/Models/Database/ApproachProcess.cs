using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Repository.Models.Database;

[Table(Constants.TableNameApproachProcess)]
public class ApproachProcess
{
    [Key]
    [JsonPropertyName("approachProcessId")]
    public int ApproachProcessId { get; set; }
    [JsonIgnore]
    public RefactoringApproach? RefactoringApproach { get; set; }
    [JsonIgnore]
    public ArchitecturalDesign? ArchitecturalDesign { get; set; }
    
    [JsonPropertyName("qualities")]
    public ICollection<Quality>? Qualities { get; set; }
    [JsonPropertyName("qualitySublevels")]
    public ICollection<QualitySublevel>? QualitySublevels { get; set; }
    [JsonPropertyName("directions")]
    public ICollection<Direction>? Directions { get; set; }
    [JsonPropertyName("automationLevels")]
    public ICollection<AutomationLevel>? AutomationLevels { get; set; }
    [JsonPropertyName("analysisTypes")]
    public ICollection<AnalysisType>? AnalysisTypes { get; set; }
    [JsonPropertyName("techniques")]
    public ICollection<Technique>? Techniques { get; set; }
    [JsonPropertyName("processStrategies")]
    public ICollection<ProcessStrategy>? ProcessStrategies { get; set; }
    [JsonPropertyName("atomarUnits")]
    public ICollection<AtomarUnit>? AtomarUnits { get; set; }
}
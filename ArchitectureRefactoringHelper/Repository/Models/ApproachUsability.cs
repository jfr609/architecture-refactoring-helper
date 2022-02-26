using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Repository.Models;

[Table(Constants.TABLE_NAME_APPROACH_USABILITY)]
public class ApproachUsability
{
    [Key]
    public int ApproachUsabilityId { get; set; }
    [JsonIgnore]
    public RefactoringApproach? RefactoringApproach { get; set; }
    
    public ResultsQuality ResultsQuality { get; set; }
    public ToolSupport ToolSupport { get; set; }
    public AccuracyPrecision AccuracyPrecision { get; set; }
    public ValidationMethod ValidationMethod { get; set; }
}
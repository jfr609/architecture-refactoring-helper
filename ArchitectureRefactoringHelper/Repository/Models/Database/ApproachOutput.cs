using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Repository.Models.Database;

[Table(Constants.TableNameApproachOutput)]
public class ApproachOutput
{
    [Key]
    [JsonPropertyName("approachOutputId")]
    public int ApproachOutputId { get; set; }
    [JsonIgnore]
    public ICollection<RefactoringApproach>? RefactoringApproaches { get; set; }
    
    [Required]
    [JsonPropertyName("architecture")]
    public Architecture Architecture { get; set; }
    [Required]
    [JsonPropertyName("serviceType")]
    public ServiceType ServiceType { get; set; }
}
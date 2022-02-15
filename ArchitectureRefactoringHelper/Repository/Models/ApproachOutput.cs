using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Repository.Models;

[Table(Constants.TABLE_NAME_APPROACH_OUTPUT)]
public class ApproachOutput
{
    [Key]
    public int ApproachOutputId { get; set; }
    [JsonIgnore]
    public ICollection<RefactoringApproach>? RefactoringApproaches { get; set; }
    
    public Architecture Architecture { get; set; }
    public ServiceType ServiceType { get; set; }
}

[Table(Constants.TABLE_NAME_APPROACH_OUTPUT_ARCHITECTURE)]
public class Architecture
{
    [Key]
    public string Name { get; set; }
    public string? Description { get; set; }
    
    [JsonIgnore]
    public ICollection<ApproachOutput>? ApproachOutputs { get; set; }
}

[Table(Constants.TABLE_NAME_APPROACH_OUTPUT_SERVICETYPE)]
public class ServiceType
{
    [Key]
    public string Name { get; set; }
    public string? Description { get; set; }
    
    [JsonIgnore]
    public ICollection<ApproachOutput>? ApproachOutputs { get; set; }
}
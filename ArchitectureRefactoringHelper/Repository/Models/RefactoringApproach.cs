using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Repository.Models;

[Table(Constants.TABLE_NAME_APPROACH + "es")]
public class RefactoringApproach
{
    [Key]
    public int RefactoringApproachId { get; set; }
    [JsonIgnore]
    public int ApproachSourceId { get; set; }
    public ApproachSource ApproachSource { get; set; }
    
    public ICollection<DomainArtifactInput>? DomainArtifactInputs { get; set; }
    public ICollection<RuntimeArtifactInput>? RuntimeArtifactInputs { get; set; }
    public ICollection<ModelArtifactInput>? ModelArtifactInputs { get; set; }
    public ICollection<ExecutableInput>? ExecutableInputs { get; set; }
    [JsonIgnore]
    public int ApproachProcessId { get; set; }
    public ApproachProcess ApproachProcess { get; set; }
    public ICollection<ApproachOutput>? ApproachOutputs { get; set; }
    [JsonIgnore]
    public int ApproachUsabilityId { get; set; }
    public ApproachUsability ApproachUsability { get; set; }
}
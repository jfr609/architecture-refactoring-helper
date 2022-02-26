using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Repository.Models;

[Table(Constants.TABLE_NAME_APPROACH + "es")]
public class RefactoringApproach
{
    [Key]
    [JsonPropertyName("refactoringApproachId")]
    public int RefactoringApproachId { get; set; }
    [JsonIgnore]
    public int ApproachSourceId { get; set; }
    [JsonPropertyName("approachSource")]
    public ApproachSource ApproachSource { get; set; }
    
    [JsonPropertyName("domainArtifactInputs")]
    public ICollection<DomainArtifactInput>? DomainArtifactInputs { get; set; }
    [JsonPropertyName("runtimeArtifactInputs")]
    public ICollection<RuntimeArtifactInput>? RuntimeArtifactInputs { get; set; }
    [JsonPropertyName("modelArtifactInputs")]
    public ICollection<ModelArtifactInput>? ModelArtifactInputs { get; set; }
    [JsonPropertyName("executableInputs")]
    public ICollection<ExecutableInput>? ExecutableInputs { get; set; }
    [JsonIgnore]
    public int ApproachProcessId { get; set; }
    [JsonPropertyName("approachProcess")]
    public ApproachProcess ApproachProcess { get; set; }
    [JsonPropertyName("approachOutputs")]
    public ICollection<ApproachOutput>? ApproachOutputs { get; set; }
    [JsonIgnore]
    public int ApproachUsabilityId { get; set; }
    [JsonPropertyName("approachUsability")]
    public ApproachUsability ApproachUsability { get; set; }
}
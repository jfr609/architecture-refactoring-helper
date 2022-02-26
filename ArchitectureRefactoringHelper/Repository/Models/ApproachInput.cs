using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Repository.Models;

public class ApproachInput
{
    [JsonIgnore]
    public ICollection<RefactoringApproach>? RefactoringApproaches { get; set; }
}

[Table(Constants.TABLE_NAME_APPROACH_INPUT_DOMAINARTIFACT)]
public class DomainArtifactInput : ApproachInput
{
    [Key]
    [JsonPropertyName("name")]
    public string Name { get; set; }
    [JsonPropertyName("description")]
    public string? Description { get; set; }
}

[Table(Constants.TABLE_NAME_APPROACH_INPUT_RUNTIMEARTIFACT)]
public class RuntimeArtifactInput : ApproachInput
{
    [Key]
    [JsonPropertyName("name")]
    public string Name { get; set; }
    [JsonPropertyName("description")]
    public string? Description { get; set; }
}

[Table(Constants.TABLE_NAME_APPROACH_INPUT_MODELARTIFACT)]
public class ModelArtifactInput : ApproachInput
{
    [Key]
    [JsonPropertyName("name")]
    public string Name { get; set; }
    [JsonPropertyName("description")]
    public string? Description { get; set; }
}

[Table(Constants.TABLE_NAME_APPROACH_INPUT_EXECUTABLE)]
public class ExecutableInput : ApproachInput
{
    [JsonPropertyName("name")]
    public string Name { get; set; }
    [JsonPropertyName("language")]
    public string Language { get; set; }
    [JsonPropertyName("description")]
    public string? Description { get; set; }
}
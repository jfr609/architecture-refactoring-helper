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
    public string Name { get; set; }
    public string? Description { get; set; }
}

[Table(Constants.TABLE_NAME_APPROACH_INPUT_RUNTIMEARTIFACT)]
public class RuntimeArtifactInput : ApproachInput
{
    [Key]
    public string Name { get; set; }
    public string? Description { get; set; }
}

[Table(Constants.TABLE_NAME_APPROACH_INPUT_MODELARTIFACT)]
public class ModelArtifactInput : ApproachInput
{
    [Key]
    public string Name { get; set; }
    public string? Description { get; set; }
}

[Table(Constants.TABLE_NAME_APPROACH_INPUT_EXECUTABLE)]
public class ExecutableInput : ApproachInput
{
    public string Name { get; set; }
    public string Language { get; set; }
    public string? Description { get; set; }
}
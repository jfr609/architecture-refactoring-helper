using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Repository.Models.Database;

[Table(Constants.TABLE_NAME_APPROACH_INPUT_EXECUTABLE)]
public class ExecutableInput
{
    [Required]
    [JsonPropertyName("name")]
    public string Name { get; set; }
    [Required]
    [JsonPropertyName("language")]
    public string Language { get; set; }
    [JsonPropertyName("description")]
    public string? Description { get; set; }
    
    [JsonIgnore]
    public ICollection<RefactoringApproach>? RefactoringApproaches { get; set; }
}
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Repository.Models.Database;

[Table(Constants.TableNameApproachSource)]
public class ApproachSource
{
    [Key]
    [JsonPropertyName("approachSourceId")]
    public int ApproachSourceId { get; set; }
    
    [Required]
    [JsonPropertyName("title")]
    public string Title { get; set; }
    [Required]
    [JsonPropertyName("year")]
    public int Year { get; set; }
    [JsonPropertyName("link")]
    public string? Link { get; set; }
    [Required]
    [JsonPropertyName("authors")]
    public string Authors { get; set; }

    [JsonIgnore]
    public RefactoringApproach? RefactoringApproach { get; set; }
}
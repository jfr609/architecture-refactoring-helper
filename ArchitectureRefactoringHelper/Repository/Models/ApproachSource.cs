using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Repository.Models;

[Table(Constants.TABLE_NAME_APPROACH_SOURCE)]
public class ApproachSource
{
    [Key]
    [JsonPropertyName("approachSourceId")]
    public int ApproachSourceId { get; set; }
    
    [JsonPropertyName("title")]
    public string Title { get; set; }
    [JsonPropertyName("year")]
    public int Year { get; set; }
    [JsonPropertyName("link")]
    public string Link { get; set; }
    [JsonPropertyName("authors")]
    public string Authors { get; set; }

    [JsonIgnore]
    public RefactoringApproach? RefactoringApproach { get; set; }
}
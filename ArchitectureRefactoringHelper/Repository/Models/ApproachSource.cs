using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Repository.Models;

[Table(Constants.TABLE_NAME_APPROACH_SOURCE)]
public class ApproachSource
{
    [Key]
    public int ApproachSourceId { get; set; }
    
    public string Title { get; set; }
    public int Year { get; set; }
    public string Link { get; set; }
    public string Authors { get; set; }

    [JsonIgnore]
    public RefactoringApproach? RefactoringApproach { get; set; }
}
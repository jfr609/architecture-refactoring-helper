using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Repository.Models.Database;

[Table(Constants.TableNameObjectives)]
public class Objectives
{
    [Key]
    [Required]
    
    [JsonPropertyName("objectivesId")]
    public int ObjectivesId { get; set; }
    
    [JsonPropertyName("objectivesName")]
    public string? ObjectivesName { get; set; }
    
    [JsonPropertyName("objectivesGoalType")]
    public string? ObjectivesGoalType { get; set; }

    public bool KeyEquals(Objectives obj)
    {
        return obj.ObjectivesId == ObjectivesId;
    }

}

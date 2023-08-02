using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Repository.Models.Database;

[Table(Constants.TableNameStrategicGoals)]


public class StrategicGoals
{
    [Key]
    [Required]
    
    [JsonPropertyName("strategicGoalsId")]
    public int StrategicGoalsId { get; set; }
    
    [JsonPropertyName("method")]
    public string? Method { get; set; }
    
    
    [JsonPropertyName("owners")]
    public string? Owner { get; set; }

    [JsonPropertyName("participants")]
    public string? Participants { get; set; }


    [JsonPropertyName("objectives")]
    public ICollection<Objectives>? Objectives { get; set; }

    /*[JsonPropertyName("organizational_objectives")]
    public string Organizational_objectives { get; set; }

    [JsonPropertyName("process_objectives")]
    public string Process_objectives { get; set; }*/

    public bool KeyEquals(StrategicGoals obj)
    {
        return obj.StrategicGoalsId == StrategicGoalsId;
    }
}
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Repository.Models.Database;

[Table(Constants.TableNameApproachProcessScenario)]
public class Scenario
{
    [Key]
    [Required]
    [JsonPropertyName("name")]
    public string Name { get; set; }
    [JsonPropertyName("description")]
    public string? Description { get; set; }
    [JsonPropertyName("difficutly")]
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public RatingLevel? Difficulty { get; set; }
    [JsonPropertyName("importance")]
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public RatingLevel? Importance { get; set; }
    [JsonPropertyName("qualities")]
    public ICollection<Quality>? Qualities { get; set; }
    [JsonIgnore]
    public ICollection<ApproachProcess>? ApproachProcesses { get; set; }


    public bool KeyEquals(Scenario obj)
    {
        return obj.Name == Name;
    }


    public enum RatingLevel
    {
        A,
        B,
        C
    }
}

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Repository.Models.Database;

[Table(Constants.TableNameProjectScenario)]
public class Scenario
{
    [Key]
    [JsonPropertyName("scenarioId")]
    public int ScenarioId { get; set; }
    [Required]
    [JsonPropertyName("name")]
    public string Name { get; set; }
    [JsonPropertyName("description")]
    public string? Description { get; set; }
    [JsonPropertyName("difficulty")]
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public RatingLevel? Difficulty { get; set; }
    [JsonPropertyName("importance")]
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public RatingLevel? Importance { get; set; }
    [JsonPropertyName("qualities")]
    public ICollection<Quality>? Qualities { get; set; }
    [JsonPropertyName("qualitySublevels")]
    public ICollection<QualitySublevel>? QualitySublevels { get; set; }
    [JsonPropertyName("implementedPattern")]
    public  string? ImplementedPattern { get; set; }

    [JsonPropertyName("preferredPattern")]
    public string? PreferredPattern { get; set; }

    [JsonPropertyName("explanation")]
    public string? Explanation { get; set; }


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

    public enum Pattern
    {
        Monolith,
        Microservices,
        Model_View_Controller,
        Pipe_Filter
    }
}

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Repository.Models.Database;

[Table(Constants.TableNameApproachProcessQuality)]
public class Quality
{
    [Key]
    [Required]
    [JsonPropertyName("name")]
    public string Name { get; set; }
    [JsonPropertyName("description")]
    public string? Description { get; set; }
    [Required]
    [JsonPropertyName("category")]
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public QualityCategory Category { get; set; }
    [JsonPropertyName("qualitySublevels")]
    public ICollection<QualitySublevel>? QualitySublevels { get; set; }
    [JsonPropertyName("qualityTradeOffs")]
    public ICollection<Quality>? QualityTradeOffs { get; set; }
    [JsonPropertyName("calculationMetrics")]
    public ICollection<CalculationMetric>? CalculationMetrics { get; set; }
    [JsonIgnore]
    public ICollection<ApproachProcess>? ApproachProcesses { get; set; }
    [JsonIgnore]
    public ICollection<Scenario>? Scenarios { get; set; }

    public bool KeyEquals(Quality obj)
    {
        return obj.Name == Name;
    }
}

public enum QualityCategory
{
    Attribute,
    SystemProperty
}
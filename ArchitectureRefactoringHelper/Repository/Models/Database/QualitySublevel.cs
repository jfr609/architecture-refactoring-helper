using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Repository.Models.Database;

[Table(Constants.TableNameApproachProcessQualitySublevel)]
public class QualitySublevel
{
    [Key]
    [Required]
    [JsonPropertyName("name")]
    public string Name { get; set; }
    [JsonPropertyName("description")]
    public string? Description { get; set; }
    [JsonPropertyName("qualityName")]
    public string? QualityName { get; set; }
    [JsonIgnore]
    public Quality? Quality { get; set; }
    [JsonPropertyName("qualityTradeOffs")]
    public ICollection<Quality>? QualityTradeOffs { get; set; }
    [JsonPropertyName("calculationMetrics")]
    public ICollection<CalculationMetric>? CalculationMetrics { get; set; }
    [JsonIgnore]
    public ICollection<Scenario>? Scenarios { get; set; }
    [JsonIgnore]
    public ICollection<ApproachProcess>? ApproachProcesses { get; set; }

    public bool KeyEquals(QualitySublevel obj)
    {
        return obj.Name == Name;
    }
}
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Repository.Models.Database;

[Table(Constants.TABLE_NAME_APPROACH_PROCESS_QUALITY)]
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

    [JsonIgnore]
    public ICollection<ApproachProcess>? ApproachProcesses { get; set; }
}

public enum QualityCategory
{
    Requirement,
    Metric
}
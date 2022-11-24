using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Repository.Models.Database;

[Table(Constants.TableNameArchitecturalDesign)]
public class ArchitecturalDesign
{
    [Key]
    [JsonPropertyName("architecturalDesignId")]
    public int ArchitecturalDesignId { get; set; }
    [Required]
    [JsonPropertyName("identifier")]
    public string Identifier { get; set; }
    [JsonIgnore]
    public int ArchitecturalDesignSourceId { get; set; }
    [JsonPropertyName("architecturalDesignSource")]
    public ArchitecturalDesignSource ArchitecturalDesignSource { get; set; }
    [Required]
    [JsonPropertyName("category")]
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public ArchitecturalCategory Category { get; set; }
    [JsonIgnore]
    public int ApproachProcessId { get; set; }
    [JsonPropertyName("approachProcess")]
    public ApproachProcess ApproachProcess { get; set; }
}

public enum ArchitecturalCategory
{
    Pattern,
    BestPractice
}
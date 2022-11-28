using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Repository.Models.Database;

[Table(Constants.TableNameArchitecturalDesignSource)]
public class ArchitecturalDesignSource
{
    [Key]
    [JsonPropertyName("architecturalDesignSourceId")]
    public int ArchitecturalDesignSourceId { get; set; }

    [Required]
    [JsonPropertyName("name")]
    public string Name { get; set; }
    [Required]
    [JsonPropertyName("description")]
    public string Description { get; set; }
    [JsonPropertyName("link")]
    public string? Links { get; set; }
    [Required]
    [JsonPropertyName("source")]
    public string Source { get; set; }

    [JsonIgnore]
    public ArchitecturalDesign? ArchitecturalDesign { get; set; }

}

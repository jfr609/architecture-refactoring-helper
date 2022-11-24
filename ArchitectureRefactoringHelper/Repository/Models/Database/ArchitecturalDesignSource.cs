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
    public string? Link { get; set; }
    [Required]
    [JsonPropertyName("authors")]
    public string Authors { get; set; }

    [JsonIgnore]
    public ArchitecturalDesign? ArchitecturalDesign { get; set; }

}

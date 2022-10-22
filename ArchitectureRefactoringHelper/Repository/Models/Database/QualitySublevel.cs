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
    public string? QualityName { get; set; }
    [JsonIgnore]
    public Quality? Quality { get; set; }

    public bool KeyEquals(QualitySublevel obj)
    {
        return obj.Name == Name;
    }
}
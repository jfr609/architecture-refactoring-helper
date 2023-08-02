using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Repository.Models.Database;

[Table(Constants.TableNameObjectives)]
public class Objectives
{
    [Key]
    [Required]
    [JsonPropertyName("ObjectivesId")]
    public string Name { get; set; }
    //[JsonPropertyName("description")]
   /* public string? ObjectiveType { get; set; }
    [Required]
    [JsonPropertyName("category")]
    [JsonConverter(typeof(JsonStringEnumConverter))]*/

    public bool KeyEquals(Quality obj)
    {
        return obj.Name == Name;
    }
}

/*public enum QualityCategory
{
    Attribute,
    SystemProperty
}*/
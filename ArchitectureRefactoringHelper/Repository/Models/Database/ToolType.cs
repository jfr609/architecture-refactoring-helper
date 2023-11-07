using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Repository.Models.Database;

[Table(Constants.TableNameToolType)]
public class ToolType
{
    [Key]
    [Required]
    [JsonPropertyName("name")]
    public string Name { get; set; }

    [JsonPropertyName("description")]
    public string? Description { get; set; }
    
    [JsonIgnore]
    public ICollection<Tool>? Tools { get; set; }
    
    public bool KeyEquals(ToolType obj)
    {
        return obj.Name == Name;
    }
}
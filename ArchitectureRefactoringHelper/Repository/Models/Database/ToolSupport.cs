using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Repository.Models.Database;

[Table(Constants.TableNameApproachUsabilityToolSupport)]
public class ToolSupport
{
    [Key]
    [Required]
    [JsonPropertyName("name")]
    public string Name { get; set; }
    [JsonPropertyName("description")]
    public string? Description { get; set; }
    
    [JsonIgnore]
    public ICollection<ApproachUsability>? ApproachUsabilities { get; set; }
    
    public bool KeyEquals(ToolSupport obj)
    {
        return obj.Name == Name;
    }
}
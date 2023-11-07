using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Repository.Models.Database;

[Table(Constants.TableNameApproachAtomarUnit)]
public class AtomarUnit
{
    [Key]
    [Required]
    [JsonPropertyName("name")]
    public string Name { get; set; }
    [JsonPropertyName("description")]
    public string? Description { get; set; }
    
    [JsonIgnore]
    public ICollection<ApproachProcess>? ApproachProcesses { get; set; }
    
    public bool KeyEquals(AtomarUnit obj)
    {
        return obj.Name == Name;
    }
}
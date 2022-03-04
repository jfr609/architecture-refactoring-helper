using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Repository.Models.Database;

[Table(Constants.TableNameApproachOutputServiceType)]
public class ServiceType
{
    [Key]
    [Required]
    [JsonPropertyName("name")]
    public string Name { get; set; }
    [JsonPropertyName("description")]
    public string? Description { get; set; }
    
    [JsonIgnore]
    public ICollection<ApproachOutput>? ApproachOutputs { get; set; }
    
    public bool KeyEquals(ServiceType obj)
    {
        return obj.Name == Name;
    }
}
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Repository.Models.Database;

[Table(Constants.TableNameApproachUsabilityAccuracyPrecision)]
public class AccuracyPrecision
{
    [Key]
    [Required]
    [JsonPropertyName("name")]
    public string Name { get; set; }
    [JsonPropertyName("description")]
    public string? Description { get; set; }

    [JsonIgnore]
    public ICollection<ApproachUsability>? ApproachUsabilities { get; set; }
}
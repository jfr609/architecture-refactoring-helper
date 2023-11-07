using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Repository.Models.Database;

[Table(Constants.TableNameTool + "s")]
public class Tool
{
    [Key]
    [JsonPropertyName("toolId")]
    public int ToolId { get; set; }

    [Required]
    [JsonPropertyName("identifier")]
    public string Identifier { get; set; }

    [JsonIgnore]
    public int ToolSourceId { get; set; }

    [JsonPropertyName("toolSource")]
    public ToolSource ToolSource { get; set; }

    [JsonPropertyName("toolTypes")]
    public ICollection<ToolType>? ToolTypes { get; set; }
    [JsonPropertyName("approachUsabilities")]
    public ICollection<ApproachUsability>? ApproachUsabilities { get; set; }
}
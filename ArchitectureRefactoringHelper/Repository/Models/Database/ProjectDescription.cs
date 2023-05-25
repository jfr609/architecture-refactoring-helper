using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Repository.Models.Database;

[Table(Constants.TableNameProjectDescription)]
public class ProjectDescription
{
    [Key]
    [Required]
    
    [JsonPropertyName("projectDescriptionId")]
    public int ProjectDescriptionId { get; set; }
    
    [JsonPropertyName("systemname")]
    public string Systemname { get; set; }
    
    
    
    
    
  

    [JsonPropertyName("ownership")]
    public string? Ownership { get; set; }

    [JsonPropertyName("creationdate")]
    public string Creationdate { get; set; }

    [JsonPropertyName("systemsize")]
    public string  Systemsize { get; set; }

    [JsonPropertyName("hosting")]
    public string Hosting { get; set; }

    [JsonPropertyName("teams")]
    public string Teams { get; set; }

    [JsonPropertyName("developers")]
    public string Developers { get; set; }

    [JsonPropertyName("processmodel")]
    public string Processmodel { get; set; }

    [JsonPropertyName("architecturepattern")]
    public string Architecturepattern { get; set; }

    [JsonPropertyName("languages")]
    public string Languages { get; set; }

    [JsonPropertyName("persistence")]
    public string Persistence { get; set; }

    [JsonPropertyName("purpose")]
    public string Purpose { get; set; }

    [JsonPropertyName("functionality")]
    public string Functionality { get; set; }


    [JsonPropertyName("designdiagrams")]
    public string Designdiagrams { get; set; }





    public bool KeyEquals(ProjectDescription obj)
    {
        return obj.Systemname == Systemname;
    }


}

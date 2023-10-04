using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Repository.Models.Database;

[Table(Constants.TableNameProjectDescription)]
public class ProjectDescription
{
    internal string? jsonArray;

    [Key]
    [Required]
    
    [JsonPropertyName("projectDescriptionId")]
    public int ProjectDescriptionId { get; set; }
    
    [JsonPropertyName("systemname")]
    public string? Systemname { get; set; }
    
    [JsonPropertyName("ownership")]
    public string? Ownership { get; set; }

    [JsonPropertyName("creation_date")]
    public string? Creation_date { get; set; }

    [JsonPropertyName("systemsize_LOC")]
    public int? Systemsize_LOC { get; set; }

    [JsonPropertyName("hosting_model")]
    public string? Hosting_model { get; set; }

    [JsonPropertyName("number_of_teams")]
    public int? Number_of_Teams { get; set; }

    [JsonPropertyName("number_of_developers")]
    public int? Number_of_Developers { get; set; }

    [JsonPropertyName("processmodel")]
    public string? Processmodel { get; set; }

    [JsonPropertyName("architecturepattern")]
    public string? Architecturepattern { get; set; }
    /*//[JsonConverter(typeof(JsonStringEnumConverter))]
    //public ICollection<ArchitecturePattern>? Architecturepattern { get; set; }*/

   /*[JsonPropertyName("monolith")]
    public bool? Monolith { get; set; }

    [JsonPropertyName("microservice")]
    public bool? Microservice { get; set; }

    [JsonPropertyName("serverless")]
    public bool? Serverless { get; set; }

    [JsonPropertyName("modelviewcontroller")]
    public bool? Modelviewcontroller { get; set; }

    [JsonPropertyName("Pipe-Filter")]
    public bool? PipeFilter { get; set; }*/


    [JsonPropertyName("languages")]
    public string? Languages { get; set; }
    //[JsonConverter(typeof(JsonStringEnumConverter))]
    //public ICollection<Language>? Languages { get; set; }*/

    /*[JsonPropertyName("java")]
    public bool? Java { get; set; }
    [JsonPropertyName("c++")]
    public bool? Cpp { get; set; }
    [JsonPropertyName("c#")]
    public bool? Csharp { get; set; }
    [JsonPropertyName("python")]
    public bool? Python { get; set; }
    [JsonPropertyName("javascript")]
    public bool? Javascript { get; set; }

    [JsonPropertyName("php")]
    public bool? Php { get; set; }*/



    [JsonPropertyName("data_persistence")]
    public string? Data_Persistence { get; set; }

    [JsonPropertyName("purpose")]
    public string? Purpose { get; set; }

    [JsonPropertyName("functionality")]
    public string? Functionality { get; set; }


    [JsonPropertyName("designdiagrams")]
    public string? Designdiagrams { get; set; }





    public bool KeyEquals(ProjectDescription obj)
    {
        return obj.ProjectDescriptionId == ProjectDescriptionId;
    }

}

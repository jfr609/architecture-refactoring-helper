using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Repository.Models.Recommendation;

public class QualityScore
{
    [JsonPropertyName("selectedAttributes")]
    public int SelectedAttributes { get; set; }

    [JsonPropertyName("totalAttributes")]
    public int TotalAttributes { get; set; }

    [JsonPropertyName("tendency")]
    public int Tendency { get; set;}
}
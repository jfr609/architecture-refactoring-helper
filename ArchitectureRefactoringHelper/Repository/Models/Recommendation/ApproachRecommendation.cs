using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Repository.Models.Database;

namespace Repository.Models.Recommendation;

public class ApproachRecommendation
{
    [Required]
    [JsonPropertyName("refactoringApproach")]
    public RefactoringApproach RefactoringApproach { get; set; }

    [Required]
    [JsonPropertyName("suitabilityScore")] 
    public int SuitabilityScore { get; set; }
}
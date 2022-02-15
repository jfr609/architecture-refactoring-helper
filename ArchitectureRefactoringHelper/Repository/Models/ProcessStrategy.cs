using System.ComponentModel.DataAnnotations;

namespace Repository.Models;

public class ProcessStrategy
{
    [Key]
    public string Name { get; set; }
    public string? Description { get; set; }
    
    public ICollection<RefactoringApproach> RefactoringApproaches { get; set; }
}
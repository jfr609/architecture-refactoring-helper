using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Repository.Models.Database;

namespace Repository.DatabaseConfigurations;

public class TechniqueEntityTypeConfiguration : IEntityTypeConfiguration<Technique>
{
    public void Configure(EntityTypeBuilder<Technique> builder)
    {
        builder.ToTable(Constants.TableNameApproachProcessTechnique);
        
        builder.HasData(
            new Technique
            {
                Name = "Wrapping",
                Description = ""
            },
            new Technique
            {
                Name = "Genetic algorithm",
                Description = ""
            },
            new Technique
            {
                Name = "Formal concept analysis",
                Description = ""
            },
            new Technique
            {
                Name = "Clustering",
                Description = ""
            },
            new Technique
            {
                Name = "Custom heuristics",
                Description = ""
            },
            new Technique
            {
                Name = "General guidelines",
                Description = ""
            });
    }
}
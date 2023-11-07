using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Repository.Models.Database;

namespace Repository.DatabaseConfigurations;

public class TechniqueConfiguration : IEntityTypeConfiguration<Technique>
{
    public void Configure(EntityTypeBuilder<Technique> builder)
    {
        builder.ToTable(Constants.TableNameApproachProcessTechnique);

        builder.HasData(
            new Technique
            {
                Name = "Wrapping",
                Description =
                    "A black-box identification technique that encapsulates the legacy system with a service layer without changing its implementation. The wrapper provides access to the legacy system through a service encapsulation layer that exposes only the functionalities desired by the software architect."
            },
            new Technique
            {
                Name = "Genetic algorithm",
                Description =
                    "A meta-heuristic for solving optimization problems that is based on \"natural selection\". It relies on the calculation of a fitness function to reach an optimal (or near-optimal) solution. By definition, an optimal solution is a feasible solution where the fitness function reaches its maximum (or minimum) value."
            },
            new Technique
            {
                Name = "Formal concept analysis",
                Description =
                    "A method for data analysis where we derive implicit relationships between objects in a formal way. It is also considered as a principled way of grouping objects that have common properties."
            },
            new Technique
            {
                Name = "Clustering",
                Description =
                    "Clustering consists of classifying and partitioning data into clusters that share common properties. These clusters are built based on the internal homogeneity of their elements and the external separation between them."
            },
            new Technique
            {
                Name = "Custom heuristics",
                Description =
                    "Custom heuristic algorithms to decompose legacy software into Service Oriented Architecture differing from predefined algorithms."
            },
            new Technique
            {
                Name = "General guidelines",
                Description = "Proposes best practices, lessons learned, or recommendations for service identification."
            }
        );
    }
}
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Repository.Models.Database;

namespace Repository.DatabaseConfigurations;

public class ProcessStrategyConfiguration : IEntityTypeConfiguration<ProcessStrategy>
{
    public void Configure(EntityTypeBuilder<ProcessStrategy> builder)
    {
        builder.ToTable(Constants.TableNameApproachProcessStrategy);

        builder.HasData(
            new ProcessStrategy
            {
                Name = "Greenfield",
                Description =
                    "A black-box identification technique that encapsulates the legacy system with a service layer without changing its implementation. The wrapper provides access to the legacy system through a service encapsulation layer that exposes only the functionalities desired by the software architect."
            },
            new ProcessStrategy
            {
                Name = "Rewrite / Rebuild",
                Description =
                    "A meta-heuristic for solving optimization problems that is based on \"natural selection\". It relies on the calculation of a fitness function to reach an optimal (or near-optimal) solution. By definition, an optimal solution is a feasible solution where the fitness function reaches its maximum (or minimum) value."
            },
            new ProcessStrategy
            {
                Name = "Refactor",
                Description =
                    "Clustering consists of classifying and partitioning data into clusters that share common properties. These clusters are built based on the internal homogeneity of their elements and the external separation between them."
            },
            new ProcessStrategy
            {
                Name = "Strangler",
                Description =
                    "Custom heuristic algorithms to decompose legacy software into Service Oriented Architecture differing from predefined algorithms."
            },
            new ProcessStrategy
            {
                Name = "Continuous Evolution",
                Description =
                    "Custom heuristic algorithms to decompose legacy software into Service Oriented Architecture differing from predefined algorithms."
            },
            new ProcessStrategy
            {
                Name = "Extension",
                Description =
                    "Custom heuristic algorithms to decompose legacy software into Service Oriented Architecture differing from predefined algorithms."
            });
    }
}
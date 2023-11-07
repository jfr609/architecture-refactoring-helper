using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Repository.Models.Database;

namespace Repository.DatabaseConfigurations;

public class AtomarUnitConfiguration : IEntityTypeConfiguration<AtomarUnit>
{
    public void Configure(EntityTypeBuilder<AtomarUnit> builder)
    {
        builder.ToTable(Constants.TableNameApproachAtomarUnit);

        builder.HasData(
            new AtomarUnit
            {
                Name = "Function",
                Description =
                    "A black-box identification technique that encapsulates the legacy system with a service layer without changing its implementation. The wrapper provides access to the legacy system through a service encapsulation layer that exposes only the functionalities desired by the software architect."
            },
            new AtomarUnit
            {
                Name = "Functionality",
                Description =
                    "A meta-heuristic for solving optimization problems that is based on \"natural selection\". It relies on the calculation of a fitness function to reach an optimal (or near-optimal) solution. By definition, an optimal solution is a feasible solution where the fitness function reaches its maximum (or minimum) value."
            },
            new AtomarUnit
            {
                Name = "Business Capability",
                Description =
                    "Clustering consists of classifying and partitioning data into clusters that share common properties. These clusters are built based on the internal homogeneity of their elements and the external separation between them."
            },
            new AtomarUnit
            {
                Name = "Entity",
                Description =
                    "Custom heuristic algorithms to decompose legacy software into Service Oriented Architecture differing from predefined algorithms."
            },
            new AtomarUnit
            {
                Name = "Interface",
                Description =
                    "Custom heuristic algorithms to decompose legacy software into Service Oriented Architecture differing from predefined algorithms."
            },
            new AtomarUnit
            {
                Name = "Other",
                Description =
                    "Custom heuristic algorithms to decompose legacy software into Service Oriented Architecture differing from predefined algorithms."
            });
    }
}
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Repository.Models.Database;

namespace Repository.DatabaseConfigurations;

public class RepresentationOutputConfiguration : IEntityTypeConfiguration<Representation>
{
    public void Configure(EntityTypeBuilder<Representation> builder)
    {
        builder.ToTable(Constants.TableNameApproachOutputRepresentation);

        builder.HasData(
            new Representation
            {
                Name = "Source code",
                Description =
                    "The approach generates source code for individual microservices or a skeleton for their implementation."
            },
            new Representation
            {
                Name = "List of services",
                Description = "The approach generates a list of services that typically contains clustered elements of the atomic unit."
            },
            new Representation
            {
                Name = "Splitting recommendations",
                Description =
                    "The approach produces splitting recommendations or creates potential parameterizable service cuts."
            },
            new Representation
            {
                Name = "Guideline / Workflow",
                Description =
                    "The approach does not produce tangible output artifacts, but rather serves as guideline or workflow in the decomposition process. It typically requires a high degree of human expertise and offers a low degree of automation."
            });
    }
}
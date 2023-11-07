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
                    "An ontology is a structured set of terms representing the semantics of a domain, whether through metadata or elements of a knowledge domain"
            },
            new Representation
            {
                Name = "List of services",
                Description = ""
            },
            new Representation
            {
                Name = "Splitting recommendations",
                Description =
                    "Software documentation describes and documents systems at different levels of abstraction. It includes textual descriptions as well as diagrams and models"
            },
            new Representation
            {
                Name = "Guideline / Workflow",
                Description =
                    "Software documentation describes and documents systems at different levels of abstraction. It includes textual descriptions as well as diagrams and models"
            });
    }
}
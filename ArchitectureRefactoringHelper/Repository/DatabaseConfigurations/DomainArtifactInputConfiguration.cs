using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Repository.Models.Database;

namespace Repository.DatabaseConfigurations;

public class DomainArtifactInputConfiguration : IEntityTypeConfiguration<DomainArtifactInput>
{
    public void Configure(EntityTypeBuilder<DomainArtifactInput> builder)
    {
        builder.ToTable(Constants.TableNameApproachInputDomainArtifact);

        builder.HasData(
            new DomainArtifactInput
            {
                Name = "Ontology",
                Description =
                    "An ontology is a structured set of terms representing the semantics of a domain, whether through metadata or elements of a knowledge domain"
            },
            new DomainArtifactInput
            {
                Name = "Human expertise",
                Description = ""
            },
            new DomainArtifactInput
            {
                Name = "Documentation",
                Description =
                    "Software documentation describes and documents systems at different levels of abstraction. It includes textual descriptions as well as diagrams and models"
            }
        );
    }
}
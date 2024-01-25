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
                    "An ontology represents a structured taxonomy that reflects the semantics of a domain, e.g., through meta-data or domain elements."
            },
            new DomainArtifactInput
            {
                Name = "Human expertise",
                Description = "Substantial domain knowledge and technical expertise are required for applying the approach."
            },
            new DomainArtifactInput
            {
                Name = "Documentation",
                Description =
                    "Software documentation includes specifications, textual descriptions, or diagrams that document the application at different levels of abstraction."
            }
        );
    }
}
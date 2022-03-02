using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Repository.Models.Database;

namespace Repository.DatabaseConfigurations;

public class DomainArtifactInputEntityTypeConfiguration : IEntityTypeConfiguration<DomainArtifactInput>
{
    public void Configure(EntityTypeBuilder<DomainArtifactInput> builder)
    {
        builder.ToTable(Constants.TableNameApproachInputDomainArtifact);
        
        builder.HasData(
            new DomainArtifactInput
            {
                Name = "Ontology",
                Description = ""
            },
            new DomainArtifactInput
            {
                Name = "Human expertise",
                Description = ""
            },
            new DomainArtifactInput
            {
                Name = "Documentation",
                Description = ""
            });
    }
}
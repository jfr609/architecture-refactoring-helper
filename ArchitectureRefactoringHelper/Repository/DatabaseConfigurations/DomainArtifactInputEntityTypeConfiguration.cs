using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Repository.Models;

namespace Repository.DatabaseConfigurations;

public class DomainArtifactInputEntityTypeConfiguration : IEntityTypeConfiguration<DomainArtifactInput>
{
    public void Configure(EntityTypeBuilder<DomainArtifactInput> builder)
    {
        builder.ToTable(Constants.TABLE_NAME_APPROACH_INPUT_DOMAINARTIFACT);
        
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
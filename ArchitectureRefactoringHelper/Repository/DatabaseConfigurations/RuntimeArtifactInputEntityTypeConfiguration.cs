using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Repository.Models;

namespace Repository.DatabaseConfigurations;

public class RuntimeArtifactInputEntityTypeConfiguration : IEntityTypeConfiguration<RuntimeArtifactInput>
{
    public void Configure(EntityTypeBuilder<RuntimeArtifactInput> builder)
    {
        builder.ToTable(Constants.TABLE_NAME_APPROACH_INPUT_RUNTIMEARTIFACT);
        
        builder.HasData(
            new RuntimeArtifactInput
            {
                Name = "Log traces",
                Description = ""
            },
            new RuntimeArtifactInput
            {
                Name = "User-Application interactions",
                Description = ""
            });
    }
}
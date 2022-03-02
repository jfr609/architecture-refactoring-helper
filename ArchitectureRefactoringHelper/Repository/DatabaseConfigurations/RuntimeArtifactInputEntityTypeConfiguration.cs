using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Repository.Models.Database;

namespace Repository.DatabaseConfigurations;

public class RuntimeArtifactInputEntityTypeConfiguration : IEntityTypeConfiguration<RuntimeArtifactInput>
{
    public void Configure(EntityTypeBuilder<RuntimeArtifactInput> builder)
    {
        builder.ToTable(Constants.TableNameApproachInputRuntimeArtifact);
        
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
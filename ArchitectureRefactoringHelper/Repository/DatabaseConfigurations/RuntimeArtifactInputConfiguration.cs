using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Repository.Models.Database;

namespace Repository.DatabaseConfigurations;

public class RuntimeArtifactInputConfiguration : IEntityTypeConfiguration<RuntimeArtifactInput>
{
    public void Configure(EntityTypeBuilder<RuntimeArtifactInput> builder)
    {
        builder.ToTable(Constants.TableNameApproachInputRuntimeArtifact);

        builder.HasData(
            new RuntimeArtifactInput
            {
                Name = "Log traces",
                Description =
                    "Execution traces of legacy software systems depicting the dynamic behavior of the systems"
            },
            new RuntimeArtifactInput
            {
                Name = "User-Application interactions",
                Description =
                    "User-interface inputs capturing the relationship between users and the system’s functionalities."
            }
        );
    }
}
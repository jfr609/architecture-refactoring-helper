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
                    "Execution traces of the monolithic application, that reflect the dynamic behavior, are required as input."
            },
            new RuntimeArtifactInput
            {
                Name = "User-Application interactions",
                Description =
                    "User-interface interactions that capture the actions a user performs when using certain functionalities are required as input."
            }
        );
    }
}
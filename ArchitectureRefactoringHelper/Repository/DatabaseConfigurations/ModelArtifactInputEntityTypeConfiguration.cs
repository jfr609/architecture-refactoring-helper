using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Repository.Models.Database;

namespace Repository.DatabaseConfigurations;

public class ModelArtifactInputEntityTypeConfiguration : IEntityTypeConfiguration<ModelArtifactInput>
{
    public void Configure(EntityTypeBuilder<ModelArtifactInput> builder)
    {
        builder.ToTable(Constants.TABLE_NAME_APPROACH_INPUT_MODELARTIFACT);
        
        builder.HasData(
            new ModelArtifactInput
            {
                Name = "Business process model",
                Description = ""
            },
            new ModelArtifactInput
            {
                Name = "Use case model",
                Description = ""
            },
            new ModelArtifactInput
            {
                Name = "Activity diagram",
                Description = ""
            },
            new ModelArtifactInput
            {
                Name = "Data flow diagram",
                Description = ""
            },
            new ModelArtifactInput
            {
                Name = "State machine diagram",
                Description = ""
            });
    }
}
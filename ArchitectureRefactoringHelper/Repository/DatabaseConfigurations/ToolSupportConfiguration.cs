using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Repository.Models.Database;

namespace Repository.DatabaseConfigurations;

public class ToolSupportConfiguration : IEntityTypeConfiguration<ToolSupport>
{
    public void Configure(EntityTypeBuilder<ToolSupport> builder)
    {
        builder.ToTable(Constants.TableNameApproachUsabilityToolSupport);

        builder.HasData(
            new ToolSupport
            {
                Name = "Industry ready",
                Description = "The tool has been applied to production environments in industry."
            },
            new ToolSupport
            {
                Name = "Open source",
                Description = "The tool is developed as open source software."
            },
            new ToolSupport
            {
                Name = "Prototype",
                Description = "The tool is in a prototype state which can entail several limitations, such as no evaluation, limited functionality, or no support."
            },
            new ToolSupport
            {
                Name = Constants.AttributeDefaultNoToolSupport,
                Description = "The approach offers no tool support."
            }
        );
    }
}
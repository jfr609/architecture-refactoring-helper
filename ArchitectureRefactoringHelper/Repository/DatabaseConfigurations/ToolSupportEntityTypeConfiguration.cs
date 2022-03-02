using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Repository.Models.Database;

namespace Repository.DatabaseConfigurations;

public class ToolSupportEntityTypeConfiguration : IEntityTypeConfiguration<ToolSupport>
{
    public void Configure(EntityTypeBuilder<ToolSupport> builder)
    {
        builder.ToTable(Constants.TableNameApproachUsabilityToolSupport);

        builder.HasData(
            new ToolSupport
            {
                Name = "Industry ready",
                Description = ""
            },
            new ToolSupport
            {
                Name = "Open source",
                Description = ""
            },
            new ToolSupport
            {
                Name = "Prototype",
                Description = ""
            },
            new ToolSupport
            {
                Name = Constants.AttributeDefaultNoToolSupport,
                Description = ""
            });
    }
}
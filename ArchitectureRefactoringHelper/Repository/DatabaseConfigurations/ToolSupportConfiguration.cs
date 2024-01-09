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
                Description = "The approach has a tool implementation which is industry ready."
            },
            new ToolSupport
            {
                Name = "Open source",
                Description = "The approach has a tool implementation which is open source."
            },
            new ToolSupport
            {
                Name = "Prototype",
                Description = "The approach has a prototype tool which was implementation."
            },
            new ToolSupport
            {
                Name = Constants.AttributeDefaultNoToolSupport,
                Description = ""
            }
        );
    }
}
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Repository.Models.Database;

namespace Repository.DatabaseConfigurations;

public class ToolTypeConfiguration : IEntityTypeConfiguration<ToolType>
{
    public void Configure(EntityTypeBuilder<ToolType> builder)
    {
        builder.ToTable(Constants.TableNameToolType);

        builder.HasData(
            new ToolType
            {
                Name = "Static Analysis",
                Description = "The approach has a tool implementation which is industry ready."
            },
            new ToolType
            {
                Name = "Dynamic Analysis",
                Description = "The approach has a tool implementation which is open source."
            },
            new ToolType
            {
                Name = "Decomposition",
                Description = "The approach has a prototype tool which was implementation."
            },
            new ToolType
            {
                Name = "Other",
                Description = "The approach has a prototype tool which was implementation"
            },
            new ToolType
            {
                Name = "Open Source",
                Description = "The approach has a prototype tool which was implementation"
            });
    }
}
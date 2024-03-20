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
                Description = "The tool performs a static analysis."
            },
            new ToolType
            {
                Name = "Dynamic Analysis",
                Description = "The tool performs a dynamic analysis."
            },
            new ToolType
            {
                Name = "Decomposition",
                Description = "The tool performs a decomposition into microservices."
            },
            new ToolType
            {
                Name = "Other",
                Description = "The tool serves another purpose (see tool description)."
            },
            new ToolType
            {
                Name = "Open Source",
                Description = "The tool is developed as open source software."
            });
    }
}
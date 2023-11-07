using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Repository.Models.Database;

namespace Repository.DatabaseConfigurations;

public class ToolConfiguration : IEntityTypeConfiguration<Tool>
{
    public void Configure(EntityTypeBuilder<Tool> builder)
    {
        builder.HasIndex(e => e.Identifier)
            .IsUnique();

        // Define Join Table for Tool and ToolType
        builder.HasMany(left => left.ToolTypes)
            .WithMany(right => right.Tools)
            .UsingEntity(join => join.ToTable(Constants.JoinTablePrefix + Constants.TableNameToolType));
    }
}
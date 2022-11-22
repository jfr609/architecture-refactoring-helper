using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Repository.Models.Database;

namespace Repository.DatabaseConfigurations;

public class ArchitecturalDesignConfiguration : IEntityTypeConfiguration<ArchitecturalDesign>
{
    public void Configure(EntityTypeBuilder<ArchitecturalDesign> builder)
    {
        builder.HasIndex(e => e.Identifier)
            .IsUnique();
    }
}
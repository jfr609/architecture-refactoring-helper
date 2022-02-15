using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Repository.Models;

namespace Repository.DatabaseConfigurations;

public class DirectionEntityTypeConfiguration : IEntityTypeConfiguration<Direction>
{
    public void Configure(EntityTypeBuilder<Direction> builder)
    {
        builder.ToTable(Constants.TABLE_NAME_APPROACH_PROCESS_DIRECTION);
        
        builder.HasData(
            new Direction
            {
                Name = "Bottom-up",
                Description = ""
            },
            new Direction
            {
                Name = "Top-down",
                Description = ""
            },
            new Direction
            {
                Name = "Mixed",
                Description = ""
            });
    }
}
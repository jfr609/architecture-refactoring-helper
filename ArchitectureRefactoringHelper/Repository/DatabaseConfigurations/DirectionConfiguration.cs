using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Repository.Models.Database;

namespace Repository.DatabaseConfigurations;

public class DirectionConfiguration : IEntityTypeConfiguration<Direction>
{
    public void Configure(EntityTypeBuilder<Direction> builder)
    {
        builder.ToTable(Constants.TableNameApproachProcessDirection);

        builder.HasData(
            new Direction
            {
                Name = "Bottom-up",
                Description =
                    "A bottom-up approach works on low-level artifacts like source code or databases. It thereby maximizes code reuse and minimizes changes."
            },
            new Direction
            {
                Name = "Top-down",
                Description =
                    "A top-down approach works on high-level artifacts, e.g., requirements or use cases that characterize the system's functionalities."
            },
            new Direction
            {
                Name = "Mixed",
                Description =
                    "A mixed or hybrid approach combines a top-down and a bottom-up process for identification of services."
            }
        );
    }
}
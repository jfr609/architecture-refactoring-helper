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
                    "A bottom-up process starts with low-level artifacts to maximize code reuse and minimize changes."
            },
            new Direction
            {
                Name = "Top-down",
                Description =
                    "A top-down process starts with high-level artifacts, e.g., domain analysis or requirement characterization of systems to define their functionalities."
            },
            new Direction
            {
                Name = "Mixed",
                Description =
                    "A mixed hybrid process combines a top-down and a bottom-up process. It uses both requirements and implementation artifacts to identify the candidate services."
            }
        );
    }
}
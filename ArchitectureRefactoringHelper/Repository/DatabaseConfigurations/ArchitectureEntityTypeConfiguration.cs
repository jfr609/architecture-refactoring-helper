using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Repository.Models.Database;

namespace Repository.DatabaseConfigurations;

public class ArchitectureEntityTypeConfiguration : IEntityTypeConfiguration<Architecture>
{
    public void Configure(EntityTypeBuilder<Architecture> builder)
    {
        builder.ToTable(Constants.TABLE_NAME_APPROACH_OUTPUT_ARCHITECTURE);

        builder.HasData(
            new Architecture
            {
                Name = "Services",
                Description = ""
            },
            new Architecture
            {
                Name = "Microservices",
                Description = ""
            });
    }
}
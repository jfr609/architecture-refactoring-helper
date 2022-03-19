using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Repository.Models.Database;

namespace Repository.DatabaseConfigurations;

public class ArchitectureConfiguration : IEntityTypeConfiguration<Architecture>
{
    public void Configure(EntityTypeBuilder<Architecture> builder)
    {
        builder.ToTable(Constants.TableNameApproachOutputArchitecture);

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
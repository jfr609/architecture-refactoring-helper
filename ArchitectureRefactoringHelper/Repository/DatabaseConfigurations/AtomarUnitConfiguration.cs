using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Repository.Models.Database;

namespace Repository.DatabaseConfigurations;

public class AtomarUnitConfiguration : IEntityTypeConfiguration<AtomarUnit>
{
    public void Configure(EntityTypeBuilder<AtomarUnit> builder)
    {
        builder.ToTable(Constants.TableNameApproachAtomarUnit);

        builder.HasData(
            new AtomarUnit
            {
                Name = "Function",
                Description =
                    "A function, method, or procedure of the source code represents the smallest unit that the approach can treat in the course of a decomposition."
            },
            new AtomarUnit
            {
                Name = "Functionality",
                Description =
                    "A functionality of the application, e.g., a requirement or use case, represents the smallest unit that the approach can treat in the course of a decomposition."
            },
            new AtomarUnit
            {
                Name = "Business Capability",
                Description =
                    "A business capability represents the smallest unit that the approach can treat in the course of a decomposition."
            },
            new AtomarUnit
            {
                Name = "Entity",
                Description =
                    "An entity, commonly in the context of data or databases, represents the smallest unit that the approach can treat in the course of a decomposition."
            },
            new AtomarUnit
            {
                Name = "Interface",
                Description =
                    "An interface of the application, commonly exposed functionality through an API, represents the smallest unit that the approach can treat in the course of a decomposition."
            },
            new AtomarUnit
            {
                Name = "Other",
                Description =
                    "The approach defines no or no specific smallest unit used for the decomposition."
            });
    }
}
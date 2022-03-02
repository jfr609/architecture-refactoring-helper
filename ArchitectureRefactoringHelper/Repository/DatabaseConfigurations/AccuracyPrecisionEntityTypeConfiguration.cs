using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Repository.Models.Database;

namespace Repository.DatabaseConfigurations;

public class AccuracyPrecisionEntityTypeConfiguration : IEntityTypeConfiguration<AccuracyPrecision>
{
    public void Configure(EntityTypeBuilder<AccuracyPrecision> builder)
    {
        builder.ToTable(Constants.TableNameApproachUsabilityAccuracyPrecision);

        builder.HasData(
            new AccuracyPrecision
            {
                Name = Constants.AttributeDefaultHigh,
                Description = ""
            },
            new AccuracyPrecision
            {
                Name = Constants.AttributeDefaultMedium,
                Description = ""
            },
            new AccuracyPrecision
            {
                Name = Constants.AttributeDefaultLow,
                Description = ""
            },
            new AccuracyPrecision
            {
                Name = Constants.AttributeDefaultNotAvailable,
                Description = ""
            });
    }
}
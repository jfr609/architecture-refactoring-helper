using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Repository.Models.Database;

namespace Repository.DatabaseConfigurations;

public class AccuracyPrecisionConfiguration : IEntityTypeConfiguration<AccuracyPrecision>
{
    public void Configure(EntityTypeBuilder<AccuracyPrecision> builder)
    {
        builder.ToTable(Constants.TableNameApproachUsabilityAccuracyPrecision);

        builder.HasData(
            new AccuracyPrecision
            {
                Name = Constants.AttributeDefaultHigh,
                Description = "Estimates the accuracy/precision of the approach as high."
            },
            new AccuracyPrecision
            {
                Name = Constants.AttributeDefaultMedium,
                Description = "Estimates the accuracy/precision of the approach as medium."
            },
            new AccuracyPrecision
            {
                Name = Constants.AttributeDefaultLow,
                Description = "Estimates the accuracy/precision of the approach as low."
            },
            new AccuracyPrecision
            {
                Name = Constants.AttributeDefaultNotAvailable,
                Description = ""
            });
    }
}
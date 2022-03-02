using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Repository.Models.Database;

namespace Repository.DatabaseConfigurations;

public class ResultsQualityEntityTypeConfiguration : IEntityTypeConfiguration<ResultsQuality>
{
    public void Configure(EntityTypeBuilder<ResultsQuality> builder)
    {
        builder.ToTable(Constants.TableNameApproachUsabilityResultsQuality);

        builder.HasData(
            new ResultsQuality
            {
                Name = Constants.AttributeDefaultHigh,
                Description = ""
            },
            new ResultsQuality
            {
                Name = Constants.AttributeDefaultMedium,
                Description = ""
            },
            new ResultsQuality
            {
                Name = Constants.AttributeDefaultLow,
                Description = ""
            },
            new ResultsQuality
            {
                Name = Constants.AttributeDefaultNotAvailable,
                Description = ""
            });
    }
}
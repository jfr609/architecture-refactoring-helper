using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Repository.Models.Database;

namespace Repository.DatabaseConfigurations;

public class ResultsQualityConfiguration : IEntityTypeConfiguration<ResultsQuality>
{
    public void Configure(EntityTypeBuilder<ResultsQuality> builder)
    {
        builder.ToTable(Constants.TableNameApproachUsabilityResultsQuality);

        builder.HasData(
            new ResultsQuality
            {
                Name = Constants.AttributeDefaultHigh,
                Description = "Estimates the quality of the identified candidate service(s) as high."
            },
            new ResultsQuality
            {
                Name = Constants.AttributeDefaultMedium,
                Description = "Estimates the quality of the identified candidate service(s) as medium."
            },
            new ResultsQuality
            {
                Name = Constants.AttributeDefaultLow,
                Description = "Estimates the quality of the identified candidate service(s) as low."
            },
            new ResultsQuality
            {
                Name = Constants.AttributeDefaultNotAvailable,
                Description = ""
            });
    }
}
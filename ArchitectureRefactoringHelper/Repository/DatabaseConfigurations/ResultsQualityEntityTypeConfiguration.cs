using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Repository.Models;

namespace Repository.DatabaseConfigurations;

public class ResultsQualityEntityTypeConfiguration : IEntityTypeConfiguration<ResultsQuality>
{
    public void Configure(EntityTypeBuilder<ResultsQuality> builder)
    {
        builder.ToTable(Constants.TABLE_NAME_APPROACH_USABILITY_RESULTSQUALITY);
        
        builder.HasData(
            new ResultsQuality
            {
                Name = "High",
                Description = ""
            },
            new ResultsQuality
            {
                Name = "Medium",
                Description = ""
            },
            new ResultsQuality
            {
                Name = "Low",
                Description = ""
            },
            new ResultsQuality
            {
                Name = "NA",
                Description = ""
            });
    }
}
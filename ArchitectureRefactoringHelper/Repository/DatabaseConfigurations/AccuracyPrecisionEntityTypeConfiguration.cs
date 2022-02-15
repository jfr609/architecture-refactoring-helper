using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Repository.Models;

namespace Repository.DatabaseConfigurations;

public class AccuracyPrecisionEntityTypeConfiguration : IEntityTypeConfiguration<AccuracyPrecision>
{
    public void Configure(EntityTypeBuilder<AccuracyPrecision> builder)
    {
        builder.ToTable(Constants.TABLE_NAME_APPROACH_USABILITY_ACCURACYPRECISION);
        
        builder.HasData(
            new AccuracyPrecision
            {
                Name = "High",
                Description = ""
            },
            new AccuracyPrecision
            {
                Name = "Medium",
                Description = ""
            },
            new AccuracyPrecision
            {
                Name = "Low",
                Description = ""
            },
            new AccuracyPrecision
            {
                Name = "NA",
                Description = ""
            });
    }
}
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Repository.Models.Database;

namespace Repository.DatabaseConfigurations;

public class QualityEntityTypeConfiguration : IEntityTypeConfiguration<Quality>
{
    public void Configure(EntityTypeBuilder<Quality> builder)
    {
        builder.ToTable(Constants.TABLE_NAME_APPROACH_PROCESS_QUALITY);
        // Define that enum field is saved as string
        builder.Property(q => q.Category)
            .HasConversion<string>();
        
        builder.HasData(
            new Quality
            {
                Name = "Reuse",
                Description = "",
                Category = QualityCategory.Requirement
            },
            new Quality
            {
                Name = "Maintainability",
                Description = "",
                Category = QualityCategory.Requirement
            },
            new Quality
            {
                Name = "Interoperability",
                Description = "",
                Category = QualityCategory.Requirement
            },
            new Quality
            {
                Name = "Self-containment",
                Description = "",
                Category = QualityCategory.Requirement
            },
            new Quality
            {
                Name = "Composability",
                Description = "",
                Category = QualityCategory.Requirement
            },
            new Quality
            {
                Name = "Coupling",
                Description = "",
                Category = QualityCategory.Metric
            },
            new Quality
            {
                Name = "Cohesion",
                Description = "",
                Category = QualityCategory.Metric
            },
            new Quality
            {
                Name = "Granularity",
                Description = "",
                Category = QualityCategory.Metric
            },
            new Quality
            {
                Name = "Number of services",
                Description = "",
                Category = QualityCategory.Metric
            });
    }
}
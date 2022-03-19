using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Repository.Models.Database;

namespace Repository.DatabaseConfigurations;

public class QualityEntityTypeConfiguration : IEntityTypeConfiguration<Quality>
{
    public void Configure(EntityTypeBuilder<Quality> builder)
    {
        builder.ToTable(Constants.TableNameApproachProcessQuality);
        // Define that enum field is saved as string
        builder.Property(q => q.Category)
            .HasConversion<string>();

        builder.HasData(
            new Quality
            {
                Name = "Reuse",
                Description =
                    "The ability of a service to participate in multiple service assemblies (compositions). Better reusability should provide better return of investment (ROI) and shorter development time.",
                Category = QualityCategory.Requirement
            },
            new Quality
            {
                Name = "Maintainability",
                Description =
                    "Services should ease the effort to modify their implementation, to identify root causes of failures, to verify changes, etc.",
                Category = QualityCategory.Requirement
            },
            new Quality
            {
                Name = "Interoperability",
                Description =
                    "The ability of a service to communicate and be invoked by other systems/services implemented in different programming languages.",
                Category = QualityCategory.Requirement
            },
            new Quality
            {
                Name = "Self-containment",
                Description =
                    " A service should be completely self-contained to be deployed as a single unit, without depending on other services.",
                Category = QualityCategory.Requirement
            },
            new Quality
            {
                Name = "Composability",
                Description =
                    "Services should be composable with one another to be reused and integrated as services that control other services or that provide functionalities to other services.",
                Category = QualityCategory.Requirement
            },
            new Quality
            {
                Name = "Coupling",
                Description =
                    "The dependencies among services should be minimized and the functionalities should be encapsulated to limit the impact of changes in one service to other service.",
                Category = QualityCategory.Metric
            },
            new Quality
            {
                Name = "Cohesion",
                Description =
                    "Cohesion is a measure of the strength of the relationships among programming entities (e.g., classes, functions, etc.) implementing a service and the functionality provided by the service.",
                Category = QualityCategory.Metric
            },
            new Quality
            {
                Name = "Granularity",
                Description =
                    "An adequate granularity is a primary concern of service identification approaches. It can be adjusted to the scope of the functionality offered by the service.",
                Category = QualityCategory.Metric
            },
            new Quality
            {
                Name = "Number of services",
                Description =
                    "Service identification approaches must not have too many small services or not enough services",
                Category = QualityCategory.Metric
            });
    }
}
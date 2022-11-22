using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Repository.Models.Database;

namespace Repository.DatabaseConfigurations;

public class QualitySublevelConfiguration : IEntityTypeConfiguration<QualitySublevel>
{
    public void Configure(EntityTypeBuilder<QualitySublevel> builder)
    {
        builder.ToTable(Constants.TableNameApproachProcessQualitySublevel);




        builder.HasData(
            new QualitySublevel
            {
                Name = "Availability",
                QualityName = "Reliability"
            },
            new QualitySublevel
            {
                Name = "Fault Tolerance",
                QualityName = "Reliability"
            },
            new QualitySublevel
            {
                Name = "Recoverability",
                QualityName = "Reliability"
            },
            new QualitySublevel
            {
                Name = "Interoperability",
                QualityName = "Compatibility"
            },
            new QualitySublevel
            {
                Name = "Co-Existence",
                QualityName = "Compatibility"
            },
            new QualitySublevel
            {
                Name = "Confidentiality",
                QualityName = "Security"
            },
            new QualitySublevel
            {
                Name = "Accountability",
                QualityName = "Security"
            },
            new QualitySublevel
            {
                Name = "Authenticity",
                QualityName = "Security"
            },
            new QualitySublevel
            {
                Name = "Integrity",
                QualityName = "Security"
            },
            new QualitySublevel
            {
                Name = "Time Behavior",
                QualityName = "Performance"
            },
            new QualitySublevel
            {
                Name = "Resource Utilization",
                QualityName = "Performance"
            },
            new QualitySublevel
            {
                Name = "Installability",
                QualityName = "Portability"
            },
            new QualitySublevel
            {
                Name = "Adaptability",
                QualityName = "Portability"
            },
            new QualitySublevel
            {
                Name = "Replaceability",
                QualityName = "Portability"
            },
            new QualitySublevel
            {
                Name = "Deployability",
                QualityName = "Portability"
            },
            new QualitySublevel
            {
                Name = "Agility",
                QualityName = "Portability"
            },
            new QualitySublevel
            {
                Name = "Modifiability",
                QualityName = "Maintainability"
            },
            new QualitySublevel
            {
                Name = "Modularity",
                QualityName = "Maintainability"
            },
            new QualitySublevel
            {
                Name = "Reusability",
                QualityName = "Maintainability"
            },
            new QualitySublevel
            {
                Name = "Testability",
                QualityName = "Maintainability"
            },
            new QualitySublevel
            {
                Name = "Analysability",
                QualityName = "Maintainability"
            },
            new QualitySublevel
            {
                Name = "Monitorability",
                QualityName = "Maintainability"
            },
            new QualitySublevel
            {
                Name = "Manageability",
                QualityName = "Maintainability"
            },
            new QualitySublevel
            {
                Name = "Understandability",
                QualityName = "Maintainability"
            },
            new QualitySublevel
            {
                Name = "Execution Cost",
                QualityName = "Business"
            },
            new QualitySublevel
            {
                Name = "Organizational Alignment",
                QualityName = "Business"
            }
        );
    }
}
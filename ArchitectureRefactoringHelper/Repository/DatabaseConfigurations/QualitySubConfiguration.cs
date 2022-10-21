using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Repository.Models.Database;

namespace Repository.DatabaseConfigurations;

public class QualitySubConfiguration : IEntityTypeConfiguration<QualitySub>
{
    public void Configure(EntityTypeBuilder<QualitySub> builder)
    {
        builder.ToTable(Constants.TableNameApproachProcessQualitySub);
        
        builder.HasData(
            new QualitySub
            {
                Name = "Availability",
                ParentName = "Reliability"
            },
            new QualitySub
            {
                Name = "Fault Tolerance",
                ParentName = "Reliability"
            },
            new QualitySub
            {
                Name = "Recoverability",
                ParentName = "Reliability"
            },
            new QualitySub
            {
                Name = "Interoperability",
                ParentName = "Compatibility"
            },
            new QualitySub
            {
                Name = "Co-Existencce",
                ParentName = "Compatibility"
            },
            new QualitySub
            {
                Name = "Confidentiality",
                ParentName = "Security"
            },
            new QualitySub
            {
                Name = "Accountability",
                ParentName = "Security"
            },
            new QualitySub
            {
                Name = "Authenticity",
                ParentName = "Security"
            },
            new QualitySub
            {
                Name = "Integrity",
                ParentName = "Security"
            },
            new QualitySub
            {
                Name = "Time Behavior",
                ParentName = "Performance"
            },
            new QualitySub
            {
                Name = "Resource Utilization",
                ParentName = "Performance"
            },
            new QualitySub
            {
                Name = "Capability",
                ParentName = "Performance"
            },
            new QualitySub
            {
                Name = "Installability",
                ParentName = "Portability"
            },
            new QualitySub
            {
                Name = "Adaptability",
                ParentName = "Portability"
            },
            new QualitySub
            {
                Name = "Replaceability",
                ParentName = "Portability"
            },
            new QualitySub
            {
                Name = "Deployability",
                ParentName = "Portability"
            },
            new QualitySub
            {
                Name = "Agility",
                ParentName = "Portability"
            },
            new QualitySub
            {
                Name = "Modifiability",
                ParentName = "Maintainability"
            },
            new QualitySub
            {
                Name = "Modularity",
                ParentName = "Maintainability"
            },
            new QualitySub
            {
                Name = "Reusability",
                ParentName = "Maintainability"
            },
            new QualitySub
            {
                Name = "Testability",
                ParentName = "Maintainability"
            },
            new QualitySub
            {
                Name = "Analysability",
                ParentName = "Maintainability"
            },
            new QualitySub
            {
                Name = "Monitorability",
                ParentName = "Maintainability"
            },
            new QualitySub
            {
                Name = "Manageability",
                ParentName = "Maintainability"
            },
            new QualitySub
            {
                Name = "Understandability",
                ParentName = "Maintainability"
            },
            new QualitySub
            {
                Name = "Execution Cost",
                ParentName = "Business"
            },
            new QualitySub
            {
                Name = "Organizational Alignment",
                ParentName = "Business"
            }
        );


    }
}
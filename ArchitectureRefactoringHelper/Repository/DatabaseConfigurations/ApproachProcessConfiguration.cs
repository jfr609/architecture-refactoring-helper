using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Repository.Models.Database;

namespace Repository.DatabaseConfigurations;

public class ApproachProcessConfiguration : IEntityTypeConfiguration<ApproachProcess>
{
    public void Configure(EntityTypeBuilder<ApproachProcess> builder)
    {
        // Define Join Table for ApproachProcess and Quality
        builder.HasMany(left => left.Qualities)
            .WithMany(right => right.ApproachProcesses)
            .UsingEntity(join => join.ToTable(Constants.JoinTablePrefix + Constants.TableNameApproachProcessQuality));

        // Define Join Table for ApproachProcess and QualitySublevel
        builder.HasMany(left => left.QualitySublevels)
            .WithMany(right => right.ApproachProcesses)
            .UsingEntity(join => join.ToTable(Constants.JoinTablePrefix + Constants.TableNameApproachProcessQualitySublevel));

        // Define Join Table for ApproachProcess and Direction
        builder.HasMany(left => left.Directions)
            .WithMany(right => right.ApproachProcesses)
            .UsingEntity(join => join.ToTable(Constants.JoinTablePrefix + Constants.TableNameApproachProcessDirection));

        // Define Join Table for ApproachProcess and AutomationLevel
        builder.HasMany(left => left.AutomationLevels)
            .WithMany(right => right.ApproachProcesses)
            .UsingEntity(join =>
                join.ToTable(Constants.JoinTablePrefix + Constants.TableNameApproachProcessAutomationLevel));

        // Define Join Table for ApproachProcess and AnalysisType
        builder.HasMany(left => left.AnalysisTypes)
            .WithMany(right => right.ApproachProcesses)
            .UsingEntity(join =>
                join.ToTable(Constants.JoinTablePrefix + Constants.TableNameApproachProcessAnalysisType));

        // Define Join Table for ApproachProcess and Technique
        builder.HasMany(left => left.Techniques)
            .WithMany(right => right.ApproachProcesses)
            .UsingEntity(join => join.ToTable(Constants.JoinTablePrefix + Constants.TableNameApproachProcessTechnique));

        // Define Join Table for ApproachProcess and Process Strategy
        builder.HasMany(left => left.ProcessStrategies)
            .WithMany(right => right.ApproachProcesses)
            .UsingEntity(join => join.ToTable(Constants.JoinTablePrefix + Constants.TableNameApproachProcessStrategy));

        // Define Join Table for ApproachProcess and Atomar Unit
        builder.HasMany(left => left.AtomarUnits)
            .WithMany(right => right.ApproachProcesses)
            .UsingEntity(join => join.ToTable(Constants.JoinTablePrefix + Constants.TableNameApproachAtomarUnit));
    }
}
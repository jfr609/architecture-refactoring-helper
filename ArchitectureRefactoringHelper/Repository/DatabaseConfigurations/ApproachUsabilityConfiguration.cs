using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Repository.Models.Database;

namespace Repository.DatabaseConfigurations;

public class ApproachUsabilityConfiguration : IEntityTypeConfiguration<ApproachUsability>
{
    public void Configure(EntityTypeBuilder<ApproachUsability> builder)
    {
        // Define Join Table for ApproachUsability and Tools
        builder.HasMany(left => left.Tools)
            .WithMany(right => right.ApproachUsabilities)
            .UsingEntity(join => join.ToTable(Constants.JoinTablePrefix + Constants.TableNameApproachUsabilityTool));

        builder.HasOne(e => e.AccuracyPrecision)
            .WithMany(e => e.ApproachUsabilities)
            .OnDelete(DeleteBehavior.SetNull);

        builder.HasOne(e => e.ResultsQuality)
            .WithMany(e => e.ApproachUsabilities)
            .OnDelete(DeleteBehavior.SetNull);

        builder.HasOne(e => e.ToolSupport)
            .WithMany(e => e.ApproachUsabilities)
            .OnDelete(DeleteBehavior.SetNull);

        builder.HasOne(e => e.ValidationMethod)
            .WithMany(e => e.ApproachUsabilities)
            .OnDelete(DeleteBehavior.SetNull);
    }
}
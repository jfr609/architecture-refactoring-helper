using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Repository.Models.Database;

namespace Repository.DatabaseConfigurations;

public class ScenarioConfiguration : IEntityTypeConfiguration<Scenario>
{
    public void Configure(EntityTypeBuilder<Scenario> builder)
    {
        builder.ToTable(Constants.TableNameProjectScenario);
        // Define that enum field is saved as string
        builder.Property(q => q.Difficulty)
            .HasConversion<string>();
        builder.Property(q => q.Importance)
            .HasConversion<string>();
        
        // To each Scenario multiple Qualities can be assigned
        builder
        .HasMany(sc => sc.Qualities)
        .WithMany(qu => qu.Scenarios);

        // To each Scenario multiple QualitySublevels can be assigned
        builder
        .HasMany(sc => sc.QualitySublevels)
        .WithMany(qu => qu.Scenarios);


    }
}

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Repository.Models.Database;

namespace Repository.DatabaseConfigurations;

public class ProjectDescriptionConfiguration : IEntityTypeConfiguration<ProjectDescription>
{
    public void Configure(EntityTypeBuilder<ProjectDescription> builder)
    {
        builder.ToTable(Constants.TableNameProjectDescription);

      /*builder.Property(q => q.Languages)
            .HasConversion<string>();

        builder
        .HasMany(sc => sc.Languages);*/
        
    }
}
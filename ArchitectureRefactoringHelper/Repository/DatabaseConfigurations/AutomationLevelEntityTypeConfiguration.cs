using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Repository.Models;

namespace Repository.DatabaseConfigurations;

public class AutomationLevelEntityTypeConfiguration : IEntityTypeConfiguration<AutomationLevel>
{
    public void Configure(EntityTypeBuilder<AutomationLevel> builder)
    {
        builder.ToTable(Constants.TABLE_NAME_APPROACH_PROCESS_AUTOMATIONLEVEL);
        
        builder.HasData(
            new AutomationLevel
            {
                Name = "Automatic",
                Description = ""
            },
            new AutomationLevel
            {
                Name = "Semi-automatic",
                Description = ""
            },
            new AutomationLevel
            {
                Name = "Manual",
                Description = ""
            });
    }
}
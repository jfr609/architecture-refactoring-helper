using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Repository.Models.Database;

namespace Repository.DatabaseConfigurations;

public class AutomationLevelEntityTypeConfiguration : IEntityTypeConfiguration<AutomationLevel>
{
    public void Configure(EntityTypeBuilder<AutomationLevel> builder)
    {
        builder.ToTable(Constants.TableNameApproachProcessAutomationLevel);

        builder.HasData(
            new AutomationLevel
            {
                Name = "Automatic",
                Description =
                    "Automatic approaches do not need any human intervention during the identification process."
            },
            new AutomationLevel
            {
                Name = "Semi-automatic",
                Description = "Semi-automatic approaches need human experts to perform some of the tasks."
            },
            new AutomationLevel
            {
                Name = "Manual",
                Description = "Manual approaches depend entirely on human experts."
            });
    }
}
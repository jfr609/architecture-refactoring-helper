using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Repository.Models.Database;

namespace Repository.DatabaseConfigurations;

public class AutomationLevelConfiguration : IEntityTypeConfiguration<AutomationLevel>
{
    public void Configure(EntityTypeBuilder<AutomationLevel> builder)
    {
        builder.ToTable(Constants.TableNameApproachProcessAutomationLevel);

        builder.HasData(
            new AutomationLevel
            {
                Name = "Automatic",
                Description =
                    "An automatic approach needs only minimal human intervention in the refactoring process."
            },
            new AutomationLevel
            {
                Name = "Semi-automatic",
                Description = "An semi-automatic approach needs human expertise in the refactoring process, which is partly automated."
            },
            new AutomationLevel
            {
                Name = "Manual",
                Description = "A manual approach relies entirely on human expertise."
            }
        );
    }
}
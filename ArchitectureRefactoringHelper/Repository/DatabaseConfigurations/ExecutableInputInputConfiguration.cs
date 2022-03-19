using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Repository.Models.Database;

namespace Repository.DatabaseConfigurations;

public class ExecutableInputInputConfiguration : IEntityTypeConfiguration<ExecutableInput>
{
    public void Configure(EntityTypeBuilder<ExecutableInput> builder)
    {
        builder.ToTable(Constants.TableNameApproachInputExecutable);
        builder.HasKey(e => new { e.Name, e.Language });
        
        builder.HasData(
            new ExecutableInput
            {
                Name = "Source code",
                Language = "No specification",
                Description = ""
            },
            new ExecutableInput
            {
                Name = "Database file",
                Language = "No specification",
                Description = ""
            },
            new ExecutableInput
            {
                Name = "Test cases",
                Language = "No specification",
                Description = ""
            });
    }
}
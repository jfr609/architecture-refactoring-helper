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
                Description = "Source code written in an arbitrary programming language is required as input."
            },
            new ExecutableInput
            {
                Name = "Database file",
                Language = "No specification",
                Description = "The database schema or contents are required as input."
            },
            new ExecutableInput
            {
                Name = "Test cases",
                Language = "No specification",
                Description = "Test cases of the application are required as input."
            }
        );
    }
}
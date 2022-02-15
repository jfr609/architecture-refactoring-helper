using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Repository.Models;

namespace Repository.DatabaseConfigurations;

public class ExecutableInputInputEntityTypeConfiguration : IEntityTypeConfiguration<ExecutableInput>
{
    public void Configure(EntityTypeBuilder<ExecutableInput> builder)
    {
        builder.ToTable(Constants.TABLE_NAME_APPROACH_INPUT_EXECUTABLE);
        builder.HasKey(e => new { e.Name, e.Language });
        
        builder.HasData(
            new ExecutableInput
            {
                Name = "Source code",
                Language = "NA",
                Description = ""
            },
            new ExecutableInput
            {
                Name = "Database file",
                Language = "NA",
                Description = ""
            },
            new ExecutableInput
            {
                Name = "Test cases",
                Language = "NA",
                Description = ""
            });
    }
}
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Repository.Models.Database;

namespace Repository.DatabaseConfigurations;

public class ValidationMethodEntityTypeConfiguration : IEntityTypeConfiguration<ValidationMethod>
{
    public void Configure(EntityTypeBuilder<ValidationMethod> builder)
    {
        builder.ToTable(Constants.TABLE_NAME_APPROACH_USABILITY_VALIDATIONMETHOD);
        
        builder.HasData(
            new ValidationMethod
            {
                Name = "Experiment",
                Description = ""
            },
            new ValidationMethod
            {
                Name = "Industry",
                Description = ""
            },
            new ValidationMethod
            {
                Name = "Case study",
                Description = ""
            },
            new ValidationMethod
            {
                Name = "No validation",
                Description = ""
            });
    }
}
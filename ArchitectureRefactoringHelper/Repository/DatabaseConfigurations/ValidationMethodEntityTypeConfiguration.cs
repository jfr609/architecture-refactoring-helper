using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Repository.Models.Database;

namespace Repository.DatabaseConfigurations;

public class ValidationMethodEntityTypeConfiguration : IEntityTypeConfiguration<ValidationMethod>
{
    public void Configure(EntityTypeBuilder<ValidationMethod> builder)
    {
        builder.ToTable(Constants.TableNameApproachUsabilityValidationMethod);

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
                Name = Constants.AttributeDefaultNoValidation,
                Description = ""
            });
    }
}
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Repository.Models.Database;

namespace Repository.DatabaseConfigurations;

public class ValidationMethodConfiguration : IEntityTypeConfiguration<ValidationMethod>
{
    public void Configure(EntityTypeBuilder<ValidationMethod> builder)
    {
        builder.ToTable(Constants.TableNameApproachUsabilityValidationMethod);

        builder.HasData(
            new ValidationMethod
            {
                Name = "Experiment",
                Description = "The approach was applied to and tested on one or more (small) experimental applications."
            },
            new ValidationMethod
            {
                Name = "Industry",
                Description = "The approach was applied to and tested on a industry-scale system."
            },
            new ValidationMethod
            {
                Name = "Case study",
                Description = "The approach was applied in a real production environment which typically involves external participants."
            },
            new ValidationMethod
            {
                Name = Constants.AttributeDefaultNoValidation,
                Description = "The approach documents no validation."
            }
        );
    }
}
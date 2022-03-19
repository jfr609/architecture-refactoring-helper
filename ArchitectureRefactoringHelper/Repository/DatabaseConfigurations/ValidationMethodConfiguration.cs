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
                Description = "The approach was applied to and tested on a (small) experimental system."
            },
            new ValidationMethod
            {
                Name = "Industry",
                Description = "The approach was applied to and tested on a real industrial system."
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
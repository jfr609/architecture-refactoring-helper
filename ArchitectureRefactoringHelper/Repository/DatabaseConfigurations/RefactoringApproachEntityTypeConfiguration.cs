using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Repository.Models;

namespace Repository.DatabaseConfigurations;

public class RefactoringApproachEntityTypeConfiguration : IEntityTypeConfiguration<RefactoringApproach>
{
    public void Configure(EntityTypeBuilder<RefactoringApproach> builder)
    {
        builder.ToTable(Constants.TABLE_NAME_APPROACH + "es");
    }
}
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Repository.Models.Database;

namespace Repository.DatabaseConfigurations;

public class AnalysisTypeEntityTypeConfiguration : IEntityTypeConfiguration<AnalysisType>
{
    public void Configure(EntityTypeBuilder<AnalysisType> builder)
    {
        builder.ToTable(Constants.TableNameApproachProcessAnalysisType);

        builder.HasData(
            new AnalysisType
            {
                Name = "Static",
                Description = ""
            },
            new AnalysisType
            {
                Name = "Dynamic",
                Description = ""
            },
            new AnalysisType
            {
                Name = "Lexical",
                Description = ""
            },
            new AnalysisType
            {
                Name = "Historic",
                Description = ""
            });
    }
}
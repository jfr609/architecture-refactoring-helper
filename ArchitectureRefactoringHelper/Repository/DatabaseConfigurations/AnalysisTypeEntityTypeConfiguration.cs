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
                Description =
                    "Static analysis is performed without executing a software system. Dependencies between classes are potential relationships, like method calls and access attributes. These dependencies are analyzed to identify strongly connected classes, for example, to identify services."
            },
            new AnalysisType
            {
                Name = "Dynamic",
                Description =
                    "Dynamic analysis is performed by examining the software system at run time. Dependencies between software elements (e.g., class instantiations and accesses, function calls, relationships between database tables, etc.) are collected during the program execution. The execution is performed based on a set of cases that covers the system functionalities, called execution scenarios"
            },
            new AnalysisType
            {
                Name = "Lexical",
                Description =
                    "Lexical analysis techniques suppose that the similarity between the classes should be taken into account during service identification process. This analysis plays the main role in approaches that used features location and textual similarity techniques."
            },
            new AnalysisType
            {
                Name = "Historic",
                Description = ""
            });
    }
}
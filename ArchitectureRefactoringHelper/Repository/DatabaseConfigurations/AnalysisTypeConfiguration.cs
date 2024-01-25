using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Repository.Models.Database;

namespace Repository.DatabaseConfigurations;

public class AnalysisTypeConfiguration : IEntityTypeConfiguration<AnalysisType>
{
    public void Configure(EntityTypeBuilder<AnalysisType> builder)
    {
        builder.ToTable(Constants.TableNameApproachProcessAnalysisType);

        builder.HasData(
            new AnalysisType
            {
                Name = "Static",
                Description =
                    "Static analysis is performed without executing an application. Commonly it is performed on source code, but can also involve interface descriptions or version control system data. The analysis involves, e.g., dependencies between classes, class attributes, or method calls. These dependencies indicate strongly connected classes that can be clustered for a single service."
            },
            new AnalysisType
            {
                Name = "Dynamic",
                Description =
                    "Dynamic analysis is performed by examining the application at run time. Dependencies between software elements (e.g., class instantiations and accesses, function calls, relationships between database tables, etc.) are collected. To this end, a set of use cases or scenarios has to be performed that reflect the system's functionalities."
            },
            new AnalysisType
            {
                Name = "Lexical",
                Description =
                    "Lexical analysis techniques suppose that textual similarities between identifiers of classes, methods, or interfaces help in the service identification process."
            },
            new AnalysisType
            {
                Name = "Historic",
                Description = "Historic analysis techniques leverage, e.g, the history data of a version control system to identify cohesive source code structures based on authors, change frequency, and correlation of changes."
            });
    }
}
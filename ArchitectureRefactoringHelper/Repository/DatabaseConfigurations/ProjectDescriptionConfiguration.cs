using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Repository.Models.Database;

namespace Repository.DatabaseConfigurations;

public class ProjectDescriptionConfiguration : IEntityTypeConfiguration<ProjectDescription>
{
    public void Configure(EntityTypeBuilder<ProjectDescription> builder)
    {
        builder.ToTable(Constants.TableNameProjectDescription);

        builder.HasData(
            new ProjectDescription
            {
                ProjectDescriptionId = 1,
                Systemname = "System Name",
                Ownership = "Ownership",
                Creationdate = "15.01.2021",
                Systemsize = "System Size",
                Hosting = "Hosting",
                Teams = "Teams",
                Developers = "Developers",
                Processmodel = "Process Model",
                Architecturepattern = "Architecture Pattern",
                Languages = "Languages",
                Persistence = "Persistence",
                Purpose = "Purpose",
                Functionality = "Functionality",
                Designdiagrams = "Design Diagrams"
                
                
            }
        );
    }
}
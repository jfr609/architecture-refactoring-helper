using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Repository.Models.Database;

namespace Repository.DatabaseConfigurations;

public class ModelArtifactInputConfiguration : IEntityTypeConfiguration<ModelArtifactInput>
{
    public void Configure(EntityTypeBuilder<ModelArtifactInput> builder)
    {
        builder.ToTable(Constants.TableNameApproachInputModelArtifact);

        builder.HasData(
            new ModelArtifactInput
            {
                Name = "Business process model",
                Description =
                    "Business Process Models (BPMs) are data-driven visual representations of business processes. They contain sets of activities and tasks that accomplish an organizational goal."
            },
            new ModelArtifactInput
            {
                Name = "Use case model",
                Description =
                    "Use case diagrams are behavioral diagrams and visualize the externally visible interaction of actors with the application. They relate system and actors to each other through use cases."
            },
            new ModelArtifactInput
            {
                Name = "Activity diagram",
                Description = "Activity diagrams visually present a series of actions or a control flow in an application."
            },
            new ModelArtifactInput
            {
                Name = "Data flow diagram",
                Description =
                    "Data Flow Diagrams (DFDs) are graphical representations of functional dependencies between business functions or processes, based on the analysis of data flows."
            },
            new ModelArtifactInput
            {
                Name = "State machine diagram",
                Description =
                    "State Machine Diagrams (SMDs) shows a dynamic view of a system and describe the states that entities can enter during their lifetimes."
            }
        );
    }
}
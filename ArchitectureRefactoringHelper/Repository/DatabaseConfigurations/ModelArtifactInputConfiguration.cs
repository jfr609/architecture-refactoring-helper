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
                    "Business Process Models (BPMs) describe sets of activities and tasks that accomplish an organizational goal"
            },
            new ModelArtifactInput
            {
                Name = "Use case model",
                Description =
                    "Use case diagrams are behavioral diagrams and visualize the externally visible interaction of actors with the system under development. The diagram consists of the system, associated use cases and actors and relates them to each other."
            },
            new ModelArtifactInput
            {
                Name = "Activity diagram",
                Description = "Activity diagrams visually presents a series of actions or flow of control in a system."
            },
            new ModelArtifactInput
            {
                Name = "Data flow diagram",
                Description =
                    "Data Flow Diagrams (DFDs) are graphical representations of functional dependencies, based on the analysis of data flows, between business functions or processes"
            },
            new ModelArtifactInput
            {
                Name = "State machine diagram",
                Description =
                    "State Machine Diagrams (SMDs) shows a dynamic view of a system and describe the different states that entities can have during their lifetimes"
            }
        );
    }
}
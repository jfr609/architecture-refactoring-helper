using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Repository.Models.Database;

namespace Repository.DatabaseConfigurations;

public class RefactoringApproachConfiguration : IEntityTypeConfiguration<RefactoringApproach>
{
    public void Configure(EntityTypeBuilder<RefactoringApproach> builder)
    {
        builder.HasIndex(e => e.Identifier)
            .IsUnique();

        // Define Join Table for RefactoringApproach and ApproachOutput
        builder.HasMany(left => left.ApproachOutputs)
            .WithMany(right => right.RefactoringApproaches)
            .UsingEntity(join => join.ToTable(Constants.JoinTablePrefix + Constants.TableNameApproachOutput));

        // Define Join Table for RefactoringApproach and DomainArtifactInput
        builder.HasMany(left => left.DomainArtifactInputs)
            .WithMany(right => right.RefactoringApproaches)
            .UsingEntity(join =>
                join.ToTable(Constants.JoinTablePrefix + Constants.TableNameApproachInputDomainArtifact));

        // Define Join Table for RefactoringApproach and RuntimeArtifactInput
        builder.HasMany(left => left.RuntimeArtifactInputs)
            .WithMany(right => right.RefactoringApproaches)
            .UsingEntity(join =>
                join.ToTable(Constants.JoinTablePrefix + Constants.TableNameApproachInputRuntimeArtifact));

        // Define Join Table for RefactoringApproach and ModelArtifactInput
        builder.HasMany(left => left.ModelArtifactInputs)
            .WithMany(right => right.RefactoringApproaches)
            .UsingEntity(
                join => join.ToTable(Constants.JoinTablePrefix + Constants.TableNameApproachInputModelArtifact));

        // Define Join Table for RefactoringApproach and ExecutableInput
        builder.HasMany(left => left.ExecutableInputs)
            .WithMany(right => right.RefactoringApproaches)
            .UsingEntity(join => join.ToTable(Constants.JoinTablePrefix + Constants.TableNameApproachInputExecutable));
    }
}
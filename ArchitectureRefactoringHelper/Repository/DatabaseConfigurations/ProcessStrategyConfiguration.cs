using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Repository.Models.Database;

namespace Repository.DatabaseConfigurations;

public class ProcessStrategyConfiguration : IEntityTypeConfiguration<ProcessStrategy>
{
    public void Configure(EntityTypeBuilder<ProcessStrategy> builder)
    {
        builder.ToTable(Constants.TableNameApproachProcessStrategy);

        builder.HasData(
            new ProcessStrategy
            {
                Name = "Greenfield",
                Description =
                    "The Greenfield strategy aims for building an entirely new application or system without restrictions or dependencies on the legacy application."
            },
            new ProcessStrategy
            {
                Name = "Rewrite / Rebuild",
                Description =
                    "Rewriting or rebuilding an application eases the introduction of new technologies. Individual services can be implemented using, e.g., the most suitable programming language or database technology. They can resolve current technical limitations and thereby improve several qualities of the application."
            },
            new ProcessStrategy
            {
                Name = "Refactor",
                Description =
                    "The existing monolithic code base is split up adequately into smaller parts, eventually forming several microservices. In the process of a refactoring, the currently employed technologies like programming languages, libraries, or packages can be retained. Moving to new technologies is not a necessity and thus reduces the overall cost and effort, allowing to shorten the timeframe for the entire migration process."
            },
            new ProcessStrategy
            {
                Name = "Strangler",
                Description =
                    "The Strangler pattern suggests to iteratively replace parts or components of the system with new services in a resource-efficient and targeted manner. Existing functionalities will be implemented as services that are then attached to the existing system, while at the same time, this functionality in the legacy system is disabled. The process is completed when the newly emerged microservices application replaces the legacy system entirely."
            },
            new ProcessStrategy
            {
                Name = "Continuous Evolution",
                Description =
                    "The Continuous Evolution strategy aims at minimizing the efforts and maintaining the system in its current state as far as possible. Compared to the Refactor strategy, changes can be done in a more targeted manner, e.g., combined with the implementation of new features, or based on certain qualities that should be improved."
            },
            new ProcessStrategy
            {
                Name = "Extension",
                Description =
                    "This strategy aims for substantially extending the application's functionality in the course of a migration to microservices and is often combined with one of the other process strategies."
            });
    }
}
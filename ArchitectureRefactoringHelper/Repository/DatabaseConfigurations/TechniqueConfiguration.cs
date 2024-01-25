using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Repository.Models.Database;

namespace Repository.DatabaseConfigurations;

public class TechniqueConfiguration : IEntityTypeConfiguration<Technique>
{
    public void Configure(EntityTypeBuilder<Technique> builder)
    {
        builder.ToTable(Constants.TableNameApproachProcessTechnique);

        builder.HasData(
            new Technique
            {
                Name = "Wrapping / Black Box",
                Description =
                    "A Wrapping / Black Box technique is characterized by leaving an existing implementation unchanged, but wraps it by an additional service layer that exposes only the needed functionality."
            },
            new Technique
            {
                Name = "Genetic algorithm",
                Description =
                    "Genetic algorithms are defined as a meta-heuristic for solving optimization problems that is based on 'natural selection' that relies on the calculation of a fitness function to reach an optimal (or near-optimal) solution. However, the yielded optimization and service cut may not necessarily be architecturally relevant."
            },
            new Technique
            {
                Name = "Clustering",
                Description =
                    "Clustering is a technique of classifying and partitioning elements into clusters that share common properties. These clusters are built based on the internal homogeneity of their elements and the external separation between them. In the context of generating highly cohesive and loosely coupled services, clustering is an essential technique next to rule-based methods."
            },
            new Technique
            {
                Name = "Custom heuristics",
                Description =
                    "Custom heuristics comprise techniques that have been specifically developed for the decomposition task. They do not clearly identify as one of the other mentioned techniques."
            },
            new Technique
            {
                Name = "General guidelines",
                Description = "No specific technique is used. The approaches usually describes the decomposition on a higher level of abstraction by proposing best practices, lessons learned, or recommendations for service identification."
            },
            new Technique
            {
                Name = "Domain-Driven Design",
                Description =
                    "Domain-Driven Design (DDD) is a popular manual technique in the context of microservices identification. Its complexity and involvement of domain expertise makes an automation difficult."
            },
            new Technique
            {
                Name = "Data-flow driven",
                Description =
                    "Data-Flow driven techniques inspect the flow and processing of data throughout the application, e.g., by means of data flow diagrams."
            },
            new Technique
            {
                Name = "Graph-based",
                Description =
                    "Graph-based techniques are common in the context of static code analysis, e.g., to represent source code at a higher level of abstraction."
            },
            new Technique
            {
                Name = "Scenario analysis",
                Description =
                    "Scenario analysis is usually associated with a top-down direction and the utilization of, e.g., use-case models as input, but can also be used in conjunction with dynamic analysis techniques."
            }, new Technique
            {
                Name = "Execution-trace modeling",
                Description =
                    "Execution-trace modeling reflects the application's runtime behavior. It can require the collection of logs or execution traces, which sometimes requires instrumenting the application and/or performing certain scenarios or user interactions."
            }, new Technique
            {
                Name = "Performance modeling",
                Description =
                    "Performance modeling techniques aim to direct the decomposition of the applications by taking into account performance and scalability aspects."
            });
    }
}
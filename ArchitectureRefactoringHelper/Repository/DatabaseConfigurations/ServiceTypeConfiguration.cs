using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Repository.Models.Database;

namespace Repository.DatabaseConfigurations;

public class ServiceTypeConfiguration : IEntityTypeConfiguration<ServiceType>
{
    public void Configure(EntityTypeBuilder<ServiceType> builder)
    {
        builder.ToTable(Constants.TableNameApproachOutputServiceType);

        builder.HasData(
            new ServiceType
            {
                Name = "Business services",
                Description =
                    "Business services correspond to business processes or use cases and are services used by users. Examples of business services include flight booking services."
            },
            new ServiceType
            {
                Name = "Enterprise services",
                Description =
                    "Enterprise services are of finer granularity than business services. They implement generic business functionalities that can be reused across different applications. Examples of enterprise services include \"online payment\" and \"tax calculation\"."
            },
            new ServiceType
            {
                Name = "Application services",
                Description =
                    "Application services provide functionalities specific to one application. They exist to support reuse within one application. Examples of application-task services include quoting requests."
            },
            new ServiceType
            {
                Name = "Entity services",
                Description =
                    "Entity services provide access to and the management of the persistent data of legacy software systems. They support actions on data (CRUD) and may have side-effects like modification of shared data. Examples of entity services include management services for clients, and bank accounts."
            },
            new ServiceType
            {
                Name = "Utility services",
                Description =
                    "Utility services do not directly support business services but provide some cross-cutting functionalities required by domain-specific services. Examples of typical utility services include notification, logging, and authentication."
            },
            new ServiceType
            {
                Name = "Infrastructure services",
                Description =
                    "Infrastructure services allow users to deploy and run service oriented architecture systems. They include services for communication routing, protocol conversion, message processing and transformation. Examples of infrastructure services include publish–subscribe, message queues, and enterprise service buses (ESBs)."
            },
            new ServiceType
            {
                Name = "No specification",
                Description = ""
            });
    }
}
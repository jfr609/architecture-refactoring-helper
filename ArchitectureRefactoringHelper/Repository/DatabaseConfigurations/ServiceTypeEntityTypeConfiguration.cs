using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Repository.Models.Database;

namespace Repository.DatabaseConfigurations;

public class ServiceTypeEntityTypeConfiguration : IEntityTypeConfiguration<ServiceType>
{
    public void Configure(EntityTypeBuilder<ServiceType> builder)
    {
        builder.ToTable(Constants.TableNameApproachOutputServiceType);
        
        builder.HasData(
            new ServiceType
            {
                Name = "Business services",
                Description = ""
            },
            new ServiceType
            {
                Name = "Enterprise services",
                Description = ""
            },
            new ServiceType
            {
                Name = "Application services",
                Description = ""
            },
            new ServiceType
            {
                Name = "Entity services",
                Description = ""
            },
            new ServiceType
            {
                Name = "Utility services",
                Description = ""
            },
            new ServiceType
            {
                Name = "Infrastructure services",
                Description = ""
            },
            new ServiceType
            {
                Name = "No specification",
                Description = ""
            });
    }
}
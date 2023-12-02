using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Repository.Models.Database;


namespace Repository.DatabaseConfigurations;

public class StrategicGoalsConfiguration : IEntityTypeConfiguration<StrategicGoals>
{
    public void Configure(EntityTypeBuilder<StrategicGoals> builder)
    {
        builder.ToTable(Constants.TableNameStrategicGoals);

        /*builder.HasData(
            new StrategicGoals
            {
                StrategicGoalsId = 4,
                Method = "ok",
                Owner = "ok",
                Participants = "ok",
                Business_company_objectives = "ok",
                Organizational_objectives = "ok",
                Process_objectives = "ok"
            
                
            }
        );*/
    }
}
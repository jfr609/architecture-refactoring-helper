using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Repository.Migrations
{
    public partial class StrategicGoalsAdded : Migration
    {
        
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "StrategicGoals",
                columns: table => new
                {
                    StrategicGoalsId = table.Column<int>(type: "INTEGER", nullable: false),
                    Method = table.Column<string>(type: "TEXT", nullable: true),
                    Owner = table.Column<string>(type: "TEXT", nullable: true),
                    Participants = table.Column<string>(type: "TEXT", nullable: true)
                    //Business_company_objectives = table.Column<string>(type: "TEXT", nullable: true),
                    //Organizational_objectives = table.Column<string>(type: "TEXT", nullable: true),
                    //Process_objectives = table.Column<string>(type: "TEXT", nullable: true),

                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StrategicGoals", x => x.StrategicGoalsId);
                });
            
        }
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            
        }
    }
}
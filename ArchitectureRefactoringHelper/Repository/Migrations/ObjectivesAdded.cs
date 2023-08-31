using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Repository.Migrations
{
    public partial class ObjectivesAdded : Migration
    {
        
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Objectives",
                columns: table => new{
                    ObjectivesId = table.Column<int>(type: "INTEGER", nullable: false),
                    ObjectivesName = table.Column<string>(type: "TEXT", nullable: true),
                    ObjectivesGoalsType = table.Column<string>(type: "TEXT", nullable: true),
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Objectives", x => x.ObjectivesId);
                });
            
        }
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            
        }
    }
}

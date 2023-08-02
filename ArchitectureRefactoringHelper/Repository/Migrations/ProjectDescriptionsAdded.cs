using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Repository.Migrations
{
    public partial class ProjectDescriptionsAdded : Migration
    {
        
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ProjectDescription",
                columns: table => new
                {
                    ProjectDescriptionId = table.Column<int>(type: "INTEGER", nullable: false),
                    Systemname = table.Column<string>(type: "INTEGER", nullable: false),
                    Ownership = table.Column<string>(type: "TEXT", nullable: true),
                    Creation_date = table.Column<string>(type: "TEXT", nullable: true),
                    Systemsize_LOC = table.Column<string>(type: "INTEGER", nullable: true),
                    Hosting_model = table.Column<string>(type: "TEXT", nullable: true),
                    Number_of_Teams = table.Column<string>(type: "INTEGER", nullable: true),
                    Number_of_Developers = table.Column<string>(type: "INTEGER", nullable: true),
                    Processmodel = table.Column<string>(type: "TEXT", nullable: true),
                    Architecturepattern = table.Column<string>(type: "TEXT", nullable: true),
                    Languages = table.Column<string>(type: "TEXT", nullable: true),
                    Data_Persistence = table.Column<string>(type: "TEXT", nullable: true),
                    Purpose = table.Column<string>(type: "TEXT", nullable: true),
                    Functionality = table.Column<string>(type: "TEXT", nullable: true),
                    Designdiagrams = table.Column<string>(type: "TEXT", nullable: true)

                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectDescription", x => x.ProjectDescriptionId);
                });
            
        }
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            
        }
    }
}

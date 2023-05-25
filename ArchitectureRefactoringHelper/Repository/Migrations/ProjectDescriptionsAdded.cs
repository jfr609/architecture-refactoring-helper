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
                     ProjectDescriptionId = table.Column<int>(type: "TEXT", nullable: false),
                    Systemname = table.Column<string>(type: "INTEGER", nullable: false),
                    Ownership = table.Column<string>(type: "TEXT", nullable: true),
                    Creationdate = table.Column<string>(type: "DATE", nullable: true),
                    Systemsize = table.Column<string>(type: "TEXT", nullable: true),
                    Hosting = table.Column<string>(type: "TEXT", nullable: true),
                    Teams = table.Column<string>(type: "TEXT", nullable: true),
                    Developers = table.Column<string>(type: "TEXT", nullable: true),
                    Processmodel = table.Column<string>(type: "TEXT", nullable: true),
                    Architecturepattern = table.Column<string>(type: "TEXT", nullable: true),
                    Languages = table.Column<string>(type: "TEXT", nullable: true),
                    Persistence = table.Column<string>(type: "TEXT", nullable: true),
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

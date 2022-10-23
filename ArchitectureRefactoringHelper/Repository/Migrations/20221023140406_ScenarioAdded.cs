using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Repository.Migrations
{
    public partial class ScenarioAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ScenarioName",
                table: "Approach.Process.Quality",
                type: "TEXT",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Approach.Scenario",
                columns: table => new
                {
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: true),
                    Difficulty = table.Column<int>(type: "INTEGER", nullable: true),
                    Importance = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Approach.Scenario", x => x.Name);
                });

            migrationBuilder.CreateTable(
                name: "JoinTable.Approach.Scenario",
                columns: table => new
                {
                    ApproachProcessesApproachProcessId = table.Column<int>(type: "INTEGER", nullable: false),
                    ScenariosName = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JoinTable.Approach.Scenario", x => new { x.ApproachProcessesApproachProcessId, x.ScenariosName });
                    table.ForeignKey(
                        name: "FK_JoinTable.Approach.Scenario_Approach.Process_ApproachProcessesApproachProcessId",
                        column: x => x.ApproachProcessesApproachProcessId,
                        principalTable: "Approach.Process",
                        principalColumn: "ApproachProcessId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_JoinTable.Approach.Scenario_Approach.Scenario_ScenariosName",
                        column: x => x.ScenariosName,
                        principalTable: "Approach.Scenario",
                        principalColumn: "Name",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Approach.Process.Quality_ScenarioName",
                table: "Approach.Process.Quality",
                column: "ScenarioName");

            migrationBuilder.CreateIndex(
                name: "IX_JoinTable.Approach.Scenario_ScenariosName",
                table: "JoinTable.Approach.Scenario",
                column: "ScenariosName");

            migrationBuilder.AddForeignKey(
                name: "FK_Approach.Process.Quality_Approach.Scenario_ScenarioName",
                table: "Approach.Process.Quality",
                column: "ScenarioName",
                principalTable: "Approach.Scenario",
                principalColumn: "Name");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Approach.Process.Quality_Approach.Scenario_ScenarioName",
                table: "Approach.Process.Quality");

            migrationBuilder.DropTable(
                name: "JoinTable.Approach.Scenario");

            migrationBuilder.DropTable(
                name: "Approach.Scenario");

            migrationBuilder.DropIndex(
                name: "IX_Approach.Process.Quality_ScenarioName",
                table: "Approach.Process.Quality");

            migrationBuilder.DropColumn(
                name: "ScenarioName",
                table: "Approach.Process.Quality");
        }
    }
}

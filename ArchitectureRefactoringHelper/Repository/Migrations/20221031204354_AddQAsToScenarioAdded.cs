using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Repository.Migrations
{
    public partial class AddQAsToScenarioAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Approach.Process.Quality_.Scenario_ScenarioId",
                table: "Approach.Process.Quality");

            migrationBuilder.DropIndex(
                name: "IX_Approach.Process.Quality_ScenarioId",
                table: "Approach.Process.Quality");

            migrationBuilder.DeleteData(
                table: "Approach.Process.QualitySublevel",
                keyColumn: "Name",
                keyValue: "Capability");

            migrationBuilder.DropColumn(
                name: "ScenarioId",
                table: "Approach.Process.Quality");

            migrationBuilder.CreateTable(
                name: "QualityScenario",
                columns: table => new
                {
                    QualitiesName = table.Column<string>(type: "TEXT", nullable: false),
                    ScenariosScenarioId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QualityScenario", x => new { x.QualitiesName, x.ScenariosScenarioId });
                    table.ForeignKey(
                        name: "FK_QualityScenario_.Scenario_ScenariosScenarioId",
                        column: x => x.ScenariosScenarioId,
                        principalTable: ".Scenario",
                        principalColumn: "ScenarioId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_QualityScenario_Approach.Process.Quality_QualitiesName",
                        column: x => x.QualitiesName,
                        principalTable: "Approach.Process.Quality",
                        principalColumn: "Name",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "QualitySublevelScenario",
                columns: table => new
                {
                    QualitySublevelsName = table.Column<string>(type: "TEXT", nullable: false),
                    ScenariosScenarioId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QualitySublevelScenario", x => new { x.QualitySublevelsName, x.ScenariosScenarioId });
                    table.ForeignKey(
                        name: "FK_QualitySublevelScenario_.Scenario_ScenariosScenarioId",
                        column: x => x.ScenariosScenarioId,
                        principalTable: ".Scenario",
                        principalColumn: "ScenarioId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_QualitySublevelScenario_Approach.Process.QualitySublevel_QualitySublevelsName",
                        column: x => x.QualitySublevelsName,
                        principalTable: "Approach.Process.QualitySublevel",
                        principalColumn: "Name",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_QualityScenario_ScenariosScenarioId",
                table: "QualityScenario",
                column: "ScenariosScenarioId");

            migrationBuilder.CreateIndex(
                name: "IX_QualitySublevelScenario_ScenariosScenarioId",
                table: "QualitySublevelScenario",
                column: "ScenariosScenarioId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "QualityScenario");

            migrationBuilder.DropTable(
                name: "QualitySublevelScenario");

            migrationBuilder.AddColumn<int>(
                name: "ScenarioId",
                table: "Approach.Process.Quality",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.InsertData(
                table: "Approach.Process.QualitySublevel",
                columns: new[] { "Name", "Description", "QualityName" },
                values: new object[] { "Capability", null, "Performance" });

            migrationBuilder.CreateIndex(
                name: "IX_Approach.Process.Quality_ScenarioId",
                table: "Approach.Process.Quality",
                column: "ScenarioId");

            migrationBuilder.AddForeignKey(
                name: "FK_Approach.Process.Quality_.Scenario_ScenarioId",
                table: "Approach.Process.Quality",
                column: "ScenarioId",
                principalTable: ".Scenario",
                principalColumn: "ScenarioId");
        }
    }
}

using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Repository.Migrations
{
    public partial class AddStrategyTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Approach.Process.Strategy",
                columns: table => new
                {
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Approach.Process.Strategy", x => x.Name);
                });

            migrationBuilder.CreateTable(
                name: "ApproachProcessProcessStrategy",
                columns: table => new
                {
                    ApproachProcessesApproachProcessId = table.Column<int>(type: "INTEGER", nullable: false),
                    ProcessStrategiesName = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ApproachProcessProcessStrategy", x => new { x.ApproachProcessesApproachProcessId, x.ProcessStrategiesName });
                    table.ForeignKey(
                        name: "FK_ApproachProcessProcessStrategy_Approach.Process_ApproachProcessesApproachProcessId",
                        column: x => x.ApproachProcessesApproachProcessId,
                        principalTable: "Approach.Process",
                        principalColumn: "ApproachProcessId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ApproachProcessProcessStrategy_Approach.Process.Strategy_ProcessStrategiesName",
                        column: x => x.ProcessStrategiesName,
                        principalTable: "Approach.Process.Strategy",
                        principalColumn: "Name",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ApproachProcessProcessStrategy_ProcessStrategiesName",
                table: "ApproachProcessProcessStrategy",
                column: "ProcessStrategiesName");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ApproachProcessProcessStrategy");

            migrationBuilder.DropTable(
                name: "Approach.Process.Strategy");
        }
    }
}

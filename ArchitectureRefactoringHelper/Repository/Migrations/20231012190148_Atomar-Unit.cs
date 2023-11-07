using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Repository.Migrations
{
    public partial class AtomarUnit : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Approach.Process.AtomarUnit",
                columns: table => new
                {
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Approach.Process.AtomarUnit", x => x.Name);
                });

            migrationBuilder.CreateTable(
                name: "ApproachProcessAtomarUnit",
                columns: table => new
                {
                    ApproachProcessesApproachProcessId = table.Column<int>(type: "INTEGER", nullable: false),
                    AtomarUnitsName = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ApproachProcessAtomarUnit", x => new { x.ApproachProcessesApproachProcessId, x.AtomarUnitsName });
                    table.ForeignKey(
                        name: "FK_ApproachProcessAtomarUnit_Approach.Process_ApproachProcessesApproachProcessId",
                        column: x => x.ApproachProcessesApproachProcessId,
                        principalTable: "Approach.Process",
                        principalColumn: "ApproachProcessId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ApproachProcessAtomarUnit_Approach.Process.AtomarUnit_AtomarUnitsName",
                        column: x => x.AtomarUnitsName,
                        principalTable: "Approach.Process.AtomarUnit",
                        principalColumn: "Name",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ApproachProcessAtomarUnit_AtomarUnitsName",
                table: "ApproachProcessAtomarUnit",
                column: "AtomarUnitsName");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ApproachProcessAtomarUnit");

            migrationBuilder.DropTable(
                name: "Approach.Process.AtomarUnit");
        }
    }
}

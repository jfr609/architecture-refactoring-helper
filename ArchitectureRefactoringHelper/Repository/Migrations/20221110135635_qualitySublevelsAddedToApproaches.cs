using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Repository.Migrations
{
    public partial class qualitySublevelsAddedToApproaches : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "JoinTable.Approach.Process.QualitySublevel",
                columns: table => new
                {
                    ApproachProcessesApproachProcessId = table.Column<int>(type: "INTEGER", nullable: false),
                    QualitySublevelsName = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JoinTable.Approach.Process.QualitySublevel", x => new { x.ApproachProcessesApproachProcessId, x.QualitySublevelsName });
                    table.ForeignKey(
                        name: "FK_JoinTable.Approach.Process.QualitySublevel_Approach.Process_ApproachProcessesApproachProcessId",
                        column: x => x.ApproachProcessesApproachProcessId,
                        principalTable: "Approach.Process",
                        principalColumn: "ApproachProcessId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_JoinTable.Approach.Process.QualitySublevel_Approach.Process.QualitySublevel_QualitySublevelsName",
                        column: x => x.QualitySublevelsName,
                        principalTable: "Approach.Process.QualitySublevel",
                        principalColumn: "Name",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_JoinTable.Approach.Process.QualitySublevel_QualitySublevelsName",
                table: "JoinTable.Approach.Process.QualitySublevel",
                column: "QualitySublevelsName");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "JoinTable.Approach.Process.QualitySublevel");
        }
    }
}

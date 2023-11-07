using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Repository.Migrations
{
    public partial class JoinTableApproachUsabilityTool : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "NoToolSupport",
                table: "Approach.Usability",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "JoinTable.Approach.Usability.Tool",
                columns: table => new
                {
                    ApproachUsabilitiesApproachUsabilityId = table.Column<int>(type: "INTEGER", nullable: false),
                    ToolsToolId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JoinTable.Approach.Usability.Tool", x => new { x.ApproachUsabilitiesApproachUsabilityId, x.ToolsToolId });
                    table.ForeignKey(
                        name: "FK_JoinTable.Approach.Usability.Tool_Approach.Usability_ApproachUsabilitiesApproachUsabilityId",
                        column: x => x.ApproachUsabilitiesApproachUsabilityId,
                        principalTable: "Approach.Usability",
                        principalColumn: "ApproachUsabilityId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_JoinTable.Approach.Usability.Tool_Tools_ToolsToolId",
                        column: x => x.ToolsToolId,
                        principalTable: "Tools",
                        principalColumn: "ToolId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_JoinTable.Approach.Usability.Tool_ToolsToolId",
                table: "JoinTable.Approach.Usability.Tool",
                column: "ToolsToolId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "JoinTable.Approach.Usability.Tool");

            migrationBuilder.DropColumn(
                name: "NoToolSupport",
                table: "Approach.Usability");
        }
    }
}

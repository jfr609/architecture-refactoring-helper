using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Repository.Migrations
{
    public partial class ToolAndToolTypeTables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Tool.Source",
                columns: table => new
                {
                    ToolSourceId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Title = table.Column<string>(type: "TEXT", nullable: false),
                    Link = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tool.Source", x => x.ToolSourceId);
                });

            migrationBuilder.CreateTable(
                name: "Tool.Type",
                columns: table => new
                {
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tool.Type", x => x.Name);
                });

            migrationBuilder.CreateTable(
                name: "Tools",
                columns: table => new
                {
                    ToolId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Identifier = table.Column<string>(type: "TEXT", nullable: false),
                    ToolSourceId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tools", x => x.ToolId);
                    table.ForeignKey(
                        name: "FK_Tools_Tool.Source_ToolSourceId",
                        column: x => x.ToolSourceId,
                        principalTable: "Tool.Source",
                        principalColumn: "ToolSourceId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "JoinTable.Tool.Type",
                columns: table => new
                {
                    ToolTypesName = table.Column<string>(type: "TEXT", nullable: false),
                    ToolsToolId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JoinTable.Tool.Type", x => new { x.ToolTypesName, x.ToolsToolId });
                    table.ForeignKey(
                        name: "FK_JoinTable.Tool.Type_Tool.Type_ToolTypesName",
                        column: x => x.ToolTypesName,
                        principalTable: "Tool.Type",
                        principalColumn: "Name",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_JoinTable.Tool.Type_Tools_ToolsToolId",
                        column: x => x.ToolsToolId,
                        principalTable: "Tools",
                        principalColumn: "ToolId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_JoinTable.Tool.Type_ToolsToolId",
                table: "JoinTable.Tool.Type",
                column: "ToolsToolId");

            migrationBuilder.CreateIndex(
                name: "IX_Tools_Identifier",
                table: "Tools",
                column: "Identifier",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Tools_ToolSourceId",
                table: "Tools",
                column: "ToolSourceId",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "JoinTable.Tool.Type");

            migrationBuilder.DropTable(
                name: "Tool.Type");

            migrationBuilder.DropTable(
                name: "Tools");

            migrationBuilder.DropTable(
                name: "Tool.Source");
        }
    }
}

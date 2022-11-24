using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Repository.Migrations
{
    public partial class ArchitecturalDesignsAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Approach.Process.QualitySublevel",
                keyColumn: "Name",
                keyValue: "Co-Existencce");

            migrationBuilder.CreateTable(
                name: "ArchitecturalDesign.Source",
                columns: table => new
                {
                    ArchitecturalDesignSourceId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: false),
                    Link = table.Column<string>(type: "TEXT", nullable: true),
                    Authors = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ArchitecturalDesign.Source", x => x.ArchitecturalDesignSourceId);
                });

            migrationBuilder.CreateTable(
                name: "ArchitecturalDesign",
                columns: table => new
                {
                    ArchitecturalDesignId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Identifier = table.Column<string>(type: "TEXT", nullable: false),
                    ArchitecturalDesignSourceId = table.Column<int>(type: "INTEGER", nullable: false),
                    Category = table.Column<int>(type: "INTEGER", nullable: false),
                    ApproachProcessId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ArchitecturalDesign", x => x.ArchitecturalDesignId);
                    table.ForeignKey(
                        name: "FK_ArchitecturalDesign_Approach.Process_ApproachProcessId",
                        column: x => x.ApproachProcessId,
                        principalTable: "Approach.Process",
                        principalColumn: "ApproachProcessId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ArchitecturalDesign_ArchitecturalDesign.Source_ArchitecturalDesignSourceId",
                        column: x => x.ArchitecturalDesignSourceId,
                        principalTable: "ArchitecturalDesign.Source",
                        principalColumn: "ArchitecturalDesignSourceId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Approach.Process.QualitySublevel",
                columns: new[] { "Name", "Description", "QualityName" },
                values: new object[] { "Co-Existence", null, "Compatibility" });

            migrationBuilder.CreateIndex(
                name: "IX_ArchitecturalDesign_ApproachProcessId",
                table: "ArchitecturalDesign",
                column: "ApproachProcessId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ArchitecturalDesign_ArchitecturalDesignSourceId",
                table: "ArchitecturalDesign",
                column: "ArchitecturalDesignSourceId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ArchitecturalDesign_Identifier",
                table: "ArchitecturalDesign",
                column: "Identifier",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ArchitecturalDesign");

            migrationBuilder.DropTable(
                name: "ArchitecturalDesign.Source");

            migrationBuilder.DeleteData(
                table: "Approach.Process.QualitySublevel",
                keyColumn: "Name",
                keyValue: "Co-Existence");

            migrationBuilder.InsertData(
                table: "Approach.Process.QualitySublevel",
                columns: new[] { "Name", "Description", "QualityName" },
                values: new object[] { "Co-Existencce", null, "Compatibility" });
        }
    }
}

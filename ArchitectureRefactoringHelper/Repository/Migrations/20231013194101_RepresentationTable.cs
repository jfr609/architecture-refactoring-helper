using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Repository.Migrations
{
    public partial class RepresentationTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Approach.Output.Representation",
                columns: table => new
                {
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Approach.Output.Representation", x => x.Name);
                });

            migrationBuilder.CreateTable(
                name: "RefactoringApproachRepresentation",
                columns: table => new
                {
                    RefactoringApproachesRefactoringApproachId = table.Column<int>(type: "INTEGER", nullable: false),
                    RepresentationOutputsName = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RefactoringApproachRepresentation", x => new { x.RefactoringApproachesRefactoringApproachId, x.RepresentationOutputsName });
                    table.ForeignKey(
                        name: "FK_RefactoringApproachRepresentation_Approach.Output.Representation_RepresentationOutputsName",
                        column: x => x.RepresentationOutputsName,
                        principalTable: "Approach.Output.Representation",
                        principalColumn: "Name",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RefactoringApproachRepresentation_Approaches_RefactoringApproachesRefactoringApproachId",
                        column: x => x.RefactoringApproachesRefactoringApproachId,
                        principalTable: "Approaches",
                        principalColumn: "RefactoringApproachId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_RefactoringApproachRepresentation_RepresentationOutputsName",
                table: "RefactoringApproachRepresentation",
                column: "RepresentationOutputsName");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RefactoringApproachRepresentation");

            migrationBuilder.DropTable(
                name: "Approach.Output.Representation");
        }
    }
}

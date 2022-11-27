using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Repository.Migrations
{
    public partial class authorsToSourcesChangedForArchitecturalDesign : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Link",
                table: "ArchitecturalDesign.Source",
                newName: "Links");

            migrationBuilder.RenameColumn(
                name: "Authors",
                table: "ArchitecturalDesign.Source",
                newName: "Sources");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Sources",
                table: "ArchitecturalDesign.Source",
                newName: "Authors");

            migrationBuilder.RenameColumn(
                name: "Links",
                table: "ArchitecturalDesign.Source",
                newName: "Link");
        }
    }
}

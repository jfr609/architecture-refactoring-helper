using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Repository.Migrations
{
    public partial class QualitySubAttrAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Approach.Process.QualitySub_Approach.Process.Quality_ParentName",
                table: "Approach.Process.QualitySub");

            migrationBuilder.DropIndex(
                name: "IX_Approach.Process.QualitySub_ParentName",
                table: "Approach.Process.QualitySub");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Approach.Process.QualitySub_ParentName",
                table: "Approach.Process.QualitySub",
                column: "ParentName");

            migrationBuilder.AddForeignKey(
                name: "FK_Approach.Process.QualitySub_Approach.Process.Quality_ParentName",
                table: "Approach.Process.QualitySub",
                column: "ParentName",
                principalTable: "Approach.Process.Quality",
                principalColumn: "Name",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

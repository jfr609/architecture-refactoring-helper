using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Repository.Migrations
{
    public partial class tradeOffsAndCalcMetrics : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "QualityName",
                table: "Approach.Process.Quality",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "QualitySublevelName",
                table: "Approach.Process.Quality",
                type: "TEXT",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Approach.Process.CalculationMetric",
                columns: table => new
                {
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: true),
                    QualityName = table.Column<string>(type: "TEXT", nullable: true),
                    QualitySublevelName = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Approach.Process.CalculationMetric", x => x.Name);
                    table.ForeignKey(
                        name: "FK_Approach.Process.CalculationMetric_Approach.Process.Quality_QualityName",
                        column: x => x.QualityName,
                        principalTable: "Approach.Process.Quality",
                        principalColumn: "Name");
                    table.ForeignKey(
                        name: "FK_Approach.Process.CalculationMetric_Approach.Process.QualitySublevel_QualitySublevelName",
                        column: x => x.QualitySublevelName,
                        principalTable: "Approach.Process.QualitySublevel",
                        principalColumn: "Name");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Approach.Process.Quality_QualityName",
                table: "Approach.Process.Quality",
                column: "QualityName");

            migrationBuilder.CreateIndex(
                name: "IX_Approach.Process.Quality_QualitySublevelName",
                table: "Approach.Process.Quality",
                column: "QualitySublevelName");

            migrationBuilder.CreateIndex(
                name: "IX_Approach.Process.CalculationMetric_QualityName",
                table: "Approach.Process.CalculationMetric",
                column: "QualityName");

            migrationBuilder.CreateIndex(
                name: "IX_Approach.Process.CalculationMetric_QualitySublevelName",
                table: "Approach.Process.CalculationMetric",
                column: "QualitySublevelName");

            migrationBuilder.AddForeignKey(
                name: "FK_Approach.Process.Quality_Approach.Process.Quality_QualityName",
                table: "Approach.Process.Quality",
                column: "QualityName",
                principalTable: "Approach.Process.Quality",
                principalColumn: "Name");

            migrationBuilder.AddForeignKey(
                name: "FK_Approach.Process.Quality_Approach.Process.QualitySublevel_QualitySublevelName",
                table: "Approach.Process.Quality",
                column: "QualitySublevelName",
                principalTable: "Approach.Process.QualitySublevel",
                principalColumn: "Name");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Approach.Process.Quality_Approach.Process.Quality_QualityName",
                table: "Approach.Process.Quality");

            migrationBuilder.DropForeignKey(
                name: "FK_Approach.Process.Quality_Approach.Process.QualitySublevel_QualitySublevelName",
                table: "Approach.Process.Quality");

            migrationBuilder.DropTable(
                name: "Approach.Process.CalculationMetric");

            migrationBuilder.DropIndex(
                name: "IX_Approach.Process.Quality_QualityName",
                table: "Approach.Process.Quality");

            migrationBuilder.DropIndex(
                name: "IX_Approach.Process.Quality_QualitySublevelName",
                table: "Approach.Process.Quality");

            migrationBuilder.DropColumn(
                name: "QualityName",
                table: "Approach.Process.Quality");

            migrationBuilder.DropColumn(
                name: "QualitySublevelName",
                table: "Approach.Process.Quality");
        }
    }
}

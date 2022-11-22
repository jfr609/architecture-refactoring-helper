using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Repository.Migrations
{
    public partial class changeToAttributesAndPropertiesForQualities : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Approach.Process.Quality",
                keyColumn: "Name",
                keyValue: "Autonomy",
                column: "Category",
                value: "SystemProperty");

            migrationBuilder.UpdateData(
                table: "Approach.Process.Quality",
                keyColumn: "Name",
                keyValue: "Business",
                column: "Category",
                value: "Attribute");

            migrationBuilder.UpdateData(
                table: "Approach.Process.Quality",
                keyColumn: "Name",
                keyValue: "Cohesion",
                column: "Category",
                value: "SystemProperty");

            migrationBuilder.UpdateData(
                table: "Approach.Process.Quality",
                keyColumn: "Name",
                keyValue: "Compatibility",
                column: "Category",
                value: "Attribute");

            migrationBuilder.UpdateData(
                table: "Approach.Process.Quality",
                keyColumn: "Name",
                keyValue: "Complexity",
                column: "Category",
                value: "SystemProperty");

            migrationBuilder.UpdateData(
                table: "Approach.Process.Quality",
                keyColumn: "Name",
                keyValue: "Coupling",
                column: "Category",
                value: "SystemProperty");

            migrationBuilder.UpdateData(
                table: "Approach.Process.Quality",
                keyColumn: "Name",
                keyValue: "Granularity",
                column: "Category",
                value: "SystemProperty");

            migrationBuilder.UpdateData(
                table: "Approach.Process.Quality",
                keyColumn: "Name",
                keyValue: "Independence",
                column: "Category",
                value: "Attribute");

            migrationBuilder.UpdateData(
                table: "Approach.Process.Quality",
                keyColumn: "Name",
                keyValue: "Isolation",
                column: "Category",
                value: "SystemProperty");

            migrationBuilder.UpdateData(
                table: "Approach.Process.Quality",
                keyColumn: "Name",
                keyValue: "Maintainability",
                column: "Category",
                value: "Attribute");

            migrationBuilder.UpdateData(
                table: "Approach.Process.Quality",
                keyColumn: "Name",
                keyValue: "Performance",
                column: "Category",
                value: "Attribute");

            migrationBuilder.UpdateData(
                table: "Approach.Process.Quality",
                keyColumn: "Name",
                keyValue: "Portability",
                column: "Category",
                value: "Attribute");

            migrationBuilder.UpdateData(
                table: "Approach.Process.Quality",
                keyColumn: "Name",
                keyValue: "Reliability",
                column: "Category",
                value: "Attribute");

            migrationBuilder.UpdateData(
                table: "Approach.Process.Quality",
                keyColumn: "Name",
                keyValue: "Scalability",
                column: "Category",
                value: "Attribute");

            migrationBuilder.UpdateData(
                table: "Approach.Process.Quality",
                keyColumn: "Name",
                keyValue: "Security",
                column: "Category",
                value: "Attribute");

            migrationBuilder.UpdateData(
                table: "Approach.Process.Quality",
                keyColumn: "Name",
                keyValue: "Technology Heterogeneity",
                column: "Category",
                value: "SystemProperty");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Approach.Process.Quality",
                keyColumn: "Name",
                keyValue: "Autonomy",
                column: "Category",
                value: "Metric");

            migrationBuilder.UpdateData(
                table: "Approach.Process.Quality",
                keyColumn: "Name",
                keyValue: "Business",
                column: "Category",
                value: "Requirement");

            migrationBuilder.UpdateData(
                table: "Approach.Process.Quality",
                keyColumn: "Name",
                keyValue: "Cohesion",
                column: "Category",
                value: "Metric");

            migrationBuilder.UpdateData(
                table: "Approach.Process.Quality",
                keyColumn: "Name",
                keyValue: "Compatibility",
                column: "Category",
                value: "Requirement");

            migrationBuilder.UpdateData(
                table: "Approach.Process.Quality",
                keyColumn: "Name",
                keyValue: "Complexity",
                column: "Category",
                value: "Metric");

            migrationBuilder.UpdateData(
                table: "Approach.Process.Quality",
                keyColumn: "Name",
                keyValue: "Coupling",
                column: "Category",
                value: "Metric");

            migrationBuilder.UpdateData(
                table: "Approach.Process.Quality",
                keyColumn: "Name",
                keyValue: "Granularity",
                column: "Category",
                value: "Metric");

            migrationBuilder.UpdateData(
                table: "Approach.Process.Quality",
                keyColumn: "Name",
                keyValue: "Independence",
                column: "Category",
                value: "Requirement");

            migrationBuilder.UpdateData(
                table: "Approach.Process.Quality",
                keyColumn: "Name",
                keyValue: "Isolation",
                column: "Category",
                value: "Metric");

            migrationBuilder.UpdateData(
                table: "Approach.Process.Quality",
                keyColumn: "Name",
                keyValue: "Maintainability",
                column: "Category",
                value: "Requirement");

            migrationBuilder.UpdateData(
                table: "Approach.Process.Quality",
                keyColumn: "Name",
                keyValue: "Performance",
                column: "Category",
                value: "Requirement");

            migrationBuilder.UpdateData(
                table: "Approach.Process.Quality",
                keyColumn: "Name",
                keyValue: "Portability",
                column: "Category",
                value: "Requirement");

            migrationBuilder.UpdateData(
                table: "Approach.Process.Quality",
                keyColumn: "Name",
                keyValue: "Reliability",
                column: "Category",
                value: "Requirement");

            migrationBuilder.UpdateData(
                table: "Approach.Process.Quality",
                keyColumn: "Name",
                keyValue: "Scalability",
                column: "Category",
                value: "Requirement");

            migrationBuilder.UpdateData(
                table: "Approach.Process.Quality",
                keyColumn: "Name",
                keyValue: "Security",
                column: "Category",
                value: "Requirement");

            migrationBuilder.UpdateData(
                table: "Approach.Process.Quality",
                keyColumn: "Name",
                keyValue: "Technology Heterogeneity",
                column: "Category",
                value: "Metric");
        }
    }
}

using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Repository.Migrations
{
    public partial class QualityAttributesUpdated : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Approach.Process.Quality",
                keyColumn: "Name",
                keyValue: "Composability");

            migrationBuilder.DeleteData(
                table: "Approach.Process.Quality",
                keyColumn: "Name",
                keyValue: "Interoperability");

            migrationBuilder.DeleteData(
                table: "Approach.Process.Quality",
                keyColumn: "Name",
                keyValue: "Number of services");

            migrationBuilder.DeleteData(
                table: "Approach.Process.Quality",
                keyColumn: "Name",
                keyValue: "Reuse");

            migrationBuilder.DeleteData(
                table: "Approach.Process.Quality",
                keyColumn: "Name",
                keyValue: "Self-containment");

            migrationBuilder.CreateTable(
                name: "Approach.Process.QualitySublevel",
                columns: table => new
                {
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: true),
                    QualityName = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Approach.Process.QualitySublevel", x => x.Name);
                    table.ForeignKey(
                        name: "FK_Approach.Process.QualitySublevel_Approach.Process.Quality_QualityName",
                        column: x => x.QualityName,
                        principalTable: "Approach.Process.Quality",
                        principalColumn: "Name");
                });

            migrationBuilder.UpdateData(
                table: "Approach.Process.Quality",
                keyColumn: "Name",
                keyValue: "Cohesion",
                column: "Description",
                value: "");

            migrationBuilder.UpdateData(
                table: "Approach.Process.Quality",
                keyColumn: "Name",
                keyValue: "Coupling",
                column: "Description",
                value: "");

            migrationBuilder.UpdateData(
                table: "Approach.Process.Quality",
                keyColumn: "Name",
                keyValue: "Granularity",
                column: "Description",
                value: "");

            migrationBuilder.UpdateData(
                table: "Approach.Process.Quality",
                keyColumn: "Name",
                keyValue: "Maintainability",
                column: "Description",
                value: "");

            migrationBuilder.InsertData(
                table: "Approach.Process.Quality",
                columns: new[] { "Name", "Category", "Description" },
                values: new object[] { "Autonomy", "Metric", "" });

            migrationBuilder.InsertData(
                table: "Approach.Process.Quality",
                columns: new[] { "Name", "Category", "Description" },
                values: new object[] { "Business", "Requirement", "" });

            migrationBuilder.InsertData(
                table: "Approach.Process.Quality",
                columns: new[] { "Name", "Category", "Description" },
                values: new object[] { "Compatibility", "Requirement", "" });

            migrationBuilder.InsertData(
                table: "Approach.Process.Quality",
                columns: new[] { "Name", "Category", "Description" },
                values: new object[] { "Complexity", "Metric", "" });

            migrationBuilder.InsertData(
                table: "Approach.Process.Quality",
                columns: new[] { "Name", "Category", "Description" },
                values: new object[] { "Independence", "Requirement", "" });

            migrationBuilder.InsertData(
                table: "Approach.Process.Quality",
                columns: new[] { "Name", "Category", "Description" },
                values: new object[] { "Isolation", "Metric", "" });

            migrationBuilder.InsertData(
                table: "Approach.Process.Quality",
                columns: new[] { "Name", "Category", "Description" },
                values: new object[] { "Performance", "Requirement", "" });

            migrationBuilder.InsertData(
                table: "Approach.Process.Quality",
                columns: new[] { "Name", "Category", "Description" },
                values: new object[] { "Portability", "Requirement", "" });

            migrationBuilder.InsertData(
                table: "Approach.Process.Quality",
                columns: new[] { "Name", "Category", "Description" },
                values: new object[] { "Reliability", "Requirement", "" });

            migrationBuilder.InsertData(
                table: "Approach.Process.Quality",
                columns: new[] { "Name", "Category", "Description" },
                values: new object[] { "Scalability", "Requirement", "" });

            migrationBuilder.InsertData(
                table: "Approach.Process.Quality",
                columns: new[] { "Name", "Category", "Description" },
                values: new object[] { "Security", "Requirement", "" });

            migrationBuilder.InsertData(
                table: "Approach.Process.Quality",
                columns: new[] { "Name", "Category", "Description" },
                values: new object[] { "Technology Heterogeneity", "Metric", "" });

            migrationBuilder.InsertData(
                table: "Approach.Process.QualitySublevel",
                columns: new[] { "Name", "Description", "QualityName" },
                values: new object[] { "Analysability", null, "Maintainability" });

            migrationBuilder.InsertData(
                table: "Approach.Process.QualitySublevel",
                columns: new[] { "Name", "Description", "QualityName" },
                values: new object[] { "Manageability", null, "Maintainability" });

            migrationBuilder.InsertData(
                table: "Approach.Process.QualitySublevel",
                columns: new[] { "Name", "Description", "QualityName" },
                values: new object[] { "Modifiability", null, "Maintainability" });

            migrationBuilder.InsertData(
                table: "Approach.Process.QualitySublevel",
                columns: new[] { "Name", "Description", "QualityName" },
                values: new object[] { "Modularity", null, "Maintainability" });

            migrationBuilder.InsertData(
                table: "Approach.Process.QualitySublevel",
                columns: new[] { "Name", "Description", "QualityName" },
                values: new object[] { "Monitorability", null, "Maintainability" });

            migrationBuilder.InsertData(
                table: "Approach.Process.QualitySublevel",
                columns: new[] { "Name", "Description", "QualityName" },
                values: new object[] { "Reusability", null, "Maintainability" });

            migrationBuilder.InsertData(
                table: "Approach.Process.QualitySublevel",
                columns: new[] { "Name", "Description", "QualityName" },
                values: new object[] { "Testability", null, "Maintainability" });

            migrationBuilder.InsertData(
                table: "Approach.Process.QualitySublevel",
                columns: new[] { "Name", "Description", "QualityName" },
                values: new object[] { "Understandability", null, "Maintainability" });

            migrationBuilder.InsertData(
                table: "Approach.Process.QualitySublevel",
                columns: new[] { "Name", "Description", "QualityName" },
                values: new object[] { "Accountability", null, "Security" });

            migrationBuilder.InsertData(
                table: "Approach.Process.QualitySublevel",
                columns: new[] { "Name", "Description", "QualityName" },
                values: new object[] { "Adaptability", null, "Portability" });

            migrationBuilder.InsertData(
                table: "Approach.Process.QualitySublevel",
                columns: new[] { "Name", "Description", "QualityName" },
                values: new object[] { "Agility", null, "Portability" });

            migrationBuilder.InsertData(
                table: "Approach.Process.QualitySublevel",
                columns: new[] { "Name", "Description", "QualityName" },
                values: new object[] { "Authenticity", null, "Security" });

            migrationBuilder.InsertData(
                table: "Approach.Process.QualitySublevel",
                columns: new[] { "Name", "Description", "QualityName" },
                values: new object[] { "Availability", null, "Reliability" });

            migrationBuilder.InsertData(
                table: "Approach.Process.QualitySublevel",
                columns: new[] { "Name", "Description", "QualityName" },
                values: new object[] { "Capability", null, "Performance" });

            migrationBuilder.InsertData(
                table: "Approach.Process.QualitySublevel",
                columns: new[] { "Name", "Description", "QualityName" },
                values: new object[] { "Co-Existencce", null, "Compatibility" });

            migrationBuilder.InsertData(
                table: "Approach.Process.QualitySublevel",
                columns: new[] { "Name", "Description", "QualityName" },
                values: new object[] { "Confidentiality", null, "Security" });

            migrationBuilder.InsertData(
                table: "Approach.Process.QualitySublevel",
                columns: new[] { "Name", "Description", "QualityName" },
                values: new object[] { "Deployability", null, "Portability" });

            migrationBuilder.InsertData(
                table: "Approach.Process.QualitySublevel",
                columns: new[] { "Name", "Description", "QualityName" },
                values: new object[] { "Execution Cost", null, "Business" });

            migrationBuilder.InsertData(
                table: "Approach.Process.QualitySublevel",
                columns: new[] { "Name", "Description", "QualityName" },
                values: new object[] { "Fault Tolerance", null, "Reliability" });

            migrationBuilder.InsertData(
                table: "Approach.Process.QualitySublevel",
                columns: new[] { "Name", "Description", "QualityName" },
                values: new object[] { "Installability", null, "Portability" });

            migrationBuilder.InsertData(
                table: "Approach.Process.QualitySublevel",
                columns: new[] { "Name", "Description", "QualityName" },
                values: new object[] { "Integrity", null, "Security" });

            migrationBuilder.InsertData(
                table: "Approach.Process.QualitySublevel",
                columns: new[] { "Name", "Description", "QualityName" },
                values: new object[] { "Interoperability", null, "Compatibility" });

            migrationBuilder.InsertData(
                table: "Approach.Process.QualitySublevel",
                columns: new[] { "Name", "Description", "QualityName" },
                values: new object[] { "Organizational Alignment", null, "Business" });

            migrationBuilder.InsertData(
                table: "Approach.Process.QualitySublevel",
                columns: new[] { "Name", "Description", "QualityName" },
                values: new object[] { "Recoverability", null, "Reliability" });

            migrationBuilder.InsertData(
                table: "Approach.Process.QualitySublevel",
                columns: new[] { "Name", "Description", "QualityName" },
                values: new object[] { "Replaceability", null, "Portability" });

            migrationBuilder.InsertData(
                table: "Approach.Process.QualitySublevel",
                columns: new[] { "Name", "Description", "QualityName" },
                values: new object[] { "Resource Utilization", null, "Performance" });

            migrationBuilder.InsertData(
                table: "Approach.Process.QualitySublevel",
                columns: new[] { "Name", "Description", "QualityName" },
                values: new object[] { "Time Behavior", null, "Performance" });

            migrationBuilder.CreateIndex(
                name: "IX_Approach.Process.QualitySublevel_QualityName",
                table: "Approach.Process.QualitySublevel",
                column: "QualityName");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Approach.Process.QualitySublevel");

            migrationBuilder.DeleteData(
                table: "Approach.Process.Quality",
                keyColumn: "Name",
                keyValue: "Autonomy");

            migrationBuilder.DeleteData(
                table: "Approach.Process.Quality",
                keyColumn: "Name",
                keyValue: "Complexity");

            migrationBuilder.DeleteData(
                table: "Approach.Process.Quality",
                keyColumn: "Name",
                keyValue: "Independence");

            migrationBuilder.DeleteData(
                table: "Approach.Process.Quality",
                keyColumn: "Name",
                keyValue: "Isolation");

            migrationBuilder.DeleteData(
                table: "Approach.Process.Quality",
                keyColumn: "Name",
                keyValue: "Scalability");

            migrationBuilder.DeleteData(
                table: "Approach.Process.Quality",
                keyColumn: "Name",
                keyValue: "Technology Heterogeneity");

            migrationBuilder.DeleteData(
                table: "Approach.Process.Quality",
                keyColumn: "Name",
                keyValue: "Business");

            migrationBuilder.DeleteData(
                table: "Approach.Process.Quality",
                keyColumn: "Name",
                keyValue: "Compatibility");

            migrationBuilder.DeleteData(
                table: "Approach.Process.Quality",
                keyColumn: "Name",
                keyValue: "Performance");

            migrationBuilder.DeleteData(
                table: "Approach.Process.Quality",
                keyColumn: "Name",
                keyValue: "Portability");

            migrationBuilder.DeleteData(
                table: "Approach.Process.Quality",
                keyColumn: "Name",
                keyValue: "Reliability");

            migrationBuilder.DeleteData(
                table: "Approach.Process.Quality",
                keyColumn: "Name",
                keyValue: "Security");

            migrationBuilder.UpdateData(
                table: "Approach.Process.Quality",
                keyColumn: "Name",
                keyValue: "Cohesion",
                column: "Description",
                value: "Cohesion is a measure of the strength of the relationships among programming entities (e.g., classes, functions, etc.) implementing a service and the functionality provided by the service.");

            migrationBuilder.UpdateData(
                table: "Approach.Process.Quality",
                keyColumn: "Name",
                keyValue: "Coupling",
                column: "Description",
                value: "The dependencies among services should be minimized and the functionalities should be encapsulated to limit the impact of changes in one service to other service.");

            migrationBuilder.UpdateData(
                table: "Approach.Process.Quality",
                keyColumn: "Name",
                keyValue: "Granularity",
                column: "Description",
                value: "An adequate granularity is a primary concern of service identification approaches. It can be adjusted to the scope of the functionality offered by the service.");

            migrationBuilder.UpdateData(
                table: "Approach.Process.Quality",
                keyColumn: "Name",
                keyValue: "Maintainability",
                column: "Description",
                value: "Services should ease the effort to modify their implementation, to identify root causes of failures, to verify changes, etc.");

            migrationBuilder.InsertData(
                table: "Approach.Process.Quality",
                columns: new[] { "Name", "Category", "Description" },
                values: new object[] { "Composability", "Requirement", "Services should be composable with one another to be reused and integrated as services that control other services or that provide functionalities to other services." });

            migrationBuilder.InsertData(
                table: "Approach.Process.Quality",
                columns: new[] { "Name", "Category", "Description" },
                values: new object[] { "Interoperability", "Requirement", "The ability of a service to communicate and be invoked by other systems/services implemented in different programming languages." });

            migrationBuilder.InsertData(
                table: "Approach.Process.Quality",
                columns: new[] { "Name", "Category", "Description" },
                values: new object[] { "Number of services", "Metric", "Service identification approaches must not have too many small services or not enough services" });

            migrationBuilder.InsertData(
                table: "Approach.Process.Quality",
                columns: new[] { "Name", "Category", "Description" },
                values: new object[] { "Reuse", "Requirement", "The ability of a service to participate in multiple service assemblies (compositions). Better reusability should provide better return of investment (ROI) and shorter development time." });

            migrationBuilder.InsertData(
                table: "Approach.Process.Quality",
                columns: new[] { "Name", "Category", "Description" },
                values: new object[] { "Self-containment", "Requirement", " A service should be completely self-contained to be deployed as a single unit, without depending on other services." });
        }
    }
}

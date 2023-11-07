using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Repository.Migrations
{
    public partial class seedToolTypes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Title",
                table: "Tool.Source",
                newName: "Name");

            migrationBuilder.AddColumn<string>(
                name: "Author",
                table: "Tool.Source",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Tool.Source",
                type: "TEXT",
                nullable: true);

            migrationBuilder.InsertData(
                table: "Tool.Type",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Decomposition", "The approach has a prototype tool which was implementation." });

            migrationBuilder.InsertData(
                table: "Tool.Type",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Dynamic Analysis", "The approach has a tool implementation which is open source." });

            migrationBuilder.InsertData(
                table: "Tool.Type",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Open Source", "The approach has a prototype tool which was implementation" });

            migrationBuilder.InsertData(
                table: "Tool.Type",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Other", "The approach has a prototype tool which was implementation" });

            migrationBuilder.InsertData(
                table: "Tool.Type",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Static Analysis", "The approach has a tool implementation which is industry ready." });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Tool.Type",
                keyColumn: "Name",
                keyValue: "Decomposition");

            migrationBuilder.DeleteData(
                table: "Tool.Type",
                keyColumn: "Name",
                keyValue: "Dynamic Analysis");

            migrationBuilder.DeleteData(
                table: "Tool.Type",
                keyColumn: "Name",
                keyValue: "Open Source");

            migrationBuilder.DeleteData(
                table: "Tool.Type",
                keyColumn: "Name",
                keyValue: "Other");

            migrationBuilder.DeleteData(
                table: "Tool.Type",
                keyColumn: "Name",
                keyValue: "Static Analysis");

            migrationBuilder.DropColumn(
                name: "Author",
                table: "Tool.Source");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "Tool.Source");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Tool.Source",
                newName: "Title");
        }
    }
}

using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Repository.Migrations
{
    public partial class ConfigurationsOfFirst3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ApproachProcessAtomarUnit_Approach.Process_ApproachProcessesApproachProcessId",
                table: "ApproachProcessAtomarUnit");

            migrationBuilder.DropForeignKey(
                name: "FK_ApproachProcessAtomarUnit_Approach.Process.AtomarUnit_AtomarUnitsName",
                table: "ApproachProcessAtomarUnit");

            migrationBuilder.DropForeignKey(
                name: "FK_ApproachProcessProcessStrategy_Approach.Process_ApproachProcessesApproachProcessId",
                table: "ApproachProcessProcessStrategy");

            migrationBuilder.DropForeignKey(
                name: "FK_ApproachProcessProcessStrategy_Approach.Process.Strategy_ProcessStrategiesName",
                table: "ApproachProcessProcessStrategy");

            migrationBuilder.DropForeignKey(
                name: "FK_RefactoringApproachRepresentation_Approach.Output.Representation_RepresentationOutputsName",
                table: "RefactoringApproachRepresentation");

            migrationBuilder.DropForeignKey(
                name: "FK_RefactoringApproachRepresentation_Approaches_RefactoringApproachesRefactoringApproachId",
                table: "RefactoringApproachRepresentation");

            migrationBuilder.DropPrimaryKey(
                name: "PK_RefactoringApproachRepresentation",
                table: "RefactoringApproachRepresentation");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ApproachProcessProcessStrategy",
                table: "ApproachProcessProcessStrategy");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ApproachProcessAtomarUnit",
                table: "ApproachProcessAtomarUnit");

            migrationBuilder.RenameTable(
                name: "RefactoringApproachRepresentation",
                newName: "JoinTable.Approach.Output.Representation");

            migrationBuilder.RenameTable(
                name: "ApproachProcessProcessStrategy",
                newName: "JoinTable.Approach.Process.Strategy");

            migrationBuilder.RenameTable(
                name: "ApproachProcessAtomarUnit",
                newName: "JoinTable.Approach.Process.AtomarUnit");

            migrationBuilder.RenameIndex(
                name: "IX_RefactoringApproachRepresentation_RepresentationOutputsName",
                table: "JoinTable.Approach.Output.Representation",
                newName: "IX_JoinTable.Approach.Output.Representation_RepresentationOutputsName");

            migrationBuilder.RenameIndex(
                name: "IX_ApproachProcessProcessStrategy_ProcessStrategiesName",
                table: "JoinTable.Approach.Process.Strategy",
                newName: "IX_JoinTable.Approach.Process.Strategy_ProcessStrategiesName");

            migrationBuilder.RenameIndex(
                name: "IX_ApproachProcessAtomarUnit_AtomarUnitsName",
                table: "JoinTable.Approach.Process.AtomarUnit",
                newName: "IX_JoinTable.Approach.Process.AtomarUnit_AtomarUnitsName");

            migrationBuilder.AddPrimaryKey(
                name: "PK_JoinTable.Approach.Output.Representation",
                table: "JoinTable.Approach.Output.Representation",
                columns: new[] { "RefactoringApproachesRefactoringApproachId", "RepresentationOutputsName" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_JoinTable.Approach.Process.Strategy",
                table: "JoinTable.Approach.Process.Strategy",
                columns: new[] { "ApproachProcessesApproachProcessId", "ProcessStrategiesName" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_JoinTable.Approach.Process.AtomarUnit",
                table: "JoinTable.Approach.Process.AtomarUnit",
                columns: new[] { "ApproachProcessesApproachProcessId", "AtomarUnitsName" });

            migrationBuilder.AddForeignKey(
                name: "FK_JoinTable.Approach.Output.Representation_Approach.Output.Representation_RepresentationOutputsName",
                table: "JoinTable.Approach.Output.Representation",
                column: "RepresentationOutputsName",
                principalTable: "Approach.Output.Representation",
                principalColumn: "Name",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_JoinTable.Approach.Output.Representation_Approaches_RefactoringApproachesRefactoringApproachId",
                table: "JoinTable.Approach.Output.Representation",
                column: "RefactoringApproachesRefactoringApproachId",
                principalTable: "Approaches",
                principalColumn: "RefactoringApproachId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_JoinTable.Approach.Process.AtomarUnit_Approach.Process_ApproachProcessesApproachProcessId",
                table: "JoinTable.Approach.Process.AtomarUnit",
                column: "ApproachProcessesApproachProcessId",
                principalTable: "Approach.Process",
                principalColumn: "ApproachProcessId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_JoinTable.Approach.Process.AtomarUnit_Approach.Process.AtomarUnit_AtomarUnitsName",
                table: "JoinTable.Approach.Process.AtomarUnit",
                column: "AtomarUnitsName",
                principalTable: "Approach.Process.AtomarUnit",
                principalColumn: "Name",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_JoinTable.Approach.Process.Strategy_Approach.Process_ApproachProcessesApproachProcessId",
                table: "JoinTable.Approach.Process.Strategy",
                column: "ApproachProcessesApproachProcessId",
                principalTable: "Approach.Process",
                principalColumn: "ApproachProcessId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_JoinTable.Approach.Process.Strategy_Approach.Process.Strategy_ProcessStrategiesName",
                table: "JoinTable.Approach.Process.Strategy",
                column: "ProcessStrategiesName",
                principalTable: "Approach.Process.Strategy",
                principalColumn: "Name",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_JoinTable.Approach.Output.Representation_Approach.Output.Representation_RepresentationOutputsName",
                table: "JoinTable.Approach.Output.Representation");

            migrationBuilder.DropForeignKey(
                name: "FK_JoinTable.Approach.Output.Representation_Approaches_RefactoringApproachesRefactoringApproachId",
                table: "JoinTable.Approach.Output.Representation");

            migrationBuilder.DropForeignKey(
                name: "FK_JoinTable.Approach.Process.AtomarUnit_Approach.Process_ApproachProcessesApproachProcessId",
                table: "JoinTable.Approach.Process.AtomarUnit");

            migrationBuilder.DropForeignKey(
                name: "FK_JoinTable.Approach.Process.AtomarUnit_Approach.Process.AtomarUnit_AtomarUnitsName",
                table: "JoinTable.Approach.Process.AtomarUnit");

            migrationBuilder.DropForeignKey(
                name: "FK_JoinTable.Approach.Process.Strategy_Approach.Process_ApproachProcessesApproachProcessId",
                table: "JoinTable.Approach.Process.Strategy");

            migrationBuilder.DropForeignKey(
                name: "FK_JoinTable.Approach.Process.Strategy_Approach.Process.Strategy_ProcessStrategiesName",
                table: "JoinTable.Approach.Process.Strategy");

            migrationBuilder.DropPrimaryKey(
                name: "PK_JoinTable.Approach.Process.Strategy",
                table: "JoinTable.Approach.Process.Strategy");

            migrationBuilder.DropPrimaryKey(
                name: "PK_JoinTable.Approach.Process.AtomarUnit",
                table: "JoinTable.Approach.Process.AtomarUnit");

            migrationBuilder.DropPrimaryKey(
                name: "PK_JoinTable.Approach.Output.Representation",
                table: "JoinTable.Approach.Output.Representation");

            migrationBuilder.RenameTable(
                name: "JoinTable.Approach.Process.Strategy",
                newName: "ApproachProcessProcessStrategy");

            migrationBuilder.RenameTable(
                name: "JoinTable.Approach.Process.AtomarUnit",
                newName: "ApproachProcessAtomarUnit");

            migrationBuilder.RenameTable(
                name: "JoinTable.Approach.Output.Representation",
                newName: "RefactoringApproachRepresentation");

            migrationBuilder.RenameIndex(
                name: "IX_JoinTable.Approach.Process.Strategy_ProcessStrategiesName",
                table: "ApproachProcessProcessStrategy",
                newName: "IX_ApproachProcessProcessStrategy_ProcessStrategiesName");

            migrationBuilder.RenameIndex(
                name: "IX_JoinTable.Approach.Process.AtomarUnit_AtomarUnitsName",
                table: "ApproachProcessAtomarUnit",
                newName: "IX_ApproachProcessAtomarUnit_AtomarUnitsName");

            migrationBuilder.RenameIndex(
                name: "IX_JoinTable.Approach.Output.Representation_RepresentationOutputsName",
                table: "RefactoringApproachRepresentation",
                newName: "IX_RefactoringApproachRepresentation_RepresentationOutputsName");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ApproachProcessProcessStrategy",
                table: "ApproachProcessProcessStrategy",
                columns: new[] { "ApproachProcessesApproachProcessId", "ProcessStrategiesName" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_ApproachProcessAtomarUnit",
                table: "ApproachProcessAtomarUnit",
                columns: new[] { "ApproachProcessesApproachProcessId", "AtomarUnitsName" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_RefactoringApproachRepresentation",
                table: "RefactoringApproachRepresentation",
                columns: new[] { "RefactoringApproachesRefactoringApproachId", "RepresentationOutputsName" });

            migrationBuilder.AddForeignKey(
                name: "FK_ApproachProcessAtomarUnit_Approach.Process_ApproachProcessesApproachProcessId",
                table: "ApproachProcessAtomarUnit",
                column: "ApproachProcessesApproachProcessId",
                principalTable: "Approach.Process",
                principalColumn: "ApproachProcessId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ApproachProcessAtomarUnit_Approach.Process.AtomarUnit_AtomarUnitsName",
                table: "ApproachProcessAtomarUnit",
                column: "AtomarUnitsName",
                principalTable: "Approach.Process.AtomarUnit",
                principalColumn: "Name",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ApproachProcessProcessStrategy_Approach.Process_ApproachProcessesApproachProcessId",
                table: "ApproachProcessProcessStrategy",
                column: "ApproachProcessesApproachProcessId",
                principalTable: "Approach.Process",
                principalColumn: "ApproachProcessId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ApproachProcessProcessStrategy_Approach.Process.Strategy_ProcessStrategiesName",
                table: "ApproachProcessProcessStrategy",
                column: "ProcessStrategiesName",
                principalTable: "Approach.Process.Strategy",
                principalColumn: "Name",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_RefactoringApproachRepresentation_Approach.Output.Representation_RepresentationOutputsName",
                table: "RefactoringApproachRepresentation",
                column: "RepresentationOutputsName",
                principalTable: "Approach.Output.Representation",
                principalColumn: "Name",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_RefactoringApproachRepresentation_Approaches_RefactoringApproachesRefactoringApproachId",
                table: "RefactoringApproachRepresentation",
                column: "RefactoringApproachesRefactoringApproachId",
                principalTable: "Approaches",
                principalColumn: "RefactoringApproachId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Repository.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Approach.Input.DomainArtifact",
                columns: table => new
                {
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Approach.Input.DomainArtifact", x => x.Name);
                });

            migrationBuilder.CreateTable(
                name: "Approach.Input.Executable",
                columns: table => new
                {
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Language = table.Column<string>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Approach.Input.Executable", x => new { x.Name, x.Language });
                });

            migrationBuilder.CreateTable(
                name: "Approach.Input.ModelArtifact",
                columns: table => new
                {
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Approach.Input.ModelArtifact", x => x.Name);
                });

            migrationBuilder.CreateTable(
                name: "Approach.Input.RuntimeArtifact",
                columns: table => new
                {
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Approach.Input.RuntimeArtifact", x => x.Name);
                });

            migrationBuilder.CreateTable(
                name: "Approach.Output.Architecture",
                columns: table => new
                {
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Approach.Output.Architecture", x => x.Name);
                });

            migrationBuilder.CreateTable(
                name: "Approach.Output.ServiceType",
                columns: table => new
                {
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Approach.Output.ServiceType", x => x.Name);
                });

            migrationBuilder.CreateTable(
                name: "Approach.Process",
                columns: table => new
                {
                    ApproachProcessId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Approach.Process", x => x.ApproachProcessId);
                });

            migrationBuilder.CreateTable(
                name: "Approach.Process.AnalysisType",
                columns: table => new
                {
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Approach.Process.AnalysisType", x => x.Name);
                });

            migrationBuilder.CreateTable(
                name: "Approach.Process.AutomationLevel",
                columns: table => new
                {
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Approach.Process.AutomationLevel", x => x.Name);
                });

            migrationBuilder.CreateTable(
                name: "Approach.Process.Direction",
                columns: table => new
                {
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Approach.Process.Direction", x => x.Name);
                });

            migrationBuilder.CreateTable(
                name: "Approach.Process.Quality",
                columns: table => new
                {
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: true),
                    Category = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Approach.Process.Quality", x => x.Name);
                });

            migrationBuilder.CreateTable(
                name: "Approach.Process.Technique",
                columns: table => new
                {
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Approach.Process.Technique", x => x.Name);
                });

            migrationBuilder.CreateTable(
                name: "Approach.Source",
                columns: table => new
                {
                    ApproachSourceId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Title = table.Column<string>(type: "TEXT", nullable: false),
                    Year = table.Column<int>(type: "INTEGER", nullable: false),
                    Link = table.Column<string>(type: "TEXT", nullable: true),
                    Authors = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Approach.Source", x => x.ApproachSourceId);
                });

            migrationBuilder.CreateTable(
                name: "Approach.Usability.AccuracyPrecision",
                columns: table => new
                {
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Approach.Usability.AccuracyPrecision", x => x.Name);
                });

            migrationBuilder.CreateTable(
                name: "Approach.Usability.ResultsQuality",
                columns: table => new
                {
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Approach.Usability.ResultsQuality", x => x.Name);
                });

            migrationBuilder.CreateTable(
                name: "Approach.Usability.ToolSupport",
                columns: table => new
                {
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Approach.Usability.ToolSupport", x => x.Name);
                });

            migrationBuilder.CreateTable(
                name: "Approach.Usability.ValidationMethod",
                columns: table => new
                {
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Approach.Usability.ValidationMethod", x => x.Name);
                });

            migrationBuilder.CreateTable(
                name: "Approach.Output",
                columns: table => new
                {
                    ApproachOutputId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    ArchitectureName = table.Column<string>(type: "TEXT", nullable: false),
                    ServiceTypeName = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Approach.Output", x => x.ApproachOutputId);
                    table.ForeignKey(
                        name: "FK_Approach.Output_Approach.Output.Architecture_ArchitectureName",
                        column: x => x.ArchitectureName,
                        principalTable: "Approach.Output.Architecture",
                        principalColumn: "Name",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Approach.Output_Approach.Output.ServiceType_ServiceTypeName",
                        column: x => x.ServiceTypeName,
                        principalTable: "Approach.Output.ServiceType",
                        principalColumn: "Name",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "JoinTable.Approach.Process.AnalysisType",
                columns: table => new
                {
                    AnalysisTypesName = table.Column<string>(type: "TEXT", nullable: false),
                    ApproachProcessesApproachProcessId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JoinTable.Approach.Process.AnalysisType", x => new { x.AnalysisTypesName, x.ApproachProcessesApproachProcessId });
                    table.ForeignKey(
                        name: "FK_JoinTable.Approach.Process.AnalysisType_Approach.Process_ApproachProcessesApproachProcessId",
                        column: x => x.ApproachProcessesApproachProcessId,
                        principalTable: "Approach.Process",
                        principalColumn: "ApproachProcessId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_JoinTable.Approach.Process.AnalysisType_Approach.Process.AnalysisType_AnalysisTypesName",
                        column: x => x.AnalysisTypesName,
                        principalTable: "Approach.Process.AnalysisType",
                        principalColumn: "Name",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "JoinTable.Approach.Process.AutomationLevel",
                columns: table => new
                {
                    ApproachProcessesApproachProcessId = table.Column<int>(type: "INTEGER", nullable: false),
                    AutomationLevelsName = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JoinTable.Approach.Process.AutomationLevel", x => new { x.ApproachProcessesApproachProcessId, x.AutomationLevelsName });
                    table.ForeignKey(
                        name: "FK_JoinTable.Approach.Process.AutomationLevel_Approach.Process_ApproachProcessesApproachProcessId",
                        column: x => x.ApproachProcessesApproachProcessId,
                        principalTable: "Approach.Process",
                        principalColumn: "ApproachProcessId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_JoinTable.Approach.Process.AutomationLevel_Approach.Process.AutomationLevel_AutomationLevelsName",
                        column: x => x.AutomationLevelsName,
                        principalTable: "Approach.Process.AutomationLevel",
                        principalColumn: "Name",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "JoinTable.Approach.Process.Direction",
                columns: table => new
                {
                    ApproachProcessesApproachProcessId = table.Column<int>(type: "INTEGER", nullable: false),
                    DirectionsName = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JoinTable.Approach.Process.Direction", x => new { x.ApproachProcessesApproachProcessId, x.DirectionsName });
                    table.ForeignKey(
                        name: "FK_JoinTable.Approach.Process.Direction_Approach.Process_ApproachProcessesApproachProcessId",
                        column: x => x.ApproachProcessesApproachProcessId,
                        principalTable: "Approach.Process",
                        principalColumn: "ApproachProcessId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_JoinTable.Approach.Process.Direction_Approach.Process.Direction_DirectionsName",
                        column: x => x.DirectionsName,
                        principalTable: "Approach.Process.Direction",
                        principalColumn: "Name",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "JoinTable.Approach.Process.Quality",
                columns: table => new
                {
                    ApproachProcessesApproachProcessId = table.Column<int>(type: "INTEGER", nullable: false),
                    QualitiesName = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JoinTable.Approach.Process.Quality", x => new { x.ApproachProcessesApproachProcessId, x.QualitiesName });
                    table.ForeignKey(
                        name: "FK_JoinTable.Approach.Process.Quality_Approach.Process_ApproachProcessesApproachProcessId",
                        column: x => x.ApproachProcessesApproachProcessId,
                        principalTable: "Approach.Process",
                        principalColumn: "ApproachProcessId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_JoinTable.Approach.Process.Quality_Approach.Process.Quality_QualitiesName",
                        column: x => x.QualitiesName,
                        principalTable: "Approach.Process.Quality",
                        principalColumn: "Name",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "JoinTable.Approach.Process.Technique",
                columns: table => new
                {
                    ApproachProcessesApproachProcessId = table.Column<int>(type: "INTEGER", nullable: false),
                    TechniquesName = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JoinTable.Approach.Process.Technique", x => new { x.ApproachProcessesApproachProcessId, x.TechniquesName });
                    table.ForeignKey(
                        name: "FK_JoinTable.Approach.Process.Technique_Approach.Process_ApproachProcessesApproachProcessId",
                        column: x => x.ApproachProcessesApproachProcessId,
                        principalTable: "Approach.Process",
                        principalColumn: "ApproachProcessId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_JoinTable.Approach.Process.Technique_Approach.Process.Technique_TechniquesName",
                        column: x => x.TechniquesName,
                        principalTable: "Approach.Process.Technique",
                        principalColumn: "Name",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Approach.Usability",
                columns: table => new
                {
                    ApproachUsabilityId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    ResultsQualityName = table.Column<string>(type: "TEXT", nullable: false),
                    ToolSupportName = table.Column<string>(type: "TEXT", nullable: false),
                    AccuracyPrecisionName = table.Column<string>(type: "TEXT", nullable: false),
                    ValidationMethodName = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Approach.Usability", x => x.ApproachUsabilityId);
                    table.ForeignKey(
                        name: "FK_Approach.Usability_Approach.Usability.AccuracyPrecision_AccuracyPrecisionName",
                        column: x => x.AccuracyPrecisionName,
                        principalTable: "Approach.Usability.AccuracyPrecision",
                        principalColumn: "Name",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_Approach.Usability_Approach.Usability.ResultsQuality_ResultsQualityName",
                        column: x => x.ResultsQualityName,
                        principalTable: "Approach.Usability.ResultsQuality",
                        principalColumn: "Name",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_Approach.Usability_Approach.Usability.ToolSupport_ToolSupportName",
                        column: x => x.ToolSupportName,
                        principalTable: "Approach.Usability.ToolSupport",
                        principalColumn: "Name",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_Approach.Usability_Approach.Usability.ValidationMethod_ValidationMethodName",
                        column: x => x.ValidationMethodName,
                        principalTable: "Approach.Usability.ValidationMethod",
                        principalColumn: "Name",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "Approaches",
                columns: table => new
                {
                    RefactoringApproachId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    ApproachSourceId = table.Column<int>(type: "INTEGER", nullable: false),
                    ApproachProcessId = table.Column<int>(type: "INTEGER", nullable: false),
                    ApproachUsabilityId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Approaches", x => x.RefactoringApproachId);
                    table.ForeignKey(
                        name: "FK_Approaches_Approach.Process_ApproachProcessId",
                        column: x => x.ApproachProcessId,
                        principalTable: "Approach.Process",
                        principalColumn: "ApproachProcessId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Approaches_Approach.Source_ApproachSourceId",
                        column: x => x.ApproachSourceId,
                        principalTable: "Approach.Source",
                        principalColumn: "ApproachSourceId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Approaches_Approach.Usability_ApproachUsabilityId",
                        column: x => x.ApproachUsabilityId,
                        principalTable: "Approach.Usability",
                        principalColumn: "ApproachUsabilityId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "JoinTable.Approach.Input.DomainArtifact",
                columns: table => new
                {
                    DomainArtifactInputsName = table.Column<string>(type: "TEXT", nullable: false),
                    RefactoringApproachesRefactoringApproachId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JoinTable.Approach.Input.DomainArtifact", x => new { x.DomainArtifactInputsName, x.RefactoringApproachesRefactoringApproachId });
                    table.ForeignKey(
                        name: "FK_JoinTable.Approach.Input.DomainArtifact_Approach.Input.DomainArtifact_DomainArtifactInputsName",
                        column: x => x.DomainArtifactInputsName,
                        principalTable: "Approach.Input.DomainArtifact",
                        principalColumn: "Name",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_JoinTable.Approach.Input.DomainArtifact_Approaches_RefactoringApproachesRefactoringApproachId",
                        column: x => x.RefactoringApproachesRefactoringApproachId,
                        principalTable: "Approaches",
                        principalColumn: "RefactoringApproachId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "JoinTable.Approach.Input.Executable",
                columns: table => new
                {
                    RefactoringApproachesRefactoringApproachId = table.Column<int>(type: "INTEGER", nullable: false),
                    ExecutableInputsName = table.Column<string>(type: "TEXT", nullable: false),
                    ExecutableInputsLanguage = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JoinTable.Approach.Input.Executable", x => new { x.RefactoringApproachesRefactoringApproachId, x.ExecutableInputsName, x.ExecutableInputsLanguage });
                    table.ForeignKey(
                        name: "FK_JoinTable.Approach.Input.Executable_Approach.Input.Executable_ExecutableInputsName_ExecutableInputsLanguage",
                        columns: x => new { x.ExecutableInputsName, x.ExecutableInputsLanguage },
                        principalTable: "Approach.Input.Executable",
                        principalColumns: new[] { "Name", "Language" },
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_JoinTable.Approach.Input.Executable_Approaches_RefactoringApproachesRefactoringApproachId",
                        column: x => x.RefactoringApproachesRefactoringApproachId,
                        principalTable: "Approaches",
                        principalColumn: "RefactoringApproachId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "JoinTable.Approach.Input.ModelArtifact",
                columns: table => new
                {
                    ModelArtifactInputsName = table.Column<string>(type: "TEXT", nullable: false),
                    RefactoringApproachesRefactoringApproachId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JoinTable.Approach.Input.ModelArtifact", x => new { x.ModelArtifactInputsName, x.RefactoringApproachesRefactoringApproachId });
                    table.ForeignKey(
                        name: "FK_JoinTable.Approach.Input.ModelArtifact_Approach.Input.ModelArtifact_ModelArtifactInputsName",
                        column: x => x.ModelArtifactInputsName,
                        principalTable: "Approach.Input.ModelArtifact",
                        principalColumn: "Name",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_JoinTable.Approach.Input.ModelArtifact_Approaches_RefactoringApproachesRefactoringApproachId",
                        column: x => x.RefactoringApproachesRefactoringApproachId,
                        principalTable: "Approaches",
                        principalColumn: "RefactoringApproachId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "JoinTable.Approach.Input.RuntimeArtifact",
                columns: table => new
                {
                    RefactoringApproachesRefactoringApproachId = table.Column<int>(type: "INTEGER", nullable: false),
                    RuntimeArtifactInputsName = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JoinTable.Approach.Input.RuntimeArtifact", x => new { x.RefactoringApproachesRefactoringApproachId, x.RuntimeArtifactInputsName });
                    table.ForeignKey(
                        name: "FK_JoinTable.Approach.Input.RuntimeArtifact_Approach.Input.RuntimeArtifact_RuntimeArtifactInputsName",
                        column: x => x.RuntimeArtifactInputsName,
                        principalTable: "Approach.Input.RuntimeArtifact",
                        principalColumn: "Name",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_JoinTable.Approach.Input.RuntimeArtifact_Approaches_RefactoringApproachesRefactoringApproachId",
                        column: x => x.RefactoringApproachesRefactoringApproachId,
                        principalTable: "Approaches",
                        principalColumn: "RefactoringApproachId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "JoinTable.Approach.Output",
                columns: table => new
                {
                    ApproachOutputsApproachOutputId = table.Column<int>(type: "INTEGER", nullable: false),
                    RefactoringApproachesRefactoringApproachId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JoinTable.Approach.Output", x => new { x.ApproachOutputsApproachOutputId, x.RefactoringApproachesRefactoringApproachId });
                    table.ForeignKey(
                        name: "FK_JoinTable.Approach.Output_Approach.Output_ApproachOutputsApproachOutputId",
                        column: x => x.ApproachOutputsApproachOutputId,
                        principalTable: "Approach.Output",
                        principalColumn: "ApproachOutputId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_JoinTable.Approach.Output_Approaches_RefactoringApproachesRefactoringApproachId",
                        column: x => x.RefactoringApproachesRefactoringApproachId,
                        principalTable: "Approaches",
                        principalColumn: "RefactoringApproachId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Approach.Input.DomainArtifact",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Documentation", "" });

            migrationBuilder.InsertData(
                table: "Approach.Input.DomainArtifact",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Human expertise", "" });

            migrationBuilder.InsertData(
                table: "Approach.Input.DomainArtifact",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Ontology", "" });

            migrationBuilder.InsertData(
                table: "Approach.Input.Executable",
                columns: new[] { "Language", "Name", "Description" },
                values: new object[] { "No specification", "Database file", "" });

            migrationBuilder.InsertData(
                table: "Approach.Input.Executable",
                columns: new[] { "Language", "Name", "Description" },
                values: new object[] { "No specification", "Source code", "" });

            migrationBuilder.InsertData(
                table: "Approach.Input.Executable",
                columns: new[] { "Language", "Name", "Description" },
                values: new object[] { "No specification", "Test cases", "" });

            migrationBuilder.InsertData(
                table: "Approach.Input.ModelArtifact",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Activity diagram", "" });

            migrationBuilder.InsertData(
                table: "Approach.Input.ModelArtifact",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Business process model", "" });

            migrationBuilder.InsertData(
                table: "Approach.Input.ModelArtifact",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Data flow diagram", "" });

            migrationBuilder.InsertData(
                table: "Approach.Input.ModelArtifact",
                columns: new[] { "Name", "Description" },
                values: new object[] { "State machine diagram", "" });

            migrationBuilder.InsertData(
                table: "Approach.Input.ModelArtifact",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Use case model", "" });

            migrationBuilder.InsertData(
                table: "Approach.Input.RuntimeArtifact",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Log traces", "" });

            migrationBuilder.InsertData(
                table: "Approach.Input.RuntimeArtifact",
                columns: new[] { "Name", "Description" },
                values: new object[] { "User-Application interactions", "" });

            migrationBuilder.InsertData(
                table: "Approach.Output.Architecture",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Microservices", "" });

            migrationBuilder.InsertData(
                table: "Approach.Output.Architecture",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Services", "" });

            migrationBuilder.InsertData(
                table: "Approach.Output.ServiceType",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Application services", "" });

            migrationBuilder.InsertData(
                table: "Approach.Output.ServiceType",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Business services", "" });

            migrationBuilder.InsertData(
                table: "Approach.Output.ServiceType",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Enterprise services", "" });

            migrationBuilder.InsertData(
                table: "Approach.Output.ServiceType",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Entity services", "" });

            migrationBuilder.InsertData(
                table: "Approach.Output.ServiceType",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Infrastructure services", "" });

            migrationBuilder.InsertData(
                table: "Approach.Output.ServiceType",
                columns: new[] { "Name", "Description" },
                values: new object[] { "No specification", "" });

            migrationBuilder.InsertData(
                table: "Approach.Output.ServiceType",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Utility services", "" });

            migrationBuilder.InsertData(
                table: "Approach.Process.AnalysisType",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Dynamic", "" });

            migrationBuilder.InsertData(
                table: "Approach.Process.AnalysisType",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Historic", "" });

            migrationBuilder.InsertData(
                table: "Approach.Process.AnalysisType",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Lexical", "" });

            migrationBuilder.InsertData(
                table: "Approach.Process.AnalysisType",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Static", "" });

            migrationBuilder.InsertData(
                table: "Approach.Process.AutomationLevel",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Automatic", "" });

            migrationBuilder.InsertData(
                table: "Approach.Process.AutomationLevel",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Manual", "" });

            migrationBuilder.InsertData(
                table: "Approach.Process.AutomationLevel",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Semi-automatic", "" });

            migrationBuilder.InsertData(
                table: "Approach.Process.Direction",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Bottom-up", "" });

            migrationBuilder.InsertData(
                table: "Approach.Process.Direction",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Mixed", "" });

            migrationBuilder.InsertData(
                table: "Approach.Process.Direction",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Top-down", "" });

            migrationBuilder.InsertData(
                table: "Approach.Process.Quality",
                columns: new[] { "Name", "Category", "Description" },
                values: new object[] { "Cohesion", "Metric", "" });

            migrationBuilder.InsertData(
                table: "Approach.Process.Quality",
                columns: new[] { "Name", "Category", "Description" },
                values: new object[] { "Composability", "Requirement", "" });

            migrationBuilder.InsertData(
                table: "Approach.Process.Quality",
                columns: new[] { "Name", "Category", "Description" },
                values: new object[] { "Coupling", "Metric", "" });

            migrationBuilder.InsertData(
                table: "Approach.Process.Quality",
                columns: new[] { "Name", "Category", "Description" },
                values: new object[] { "Granularity", "Metric", "" });

            migrationBuilder.InsertData(
                table: "Approach.Process.Quality",
                columns: new[] { "Name", "Category", "Description" },
                values: new object[] { "Interoperability", "Requirement", "" });

            migrationBuilder.InsertData(
                table: "Approach.Process.Quality",
                columns: new[] { "Name", "Category", "Description" },
                values: new object[] { "Maintainability", "Requirement", "" });

            migrationBuilder.InsertData(
                table: "Approach.Process.Quality",
                columns: new[] { "Name", "Category", "Description" },
                values: new object[] { "Number of services", "Metric", "" });

            migrationBuilder.InsertData(
                table: "Approach.Process.Quality",
                columns: new[] { "Name", "Category", "Description" },
                values: new object[] { "Reuse", "Requirement", "" });

            migrationBuilder.InsertData(
                table: "Approach.Process.Quality",
                columns: new[] { "Name", "Category", "Description" },
                values: new object[] { "Self-containment", "Requirement", "" });

            migrationBuilder.InsertData(
                table: "Approach.Process.Technique",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Clustering", "" });

            migrationBuilder.InsertData(
                table: "Approach.Process.Technique",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Custom heuristics", "" });

            migrationBuilder.InsertData(
                table: "Approach.Process.Technique",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Formal concept analysis", "" });

            migrationBuilder.InsertData(
                table: "Approach.Process.Technique",
                columns: new[] { "Name", "Description" },
                values: new object[] { "General guidelines", "" });

            migrationBuilder.InsertData(
                table: "Approach.Process.Technique",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Genetic algorithm", "" });

            migrationBuilder.InsertData(
                table: "Approach.Process.Technique",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Wrapping", "" });

            migrationBuilder.InsertData(
                table: "Approach.Usability.AccuracyPrecision",
                columns: new[] { "Name", "Description" },
                values: new object[] { "High", "" });

            migrationBuilder.InsertData(
                table: "Approach.Usability.AccuracyPrecision",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Low", "" });

            migrationBuilder.InsertData(
                table: "Approach.Usability.AccuracyPrecision",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Medium", "" });

            migrationBuilder.InsertData(
                table: "Approach.Usability.AccuracyPrecision",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Not available", "" });

            migrationBuilder.InsertData(
                table: "Approach.Usability.ResultsQuality",
                columns: new[] { "Name", "Description" },
                values: new object[] { "High", "" });

            migrationBuilder.InsertData(
                table: "Approach.Usability.ResultsQuality",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Low", "" });

            migrationBuilder.InsertData(
                table: "Approach.Usability.ResultsQuality",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Medium", "" });

            migrationBuilder.InsertData(
                table: "Approach.Usability.ResultsQuality",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Not available", "" });

            migrationBuilder.InsertData(
                table: "Approach.Usability.ToolSupport",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Industry ready", "" });

            migrationBuilder.InsertData(
                table: "Approach.Usability.ToolSupport",
                columns: new[] { "Name", "Description" },
                values: new object[] { "No tool support", "" });

            migrationBuilder.InsertData(
                table: "Approach.Usability.ToolSupport",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Open source", "" });

            migrationBuilder.InsertData(
                table: "Approach.Usability.ToolSupport",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Prototype", "" });

            migrationBuilder.InsertData(
                table: "Approach.Usability.ValidationMethod",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Case study", "" });

            migrationBuilder.InsertData(
                table: "Approach.Usability.ValidationMethod",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Experiment", "" });

            migrationBuilder.InsertData(
                table: "Approach.Usability.ValidationMethod",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Industry", "" });

            migrationBuilder.InsertData(
                table: "Approach.Usability.ValidationMethod",
                columns: new[] { "Name", "Description" },
                values: new object[] { "No validation", "" });

            migrationBuilder.CreateIndex(
                name: "IX_Approach.Output_ArchitectureName",
                table: "Approach.Output",
                column: "ArchitectureName");

            migrationBuilder.CreateIndex(
                name: "IX_Approach.Output_ServiceTypeName",
                table: "Approach.Output",
                column: "ServiceTypeName");

            migrationBuilder.CreateIndex(
                name: "IX_Approach.Usability_AccuracyPrecisionName",
                table: "Approach.Usability",
                column: "AccuracyPrecisionName");

            migrationBuilder.CreateIndex(
                name: "IX_Approach.Usability_ResultsQualityName",
                table: "Approach.Usability",
                column: "ResultsQualityName");

            migrationBuilder.CreateIndex(
                name: "IX_Approach.Usability_ToolSupportName",
                table: "Approach.Usability",
                column: "ToolSupportName");

            migrationBuilder.CreateIndex(
                name: "IX_Approach.Usability_ValidationMethodName",
                table: "Approach.Usability",
                column: "ValidationMethodName");

            migrationBuilder.CreateIndex(
                name: "IX_Approaches_ApproachProcessId",
                table: "Approaches",
                column: "ApproachProcessId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Approaches_ApproachSourceId",
                table: "Approaches",
                column: "ApproachSourceId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Approaches_ApproachUsabilityId",
                table: "Approaches",
                column: "ApproachUsabilityId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_JoinTable.Approach.Input.DomainArtifact_RefactoringApproachesRefactoringApproachId",
                table: "JoinTable.Approach.Input.DomainArtifact",
                column: "RefactoringApproachesRefactoringApproachId");

            migrationBuilder.CreateIndex(
                name: "IX_JoinTable.Approach.Input.Executable_ExecutableInputsName_ExecutableInputsLanguage",
                table: "JoinTable.Approach.Input.Executable",
                columns: new[] { "ExecutableInputsName", "ExecutableInputsLanguage" });

            migrationBuilder.CreateIndex(
                name: "IX_JoinTable.Approach.Input.ModelArtifact_RefactoringApproachesRefactoringApproachId",
                table: "JoinTable.Approach.Input.ModelArtifact",
                column: "RefactoringApproachesRefactoringApproachId");

            migrationBuilder.CreateIndex(
                name: "IX_JoinTable.Approach.Input.RuntimeArtifact_RuntimeArtifactInputsName",
                table: "JoinTable.Approach.Input.RuntimeArtifact",
                column: "RuntimeArtifactInputsName");

            migrationBuilder.CreateIndex(
                name: "IX_JoinTable.Approach.Output_RefactoringApproachesRefactoringApproachId",
                table: "JoinTable.Approach.Output",
                column: "RefactoringApproachesRefactoringApproachId");

            migrationBuilder.CreateIndex(
                name: "IX_JoinTable.Approach.Process.AnalysisType_ApproachProcessesApproachProcessId",
                table: "JoinTable.Approach.Process.AnalysisType",
                column: "ApproachProcessesApproachProcessId");

            migrationBuilder.CreateIndex(
                name: "IX_JoinTable.Approach.Process.AutomationLevel_AutomationLevelsName",
                table: "JoinTable.Approach.Process.AutomationLevel",
                column: "AutomationLevelsName");

            migrationBuilder.CreateIndex(
                name: "IX_JoinTable.Approach.Process.Direction_DirectionsName",
                table: "JoinTable.Approach.Process.Direction",
                column: "DirectionsName");

            migrationBuilder.CreateIndex(
                name: "IX_JoinTable.Approach.Process.Quality_QualitiesName",
                table: "JoinTable.Approach.Process.Quality",
                column: "QualitiesName");

            migrationBuilder.CreateIndex(
                name: "IX_JoinTable.Approach.Process.Technique_TechniquesName",
                table: "JoinTable.Approach.Process.Technique",
                column: "TechniquesName");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "JoinTable.Approach.Input.DomainArtifact");

            migrationBuilder.DropTable(
                name: "JoinTable.Approach.Input.Executable");

            migrationBuilder.DropTable(
                name: "JoinTable.Approach.Input.ModelArtifact");

            migrationBuilder.DropTable(
                name: "JoinTable.Approach.Input.RuntimeArtifact");

            migrationBuilder.DropTable(
                name: "JoinTable.Approach.Output");

            migrationBuilder.DropTable(
                name: "JoinTable.Approach.Process.AnalysisType");

            migrationBuilder.DropTable(
                name: "JoinTable.Approach.Process.AutomationLevel");

            migrationBuilder.DropTable(
                name: "JoinTable.Approach.Process.Direction");

            migrationBuilder.DropTable(
                name: "JoinTable.Approach.Process.Quality");

            migrationBuilder.DropTable(
                name: "JoinTable.Approach.Process.Technique");

            migrationBuilder.DropTable(
                name: "Approach.Input.DomainArtifact");

            migrationBuilder.DropTable(
                name: "Approach.Input.Executable");

            migrationBuilder.DropTable(
                name: "Approach.Input.ModelArtifact");

            migrationBuilder.DropTable(
                name: "Approach.Input.RuntimeArtifact");

            migrationBuilder.DropTable(
                name: "Approach.Output");

            migrationBuilder.DropTable(
                name: "Approaches");

            migrationBuilder.DropTable(
                name: "Approach.Process.AnalysisType");

            migrationBuilder.DropTable(
                name: "Approach.Process.AutomationLevel");

            migrationBuilder.DropTable(
                name: "Approach.Process.Direction");

            migrationBuilder.DropTable(
                name: "Approach.Process.Quality");

            migrationBuilder.DropTable(
                name: "Approach.Process.Technique");

            migrationBuilder.DropTable(
                name: "Approach.Output.Architecture");

            migrationBuilder.DropTable(
                name: "Approach.Output.ServiceType");

            migrationBuilder.DropTable(
                name: "Approach.Process");

            migrationBuilder.DropTable(
                name: "Approach.Source");

            migrationBuilder.DropTable(
                name: "Approach.Usability");

            migrationBuilder.DropTable(
                name: "Approach.Usability.AccuracyPrecision");

            migrationBuilder.DropTable(
                name: "Approach.Usability.ResultsQuality");

            migrationBuilder.DropTable(
                name: "Approach.Usability.ToolSupport");

            migrationBuilder.DropTable(
                name: "Approach.Usability.ValidationMethod");
        }
    }
}

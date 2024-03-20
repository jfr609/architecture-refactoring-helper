using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Repository.Migrations
{
    public partial class initialcreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: ".Scenario",
                columns: table => new
                {
                    ScenarioId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: true),
                    Difficulty = table.Column<string>(type: "TEXT", nullable: true),
                    Importance = table.Column<string>(type: "TEXT", nullable: true),
                    ImplementedPattern = table.Column<string>(type: "TEXT", nullable: true),
                    PreferredPattern = table.Column<string>(type: "TEXT", nullable: true),
                    Explanation = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_.Scenario", x => x.ScenarioId);
                });

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
                name: "Approach.Process.AtomarUnit",
                columns: table => new
                {
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Approach.Process.AtomarUnit", x => x.Name);
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
                name: "Approach.Process.Strategy",
                columns: table => new
                {
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Approach.Process.Strategy", x => x.Name);
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
                name: "ArchitecturalDesign.Source",
                columns: table => new
                {
                    ArchitecturalDesignSourceId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: false),
                    Links = table.Column<string>(type: "TEXT", nullable: true),
                    Source = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ArchitecturalDesign.Source", x => x.ArchitecturalDesignSourceId);
                });

            migrationBuilder.CreateTable(
                name: "Objectives",
                columns: table => new
                {
                    ObjectivesId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    ObjectivesName = table.Column<string>(type: "TEXT", nullable: true),
                    ObjectivesGoalType = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Objectives", x => x.ObjectivesId);
                });

            migrationBuilder.CreateTable(
                name: "ProjectDescription",
                columns: table => new
                {
                    ProjectDescriptionId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Systemname = table.Column<string>(type: "TEXT", nullable: true),
                    Ownership = table.Column<string>(type: "TEXT", nullable: true),
                    Creation_date = table.Column<string>(type: "TEXT", nullable: true),
                    Systemsize_LOC = table.Column<int>(type: "INTEGER", nullable: true),
                    Hosting_model = table.Column<string>(type: "TEXT", nullable: true),
                    Number_of_Teams = table.Column<int>(type: "INTEGER", nullable: true),
                    Number_of_Developers = table.Column<int>(type: "INTEGER", nullable: true),
                    Processmodel = table.Column<string>(type: "TEXT", nullable: true),
                    Architecturepattern = table.Column<string>(type: "TEXT", nullable: true),
                    Languages = table.Column<string>(type: "TEXT", nullable: true),
                    Data_Persistence = table.Column<string>(type: "TEXT", nullable: true),
                    Purpose = table.Column<string>(type: "TEXT", nullable: true),
                    Functionality = table.Column<string>(type: "TEXT", nullable: true),
                    Designdiagrams = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectDescription", x => x.ProjectDescriptionId);
                });

            migrationBuilder.CreateTable(
                name: "StrategicGoals",
                columns: table => new
                {
                    StrategicGoalsId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Method = table.Column<string>(type: "TEXT", nullable: true),
                    Owner = table.Column<string>(type: "TEXT", nullable: true),
                    Participants = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StrategicGoals", x => x.StrategicGoalsId);
                });

            migrationBuilder.CreateTable(
                name: "Tool.Source",
                columns: table => new
                {
                    ToolSourceId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Author = table.Column<string>(type: "TEXT", nullable: false),
                    Link = table.Column<string>(type: "TEXT", nullable: true),
                    Description = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tool.Source", x => x.ToolSourceId);
                });

            migrationBuilder.CreateTable(
                name: "Tool.Type",
                columns: table => new
                {
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tool.Type", x => x.Name);
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
                name: "JoinTable.Approach.Process.AtomarUnit",
                columns: table => new
                {
                    ApproachProcessesApproachProcessId = table.Column<int>(type: "INTEGER", nullable: false),
                    AtomarUnitsName = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JoinTable.Approach.Process.AtomarUnit", x => new { x.ApproachProcessesApproachProcessId, x.AtomarUnitsName });
                    table.ForeignKey(
                        name: "FK_JoinTable.Approach.Process.AtomarUnit_Approach.Process_ApproachProcessesApproachProcessId",
                        column: x => x.ApproachProcessesApproachProcessId,
                        principalTable: "Approach.Process",
                        principalColumn: "ApproachProcessId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_JoinTable.Approach.Process.AtomarUnit_Approach.Process.AtomarUnit_AtomarUnitsName",
                        column: x => x.AtomarUnitsName,
                        principalTable: "Approach.Process.AtomarUnit",
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
                name: "JoinTable.Approach.Process.Strategy",
                columns: table => new
                {
                    ApproachProcessesApproachProcessId = table.Column<int>(type: "INTEGER", nullable: false),
                    ProcessStrategiesName = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JoinTable.Approach.Process.Strategy", x => new { x.ApproachProcessesApproachProcessId, x.ProcessStrategiesName });
                    table.ForeignKey(
                        name: "FK_JoinTable.Approach.Process.Strategy_Approach.Process_ApproachProcessesApproachProcessId",
                        column: x => x.ApproachProcessesApproachProcessId,
                        principalTable: "Approach.Process",
                        principalColumn: "ApproachProcessId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_JoinTable.Approach.Process.Strategy_Approach.Process.Strategy_ProcessStrategiesName",
                        column: x => x.ProcessStrategiesName,
                        principalTable: "Approach.Process.Strategy",
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
                    NoToolSupport = table.Column<bool>(type: "INTEGER", nullable: true),
                    ResultsQualityName = table.Column<string>(type: "TEXT", nullable: true),
                    ToolSupportName = table.Column<string>(type: "TEXT", nullable: true),
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

            migrationBuilder.CreateTable(
                name: "Tools",
                columns: table => new
                {
                    ToolId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Identifier = table.Column<string>(type: "TEXT", nullable: false),
                    ToolSourceId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tools", x => x.ToolId);
                    table.ForeignKey(
                        name: "FK_Tools_Tool.Source_ToolSourceId",
                        column: x => x.ToolSourceId,
                        principalTable: "Tool.Source",
                        principalColumn: "ToolSourceId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Approaches",
                columns: table => new
                {
                    RefactoringApproachId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Identifier = table.Column<string>(type: "TEXT", nullable: false),
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
                name: "JoinTable.Approach.Usability.Tool",
                columns: table => new
                {
                    ApproachUsabilitiesApproachUsabilityId = table.Column<int>(type: "INTEGER", nullable: false),
                    ToolsToolId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JoinTable.Approach.Usability.Tool", x => new { x.ApproachUsabilitiesApproachUsabilityId, x.ToolsToolId });
                    table.ForeignKey(
                        name: "FK_JoinTable.Approach.Usability.Tool_Approach.Usability_ApproachUsabilitiesApproachUsabilityId",
                        column: x => x.ApproachUsabilitiesApproachUsabilityId,
                        principalTable: "Approach.Usability",
                        principalColumn: "ApproachUsabilityId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_JoinTable.Approach.Usability.Tool_Tools_ToolsToolId",
                        column: x => x.ToolsToolId,
                        principalTable: "Tools",
                        principalColumn: "ToolId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "JoinTable.Tool.Type",
                columns: table => new
                {
                    ToolTypesName = table.Column<string>(type: "TEXT", nullable: false),
                    ToolsToolId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JoinTable.Tool.Type", x => new { x.ToolTypesName, x.ToolsToolId });
                    table.ForeignKey(
                        name: "FK_JoinTable.Tool.Type_Tool.Type_ToolTypesName",
                        column: x => x.ToolTypesName,
                        principalTable: "Tool.Type",
                        principalColumn: "Name",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_JoinTable.Tool.Type_Tools_ToolsToolId",
                        column: x => x.ToolsToolId,
                        principalTable: "Tools",
                        principalColumn: "ToolId",
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

            migrationBuilder.CreateTable(
                name: "JoinTable.Approach.Output.Representation",
                columns: table => new
                {
                    RefactoringApproachesRefactoringApproachId = table.Column<int>(type: "INTEGER", nullable: false),
                    RepresentationOutputsName = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JoinTable.Approach.Output.Representation", x => new { x.RefactoringApproachesRefactoringApproachId, x.RepresentationOutputsName });
                    table.ForeignKey(
                        name: "FK_JoinTable.Approach.Output.Representation_Approach.Output.Representation_RepresentationOutputsName",
                        column: x => x.RepresentationOutputsName,
                        principalTable: "Approach.Output.Representation",
                        principalColumn: "Name",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_JoinTable.Approach.Output.Representation_Approaches_RefactoringApproachesRefactoringApproachId",
                        column: x => x.RefactoringApproachesRefactoringApproachId,
                        principalTable: "Approaches",
                        principalColumn: "RefactoringApproachId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Approach.Process.Quality",
                columns: table => new
                {
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: true),
                    Category = table.Column<string>(type: "TEXT", nullable: false),
                    QualityName = table.Column<string>(type: "TEXT", nullable: true),
                    QualitySublevelName = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Approach.Process.Quality", x => x.Name);
                    table.ForeignKey(
                        name: "FK_Approach.Process.Quality_Approach.Process.Quality_QualityName",
                        column: x => x.QualityName,
                        principalTable: "Approach.Process.Quality",
                        principalColumn: "Name");
                });

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
                name: "QualityScenario",
                columns: table => new
                {
                    QualitiesName = table.Column<string>(type: "TEXT", nullable: false),
                    ScenariosScenarioId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QualityScenario", x => new { x.QualitiesName, x.ScenariosScenarioId });
                    table.ForeignKey(
                        name: "FK_QualityScenario_.Scenario_ScenariosScenarioId",
                        column: x => x.ScenariosScenarioId,
                        principalTable: ".Scenario",
                        principalColumn: "ScenarioId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_QualityScenario_Approach.Process.Quality_QualitiesName",
                        column: x => x.QualitiesName,
                        principalTable: "Approach.Process.Quality",
                        principalColumn: "Name",
                        onDelete: ReferentialAction.Cascade);
                });

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

            migrationBuilder.CreateTable(
                name: "JoinTable.Approach.Process.QualitySublevel",
                columns: table => new
                {
                    ApproachProcessesApproachProcessId = table.Column<int>(type: "INTEGER", nullable: false),
                    QualitySublevelsName = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JoinTable.Approach.Process.QualitySublevel", x => new { x.ApproachProcessesApproachProcessId, x.QualitySublevelsName });
                    table.ForeignKey(
                        name: "FK_JoinTable.Approach.Process.QualitySublevel_Approach.Process_ApproachProcessesApproachProcessId",
                        column: x => x.ApproachProcessesApproachProcessId,
                        principalTable: "Approach.Process",
                        principalColumn: "ApproachProcessId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_JoinTable.Approach.Process.QualitySublevel_Approach.Process.QualitySublevel_QualitySublevelsName",
                        column: x => x.QualitySublevelsName,
                        principalTable: "Approach.Process.QualitySublevel",
                        principalColumn: "Name",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "QualitySublevelScenario",
                columns: table => new
                {
                    QualitySublevelsName = table.Column<string>(type: "TEXT", nullable: false),
                    ScenariosScenarioId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QualitySublevelScenario", x => new { x.QualitySublevelsName, x.ScenariosScenarioId });
                    table.ForeignKey(
                        name: "FK_QualitySublevelScenario_.Scenario_ScenariosScenarioId",
                        column: x => x.ScenariosScenarioId,
                        principalTable: ".Scenario",
                        principalColumn: "ScenarioId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_QualitySublevelScenario_Approach.Process.QualitySublevel_QualitySublevelsName",
                        column: x => x.QualitySublevelsName,
                        principalTable: "Approach.Process.QualitySublevel",
                        principalColumn: "Name",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Approach.Input.DomainArtifact",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Documentation", "Software documentation includes specifications, textual descriptions, or diagrams that document the application at different levels of abstraction." });

            migrationBuilder.InsertData(
                table: "Approach.Input.DomainArtifact",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Human expertise", "Substantial domain knowledge and technical expertise are required for applying the approach." });

            migrationBuilder.InsertData(
                table: "Approach.Input.DomainArtifact",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Ontology", "An ontology represents a structured taxonomy that reflects the semantics of a domain, e.g., through meta-data or domain elements." });

            migrationBuilder.InsertData(
                table: "Approach.Input.Executable",
                columns: new[] { "Language", "Name", "Description" },
                values: new object[] { "No specification", "Database file", "The database schema or contents are required as input." });

            migrationBuilder.InsertData(
                table: "Approach.Input.Executable",
                columns: new[] { "Language", "Name", "Description" },
                values: new object[] { "No specification", "Source code", "Source code written in an arbitrary programming language is required as input." });

            migrationBuilder.InsertData(
                table: "Approach.Input.Executable",
                columns: new[] { "Language", "Name", "Description" },
                values: new object[] { "No specification", "Test cases", "Test cases of the application are required as input." });

            migrationBuilder.InsertData(
                table: "Approach.Input.ModelArtifact",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Activity diagram", "Activity diagrams visually present a series of actions or a control flow in an application." });

            migrationBuilder.InsertData(
                table: "Approach.Input.ModelArtifact",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Business process model", "Business Process Models (BPMs) are data-driven visual representations of business processes. They contain sets of activities and tasks that accomplish an organizational goal." });

            migrationBuilder.InsertData(
                table: "Approach.Input.ModelArtifact",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Data flow diagram", "Data Flow Diagrams (DFDs) are graphical representations of functional dependencies between business functions or processes, based on the analysis of data flows." });

            migrationBuilder.InsertData(
                table: "Approach.Input.ModelArtifact",
                columns: new[] { "Name", "Description" },
                values: new object[] { "State machine diagram", "State Machine Diagrams (SMDs) shows a dynamic view of a system and describe the states that entities can enter during their lifetimes." });

            migrationBuilder.InsertData(
                table: "Approach.Input.ModelArtifact",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Use case model", "Use case diagrams are behavioral diagrams and visualize the externally visible interaction of actors with the application. They relate system and actors to each other through use cases." });

            migrationBuilder.InsertData(
                table: "Approach.Input.RuntimeArtifact",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Log traces", "Execution traces of the monolithic application, that reflect the dynamic behavior, are required as input." });

            migrationBuilder.InsertData(
                table: "Approach.Input.RuntimeArtifact",
                columns: new[] { "Name", "Description" },
                values: new object[] { "User-Application interactions", "User-interface interactions that capture the actions a user performs when using certain functionalities are required as input." });

            migrationBuilder.InsertData(
                table: "Approach.Output.Architecture",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Microservices", "" });

            migrationBuilder.InsertData(
                table: "Approach.Output.Architecture",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Services", "" });

            migrationBuilder.InsertData(
                table: "Approach.Output.Representation",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Guideline / Workflow", "The approach does not produce tangible output artifacts, but rather serves as guideline or workflow in the decomposition process. It typically requires a high degree of human expertise and offers a low degree of automation." });

            migrationBuilder.InsertData(
                table: "Approach.Output.Representation",
                columns: new[] { "Name", "Description" },
                values: new object[] { "List of services", "The approach generates a list of services that typically contains clustered elements of the atomic unit." });

            migrationBuilder.InsertData(
                table: "Approach.Output.Representation",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Source code", "The approach generates source code for individual microservices or a skeleton for their implementation." });

            migrationBuilder.InsertData(
                table: "Approach.Output.Representation",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Splitting recommendations", "The approach produces splitting recommendations or creates potential parameterizable service cuts." });

            migrationBuilder.InsertData(
                table: "Approach.Output.ServiceType",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Application services", "Application services provide functionalities specific to one application. They exist to support reuse within one application. Examples of application-task services include quoting requests." });

            migrationBuilder.InsertData(
                table: "Approach.Output.ServiceType",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Business services", "Business services correspond to business processes or use cases and are services used by users. Examples of business services include flight booking services." });

            migrationBuilder.InsertData(
                table: "Approach.Output.ServiceType",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Enterprise services", "Enterprise services are of finer granularity than business services. They implement generic business functionalities that can be reused across different applications. Examples of enterprise services include \"online payment\" and \"tax calculation\"." });

            migrationBuilder.InsertData(
                table: "Approach.Output.ServiceType",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Entity services", "Entity services provide access to and the management of the persistent data of legacy software systems. They support actions on data (CRUD) and may have side-effects like modification of shared data. Examples of entity services include management services for clients, and bank accounts." });

            migrationBuilder.InsertData(
                table: "Approach.Output.ServiceType",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Infrastructure services", "Infrastructure services allow users to deploy and run service oriented architecture systems. They include services for communication routing, protocol conversion, message processing and transformation. Examples of infrastructure services include publish–subscribe, message queues, and enterprise service buses (ESBs)." });

            migrationBuilder.InsertData(
                table: "Approach.Output.ServiceType",
                columns: new[] { "Name", "Description" },
                values: new object[] { "No specification", "" });

            migrationBuilder.InsertData(
                table: "Approach.Output.ServiceType",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Utility services", "Utility services do not directly support business services but provide some cross-cutting functionalities required by domain-specific services. Examples of typical utility services include notification, logging, and authentication." });

            migrationBuilder.InsertData(
                table: "Approach.Process.AnalysisType",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Dynamic", "Dynamic analysis is performed by examining the application at run time. Dependencies between software elements (e.g., class instantiations and accesses, function calls, relationships between database tables, etc.) are collected. To this end, a set of use cases or scenarios has to be performed that reflect the system's functionalities." });

            migrationBuilder.InsertData(
                table: "Approach.Process.AnalysisType",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Historic", "Historic analysis techniques leverage, e.g, the history data of a version control system to identify cohesive source code structures based on authors, change frequency, and correlation of changes." });

            migrationBuilder.InsertData(
                table: "Approach.Process.AnalysisType",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Lexical", "Lexical analysis techniques suppose that textual similarities between identifiers of classes, methods, or interfaces help in the service identification process." });

            migrationBuilder.InsertData(
                table: "Approach.Process.AnalysisType",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Static", "Static analysis is performed without executing an application. Commonly it is performed on source code, but can also involve interface descriptions or version control system data. The analysis involves, e.g., dependencies between classes, class attributes, or method calls. These dependencies indicate strongly connected classes that can be clustered for a single service." });

            migrationBuilder.InsertData(
                table: "Approach.Process.AtomarUnit",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Business Capability", "A business capability represents the smallest unit that the approach can treat in the course of a decomposition." });

            migrationBuilder.InsertData(
                table: "Approach.Process.AtomarUnit",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Entity", "An entity, commonly in the context of data or databases, represents the smallest unit that the approach can treat in the course of a decomposition." });

            migrationBuilder.InsertData(
                table: "Approach.Process.AtomarUnit",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Function", "A function, method, or procedure of the source code represents the smallest unit that the approach can treat in the course of a decomposition." });

            migrationBuilder.InsertData(
                table: "Approach.Process.AtomarUnit",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Functionality", "A functionality of the application, e.g., a requirement or use case, represents the smallest unit that the approach can treat in the course of a decomposition." });

            migrationBuilder.InsertData(
                table: "Approach.Process.AtomarUnit",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Interface", "An interface of the application, commonly exposed functionality through an API, represents the smallest unit that the approach can treat in the course of a decomposition." });

            migrationBuilder.InsertData(
                table: "Approach.Process.AtomarUnit",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Other", "The approach defines no or no specific smallest unit used for the decomposition." });

            migrationBuilder.InsertData(
                table: "Approach.Process.AutomationLevel",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Automatic", "An automatic approach needs only minimal human intervention in the refactoring process." });

            migrationBuilder.InsertData(
                table: "Approach.Process.AutomationLevel",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Manual", "A manual approach relies entirely on human expertise." });

            migrationBuilder.InsertData(
                table: "Approach.Process.AutomationLevel",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Semi-automatic", "An semi-automatic approach needs human expertise in the refactoring process, which is partly automated." });

            migrationBuilder.InsertData(
                table: "Approach.Process.Direction",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Bottom-up", "A bottom-up approach works on low-level artifacts like source code or databases. It thereby maximizes code reuse and minimizes changes." });

            migrationBuilder.InsertData(
                table: "Approach.Process.Direction",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Mixed", "A mixed or hybrid approach combines a top-down and a bottom-up process for identification of services." });

            migrationBuilder.InsertData(
                table: "Approach.Process.Direction",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Top-down", "A top-down approach works on high-level artifacts, e.g., requirements or use cases that characterize the system's functionalities." });

            migrationBuilder.InsertData(
                table: "Approach.Process.Quality",
                columns: new[] { "Name", "Category", "Description", "QualityName", "QualitySublevelName" },
                values: new object[] { "Autonomy", "SystemProperty", "", null, null });

            migrationBuilder.InsertData(
                table: "Approach.Process.Quality",
                columns: new[] { "Name", "Category", "Description", "QualityName", "QualitySublevelName" },
                values: new object[] { "Business", "Attribute", "", null, null });

            migrationBuilder.InsertData(
                table: "Approach.Process.Quality",
                columns: new[] { "Name", "Category", "Description", "QualityName", "QualitySublevelName" },
                values: new object[] { "Cohesion", "SystemProperty", "", null, null });

            migrationBuilder.InsertData(
                table: "Approach.Process.Quality",
                columns: new[] { "Name", "Category", "Description", "QualityName", "QualitySublevelName" },
                values: new object[] { "Compatibility", "Attribute", "", null, null });

            migrationBuilder.InsertData(
                table: "Approach.Process.Quality",
                columns: new[] { "Name", "Category", "Description", "QualityName", "QualitySublevelName" },
                values: new object[] { "Complexity", "SystemProperty", "", null, null });

            migrationBuilder.InsertData(
                table: "Approach.Process.Quality",
                columns: new[] { "Name", "Category", "Description", "QualityName", "QualitySublevelName" },
                values: new object[] { "Coupling", "SystemProperty", "", null, null });

            migrationBuilder.InsertData(
                table: "Approach.Process.Quality",
                columns: new[] { "Name", "Category", "Description", "QualityName", "QualitySublevelName" },
                values: new object[] { "Granularity", "SystemProperty", "", null, null });

            migrationBuilder.InsertData(
                table: "Approach.Process.Quality",
                columns: new[] { "Name", "Category", "Description", "QualityName", "QualitySublevelName" },
                values: new object[] { "Independence", "Attribute", "", null, null });

            migrationBuilder.InsertData(
                table: "Approach.Process.Quality",
                columns: new[] { "Name", "Category", "Description", "QualityName", "QualitySublevelName" },
                values: new object[] { "Isolation", "SystemProperty", "", null, null });

            migrationBuilder.InsertData(
                table: "Approach.Process.Quality",
                columns: new[] { "Name", "Category", "Description", "QualityName", "QualitySublevelName" },
                values: new object[] { "Maintainability", "Attribute", "", null, null });

            migrationBuilder.InsertData(
                table: "Approach.Process.Quality",
                columns: new[] { "Name", "Category", "Description", "QualityName", "QualitySublevelName" },
                values: new object[] { "Performance", "Attribute", "", null, null });

            migrationBuilder.InsertData(
                table: "Approach.Process.Quality",
                columns: new[] { "Name", "Category", "Description", "QualityName", "QualitySublevelName" },
                values: new object[] { "Portability", "Attribute", "", null, null });

            migrationBuilder.InsertData(
                table: "Approach.Process.Quality",
                columns: new[] { "Name", "Category", "Description", "QualityName", "QualitySublevelName" },
                values: new object[] { "Reliability", "Attribute", "", null, null });

            migrationBuilder.InsertData(
                table: "Approach.Process.Quality",
                columns: new[] { "Name", "Category", "Description", "QualityName", "QualitySublevelName" },
                values: new object[] { "Scalability", "Attribute", "", null, null });

            migrationBuilder.InsertData(
                table: "Approach.Process.Quality",
                columns: new[] { "Name", "Category", "Description", "QualityName", "QualitySublevelName" },
                values: new object[] { "Security", "Attribute", "", null, null });

            migrationBuilder.InsertData(
                table: "Approach.Process.Quality",
                columns: new[] { "Name", "Category", "Description", "QualityName", "QualitySublevelName" },
                values: new object[] { "Technology Heterogeneity", "SystemProperty", "", null, null });

            migrationBuilder.InsertData(
                table: "Approach.Process.Strategy",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Continuous Evolution", "The Continuous Evolution strategy aims at minimizing the efforts and maintaining the system in its current state as far as possible. Compared to the Refactor strategy, changes can be done in a more targeted manner, e.g., combined with the implementation of new features, or based on certain qualities that should be improved." });

            migrationBuilder.InsertData(
                table: "Approach.Process.Strategy",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Extension", "This strategy aims for substantially extending the application's functionality in the course of a migration to microservices and is often combined with one of the other process strategies." });

            migrationBuilder.InsertData(
                table: "Approach.Process.Strategy",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Greenfield", "The Greenfield strategy aims for building an entirely new application or system without restrictions or dependencies on the legacy application." });

            migrationBuilder.InsertData(
                table: "Approach.Process.Strategy",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Refactor", "The existing monolithic code base is split up adequately into smaller parts, eventually forming several microservices. In the process of a refactoring, the currently employed technologies like programming languages, libraries, or packages can be retained. Moving to new technologies is not a necessity and thus reduces the overall cost and effort, allowing to shorten the timeframe for the entire migration process." });

            migrationBuilder.InsertData(
                table: "Approach.Process.Strategy",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Rewrite / Rebuild", "Rewriting or rebuilding an application eases the introduction of new technologies. Individual services can be implemented using, e.g., the most suitable programming language or database technology. They can resolve current technical limitations and thereby improve several qualities of the application." });

            migrationBuilder.InsertData(
                table: "Approach.Process.Strategy",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Strangler", "The Strangler pattern suggests to iteratively replace parts or components of the system with new services in a resource-efficient and targeted manner. Existing functionalities will be implemented as services that are then attached to the existing system, while at the same time, this functionality in the legacy system is disabled. The process is completed when the newly emerged microservices application replaces the legacy system entirely." });

            migrationBuilder.InsertData(
                table: "Approach.Process.Technique",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Clustering", "Clustering is a technique of classifying and partitioning elements into clusters that share common properties. These clusters are built based on the internal homogeneity of their elements and the external separation between them. In the context of generating highly cohesive and loosely coupled services, clustering is an essential technique next to rule-based methods." });

            migrationBuilder.InsertData(
                table: "Approach.Process.Technique",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Custom heuristics", "Custom heuristics comprise techniques that have been specifically developed for the decomposition task. They do not clearly identify as one of the other mentioned techniques." });

            migrationBuilder.InsertData(
                table: "Approach.Process.Technique",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Data-flow driven", "Data-Flow driven techniques inspect the flow and processing of data throughout the application, e.g., by means of data flow diagrams." });

            migrationBuilder.InsertData(
                table: "Approach.Process.Technique",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Domain-Driven Design", "Domain-Driven Design (DDD) is a popular manual technique in the context of microservices identification. Its complexity and involvement of domain expertise makes an automation difficult." });

            migrationBuilder.InsertData(
                table: "Approach.Process.Technique",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Execution-trace modeling", "Execution-trace modeling reflects the application's runtime behavior. It can require the collection of logs or execution traces, which sometimes requires instrumenting the application and/or performing certain scenarios or user interactions." });

            migrationBuilder.InsertData(
                table: "Approach.Process.Technique",
                columns: new[] { "Name", "Description" },
                values: new object[] { "General guidelines", "No specific technique is used. The approaches usually describes the decomposition on a higher level of abstraction by proposing best practices, lessons learned, or recommendations for service identification." });

            migrationBuilder.InsertData(
                table: "Approach.Process.Technique",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Genetic algorithm", "Genetic algorithms are defined as a meta-heuristic for solving optimization problems that is based on 'natural selection' that relies on the calculation of a fitness function to reach an optimal (or near-optimal) solution. However, the yielded optimization and service cut may not necessarily be architecturally relevant." });

            migrationBuilder.InsertData(
                table: "Approach.Process.Technique",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Graph-based", "Graph-based techniques are common in the context of static code analysis, e.g., to represent source code at a higher level of abstraction." });

            migrationBuilder.InsertData(
                table: "Approach.Process.Technique",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Performance modeling", "Performance modeling techniques aim to direct the decomposition of the applications by taking into account performance and scalability aspects." });

            migrationBuilder.InsertData(
                table: "Approach.Process.Technique",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Scenario analysis", "Scenario analysis is usually associated with a top-down direction and the utilization of, e.g., use-case models as input, but can also be used in conjunction with dynamic analysis techniques." });

            migrationBuilder.InsertData(
                table: "Approach.Process.Technique",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Wrapping / Black Box", "A Wrapping / Black Box technique is characterized by leaving an existing implementation unchanged, but wraps it by an additional service layer that exposes only the needed functionality." });

            migrationBuilder.InsertData(
                table: "Approach.Usability.AccuracyPrecision",
                columns: new[] { "Name", "Description" },
                values: new object[] { "High", "Estimates the accuracy/precision of the approach as high." });

            migrationBuilder.InsertData(
                table: "Approach.Usability.AccuracyPrecision",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Low", "Estimates the accuracy/precision of the approach as low." });

            migrationBuilder.InsertData(
                table: "Approach.Usability.AccuracyPrecision",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Medium", "Estimates the accuracy/precision of the approach as medium." });

            migrationBuilder.InsertData(
                table: "Approach.Usability.AccuracyPrecision",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Not available", "" });

            migrationBuilder.InsertData(
                table: "Approach.Usability.ResultsQuality",
                columns: new[] { "Name", "Description" },
                values: new object[] { "High", "Estimates the quality of the identified candidate service(s) as high." });

            migrationBuilder.InsertData(
                table: "Approach.Usability.ResultsQuality",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Low", "Estimates the quality of the identified candidate service(s) as low." });

            migrationBuilder.InsertData(
                table: "Approach.Usability.ResultsQuality",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Medium", "Estimates the quality of the identified candidate service(s) as medium." });

            migrationBuilder.InsertData(
                table: "Approach.Usability.ResultsQuality",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Not available", "" });

            migrationBuilder.InsertData(
                table: "Approach.Usability.ToolSupport",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Industry ready", "The tool has been applied to production environments in industry." });

            migrationBuilder.InsertData(
                table: "Approach.Usability.ToolSupport",
                columns: new[] { "Name", "Description" },
                values: new object[] { "No tool support", "The approach offers no tool support." });

            migrationBuilder.InsertData(
                table: "Approach.Usability.ToolSupport",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Open source", "The tool is developed as open source software." });

            migrationBuilder.InsertData(
                table: "Approach.Usability.ToolSupport",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Prototype", "The tool is in a prototype state which can entail several limitations, such as no evaluation, limited functionality, or no support." });

            migrationBuilder.InsertData(
                table: "Approach.Usability.ValidationMethod",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Case study", "The approach was applied in a real production environment which typically involves external participants." });

            migrationBuilder.InsertData(
                table: "Approach.Usability.ValidationMethod",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Experiment", "The approach was applied to and tested on one or more (small) experimental applications." });

            migrationBuilder.InsertData(
                table: "Approach.Usability.ValidationMethod",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Industry", "The approach was applied to and tested on a industry-scale system." });

            migrationBuilder.InsertData(
                table: "Approach.Usability.ValidationMethod",
                columns: new[] { "Name", "Description" },
                values: new object[] { "No validation", "The approach documents no validation." });

            migrationBuilder.InsertData(
                table: "Tool.Type",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Decomposition", "The tool performs a decomposition into microservices." });

            migrationBuilder.InsertData(
                table: "Tool.Type",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Dynamic Analysis", "The tool performs a dynamic analysis." });

            migrationBuilder.InsertData(
                table: "Tool.Type",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Open Source", "The tool is developed as open source software." });

            migrationBuilder.InsertData(
                table: "Tool.Type",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Other", "The tool serves another purpose (see tool description)." });

            migrationBuilder.InsertData(
                table: "Tool.Type",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Static Analysis", "The tool performs a static analysis." });

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
                values: new object[] { "Analysability", null, "Maintainability" });

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
                values: new object[] { "Co-Existence", null, "Compatibility" });

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
                values: new object[] { "Reusability", null, "Maintainability" });

            migrationBuilder.InsertData(
                table: "Approach.Process.QualitySublevel",
                columns: new[] { "Name", "Description", "QualityName" },
                values: new object[] { "Testability", null, "Maintainability" });

            migrationBuilder.InsertData(
                table: "Approach.Process.QualitySublevel",
                columns: new[] { "Name", "Description", "QualityName" },
                values: new object[] { "Time Behavior", null, "Performance" });

            migrationBuilder.InsertData(
                table: "Approach.Process.QualitySublevel",
                columns: new[] { "Name", "Description", "QualityName" },
                values: new object[] { "Understandability", null, "Maintainability" });

            migrationBuilder.CreateIndex(
                name: "IX_Approach.Output_ArchitectureName",
                table: "Approach.Output",
                column: "ArchitectureName");

            migrationBuilder.CreateIndex(
                name: "IX_Approach.Output_ServiceTypeName",
                table: "Approach.Output",
                column: "ServiceTypeName");

            migrationBuilder.CreateIndex(
                name: "IX_Approach.Process.CalculationMetric_QualityName",
                table: "Approach.Process.CalculationMetric",
                column: "QualityName");

            migrationBuilder.CreateIndex(
                name: "IX_Approach.Process.CalculationMetric_QualitySublevelName",
                table: "Approach.Process.CalculationMetric",
                column: "QualitySublevelName");

            migrationBuilder.CreateIndex(
                name: "IX_Approach.Process.Quality_QualityName",
                table: "Approach.Process.Quality",
                column: "QualityName");

            migrationBuilder.CreateIndex(
                name: "IX_Approach.Process.Quality_QualitySublevelName",
                table: "Approach.Process.Quality",
                column: "QualitySublevelName");

            migrationBuilder.CreateIndex(
                name: "IX_Approach.Process.QualitySublevel_QualityName",
                table: "Approach.Process.QualitySublevel",
                column: "QualityName");

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
                name: "IX_Approaches_Identifier",
                table: "Approaches",
                column: "Identifier",
                unique: true);

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
                name: "IX_JoinTable.Approach.Output.Representation_RepresentationOutputsName",
                table: "JoinTable.Approach.Output.Representation",
                column: "RepresentationOutputsName");

            migrationBuilder.CreateIndex(
                name: "IX_JoinTable.Approach.Process.AnalysisType_ApproachProcessesApproachProcessId",
                table: "JoinTable.Approach.Process.AnalysisType",
                column: "ApproachProcessesApproachProcessId");

            migrationBuilder.CreateIndex(
                name: "IX_JoinTable.Approach.Process.AtomarUnit_AtomarUnitsName",
                table: "JoinTable.Approach.Process.AtomarUnit",
                column: "AtomarUnitsName");

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
                name: "IX_JoinTable.Approach.Process.QualitySublevel_QualitySublevelsName",
                table: "JoinTable.Approach.Process.QualitySublevel",
                column: "QualitySublevelsName");

            migrationBuilder.CreateIndex(
                name: "IX_JoinTable.Approach.Process.Strategy_ProcessStrategiesName",
                table: "JoinTable.Approach.Process.Strategy",
                column: "ProcessStrategiesName");

            migrationBuilder.CreateIndex(
                name: "IX_JoinTable.Approach.Process.Technique_TechniquesName",
                table: "JoinTable.Approach.Process.Technique",
                column: "TechniquesName");

            migrationBuilder.CreateIndex(
                name: "IX_JoinTable.Approach.Usability.Tool_ToolsToolId",
                table: "JoinTable.Approach.Usability.Tool",
                column: "ToolsToolId");

            migrationBuilder.CreateIndex(
                name: "IX_JoinTable.Tool.Type_ToolsToolId",
                table: "JoinTable.Tool.Type",
                column: "ToolsToolId");

            migrationBuilder.CreateIndex(
                name: "IX_QualityScenario_ScenariosScenarioId",
                table: "QualityScenario",
                column: "ScenariosScenarioId");

            migrationBuilder.CreateIndex(
                name: "IX_QualitySublevelScenario_ScenariosScenarioId",
                table: "QualitySublevelScenario",
                column: "ScenariosScenarioId");

            migrationBuilder.CreateIndex(
                name: "IX_Tools_Identifier",
                table: "Tools",
                column: "Identifier",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Tools_ToolSourceId",
                table: "Tools",
                column: "ToolSourceId",
                unique: true);

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
                name: "FK_Approach.Process.QualitySublevel_Approach.Process.Quality_QualityName",
                table: "Approach.Process.QualitySublevel");

            migrationBuilder.DropTable(
                name: "Approach.Process.CalculationMetric");

            migrationBuilder.DropTable(
                name: "ArchitecturalDesign");

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
                name: "JoinTable.Approach.Output.Representation");

            migrationBuilder.DropTable(
                name: "JoinTable.Approach.Process.AnalysisType");

            migrationBuilder.DropTable(
                name: "JoinTable.Approach.Process.AtomarUnit");

            migrationBuilder.DropTable(
                name: "JoinTable.Approach.Process.AutomationLevel");

            migrationBuilder.DropTable(
                name: "JoinTable.Approach.Process.Direction");

            migrationBuilder.DropTable(
                name: "JoinTable.Approach.Process.Quality");

            migrationBuilder.DropTable(
                name: "JoinTable.Approach.Process.QualitySublevel");

            migrationBuilder.DropTable(
                name: "JoinTable.Approach.Process.Strategy");

            migrationBuilder.DropTable(
                name: "JoinTable.Approach.Process.Technique");

            migrationBuilder.DropTable(
                name: "JoinTable.Approach.Usability.Tool");

            migrationBuilder.DropTable(
                name: "JoinTable.Tool.Type");

            migrationBuilder.DropTable(
                name: "Objectives");

            migrationBuilder.DropTable(
                name: "ProjectDescription");

            migrationBuilder.DropTable(
                name: "QualityScenario");

            migrationBuilder.DropTable(
                name: "QualitySublevelScenario");

            migrationBuilder.DropTable(
                name: "StrategicGoals");

            migrationBuilder.DropTable(
                name: "ArchitecturalDesign.Source");

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
                name: "Approach.Output.Representation");

            migrationBuilder.DropTable(
                name: "Approaches");

            migrationBuilder.DropTable(
                name: "Approach.Process.AnalysisType");

            migrationBuilder.DropTable(
                name: "Approach.Process.AtomarUnit");

            migrationBuilder.DropTable(
                name: "Approach.Process.AutomationLevel");

            migrationBuilder.DropTable(
                name: "Approach.Process.Direction");

            migrationBuilder.DropTable(
                name: "Approach.Process.Strategy");

            migrationBuilder.DropTable(
                name: "Approach.Process.Technique");

            migrationBuilder.DropTable(
                name: "Tool.Type");

            migrationBuilder.DropTable(
                name: "Tools");

            migrationBuilder.DropTable(
                name: ".Scenario");

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
                name: "Tool.Source");

            migrationBuilder.DropTable(
                name: "Approach.Usability.AccuracyPrecision");

            migrationBuilder.DropTable(
                name: "Approach.Usability.ResultsQuality");

            migrationBuilder.DropTable(
                name: "Approach.Usability.ToolSupport");

            migrationBuilder.DropTable(
                name: "Approach.Usability.ValidationMethod");

            migrationBuilder.DropTable(
                name: "Approach.Process.Quality");

            migrationBuilder.DropTable(
                name: "Approach.Process.QualitySublevel");
        }
    }
}

using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Repository.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ProjectDescription",
                columns: table => new
                {
                    ProjectDescriptionId = table.Column<int>(type: "INTEGER", nullable: false),
                    Systemname = table.Column<string>(type: "INTEGER", nullable: false),
                    Ownership = table.Column<string>(type: "TEXT", nullable: true),
                    Creation_date = table.Column<string>(type: "TEXT", nullable: true),
                    Systemsize_LOC = table.Column<string>(type: "INTEGER", nullable: true),
                    Hosting_model = table.Column<string>(type: "TEXT", nullable: true),
                    Number_of_Teams = table.Column<string>(type: "INTEGER", nullable: true),
                    Number_of_Developers = table.Column<string>(type: "INTEGER", nullable: true),
                    Processmodel = table.Column<string>(type: "TEXT", nullable: true),
                    Architecturepattern = table.Column<object>(type: "TEXT", nullable: true),
                    Languages = table.Column<object>(type: "TEXT", nullable: true),
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
                columns: table => new{
                    StrategicGoalsId = table.Column<int>(type: "INTEGER", nullable: false),
                    Method = table.Column<string>(type: "TEXT", nullable: true),
                    Owner = table.Column<string>(type: "TEXT", nullable: true),
                    Participants = table.Column<string>(type: "TEXT", nullable: true)
                    //Objectives = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StrategicGoals", x => x.StrategicGoalsId);
                });

            migrationBuilder.CreateTable(
                name: "Summary",
                columns: table => new{
                    SummaryId = table.Column<int>(type: "INTEGER", nullable: false),
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Summary", x => x.SummaryId);
                });


            migrationBuilder.CreateTable(
                name: "Assessment",
                columns: table => new{
                    AssessmentId = table.Column<int>(type: "INTEGER", nullable: false),
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Assessment", x => x.AssessmentId);
                });



           /* migrationBuilder.CreateTable(
                name: "Project",
                columns: table => new
                {
                    ProjectId = table.Column<string>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: true)
                    
                },
                      /* table.ForeignKey(
                        name: "FK_Approach.Output_Approach.Output.Architecture_ArchitectureName",
                        column: x => x.ArchitectureName,
                        principalTable: "Approach.Output.Architecture",
                        principalColumn: "Name",
                        onDelete: ReferentialAction.Cascade);
                constraints: table =>
                {
                    table.PrimaryKey("PK_Project", x => x.ProjectId);
                });*/

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


           /* migrationBuilder.InsertData(
                table: "ProjectDescription",
                columns: new[] { "ProjectDescriptionId", "Systemname" ,"Ownership"},
                values: new object[] { "4","bitte gehe","" });*/

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
                values: new object[] { "Documentation", "Software documentation describes and documents systems at different levels of abstraction. It includes textual descriptions as well as diagrams and models" });

            migrationBuilder.InsertData(
                table: "Approach.Input.DomainArtifact",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Human expertise", "" });

            migrationBuilder.InsertData(
                table: "Approach.Input.DomainArtifact",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Ontology", "An ontology is a structured set of terms representing the semantics of a domain, whether through metadata or elements of a knowledge domain" });

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
                values: new object[] { "Activity diagram", "Activity diagrams visually presents a series of actions or flow of control in a system." });

            migrationBuilder.InsertData(
                table: "Approach.Input.ModelArtifact",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Business process model", "Business Process Models (BPMs) describe sets of activities and tasks that accomplish an organizational goal" });

            migrationBuilder.InsertData(
                table: "Approach.Input.ModelArtifact",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Data flow diagram", "Data Flow Diagrams (DFDs) are graphical representations of functional dependencies, based on the analysis of data flows, between business functions or processes" });

            migrationBuilder.InsertData(
                table: "Approach.Input.ModelArtifact",
                columns: new[] { "Name", "Description" },
                values: new object[] { "State machine diagram", "State Machine Diagrams (SMDs) shows a dynamic view of a system and describe the different states that entities can have during their lifetimes" });

            migrationBuilder.InsertData(
                table: "Approach.Input.ModelArtifact",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Use case model", "Use case diagrams are behavioral diagrams and visualize the externally visible interaction of actors with the system under development. The diagram consists of the system, associated use cases and actors and relates them to each other." });

            migrationBuilder.InsertData(
                table: "Approach.Input.RuntimeArtifact",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Log traces", "Execution traces of legacy software systems depicting the dynamic behavior of the systems" });

            migrationBuilder.InsertData(
                table: "Approach.Input.RuntimeArtifact",
                columns: new[] { "Name", "Description" },
                values: new object[] { "User-Application interactions", "User-interface inputs capturing the relationship between users and the system’s functionalities." });

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
                values: new object[] { "Dynamic", "Dynamic analysis is performed by examining the software system at run time. Dependencies between software elements (e.g., class instantiations and accesses, function calls, relationships between database tables, etc.) are collected during the program execution. The execution is performed based on a set of cases that covers the system functionalities, called execution scenarios" });

            migrationBuilder.InsertData(
                table: "Approach.Process.AnalysisType",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Historic", "" });

            migrationBuilder.InsertData(
                table: "Approach.Process.AnalysisType",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Lexical", "Lexical analysis techniques suppose that the similarity between the classes should be taken into account during service identification process. This analysis plays the main role in approaches that used features location and textual similarity techniques." });

            migrationBuilder.InsertData(
                table: "Approach.Process.AnalysisType",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Static", "Static analysis is performed without executing a software system. Dependencies between classes are potential relationships, like method calls and access attributes. These dependencies are analyzed to identify strongly connected classes, for example, to identify services." });

            migrationBuilder.InsertData(
                table: "Approach.Process.AutomationLevel",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Automatic", "Automatic approaches do not need any human intervention during the identification process." });

            migrationBuilder.InsertData(
                table: "Approach.Process.AutomationLevel",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Manual", "Manual approaches depend entirely on human experts." });

            migrationBuilder.InsertData(
                table: "Approach.Process.AutomationLevel",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Semi-automatic", "Semi-automatic approaches need human experts to perform some of the tasks." });

            migrationBuilder.InsertData(
                table: "Approach.Process.Direction",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Bottom-up", "A bottom-up process starts with low-level artifacts to maximize code reuse and minimize changes." });

            migrationBuilder.InsertData(
                table: "Approach.Process.Direction",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Mixed", "A mixed hybrid process combines a top-down and a bottom-up process. It uses both requirements and implementation artifacts to identify the candidate services." });

            migrationBuilder.InsertData(
                table: "Approach.Process.Direction",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Top-down", "A top-down process starts with high-level artifacts, e.g., domain analysis or requirement characterization of systems to define their functionalities." });

            migrationBuilder.InsertData(
                table: "Approach.Process.Quality",
                columns: new[] { "Name", "Category", "Description" },
                values: new object[] { "Cohesion", "Metric", "Cohesion is a measure of the strength of the relationships among programming entities (e.g., classes, functions, etc.) implementing a service and the functionality provided by the service." });

            migrationBuilder.InsertData(
                table: "Approach.Process.Quality",
                columns: new[] { "Name", "Category", "Description" },
                values: new object[] { "Composability", "Requirement", "Services should be composable with one another to be reused and integrated as services that control other services or that provide functionalities to other services." });

            migrationBuilder.InsertData(
                table: "Approach.Process.Quality",
                columns: new[] { "Name", "Category", "Description" },
                values: new object[] { "Coupling", "Metric", "The dependencies among services should be minimized and the functionalities should be encapsulated to limit the impact of changes in one service to other service." });

            migrationBuilder.InsertData(
                table: "Approach.Process.Quality",
                columns: new[] { "Name", "Category", "Description" },
                values: new object[] { "Granularity", "Metric", "An adequate granularity is a primary concern of service identification approaches. It can be adjusted to the scope of the functionality offered by the service." });

            migrationBuilder.InsertData(
                table: "Approach.Process.Quality",
                columns: new[] { "Name", "Category", "Description" },
                values: new object[] { "Interoperability", "Requirement", "The ability of a service to communicate and be invoked by other systems/services implemented in different programming languages." });

            migrationBuilder.InsertData(
                table: "Approach.Process.Quality",
                columns: new[] { "Name", "Category", "Description" },
                values: new object[] { "Maintainability", "Requirement", "Services should ease the effort to modify their implementation, to identify root causes of failures, to verify changes, etc." });

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

            migrationBuilder.InsertData(
                table: "Approach.Process.Technique",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Clustering", "Clustering consists of classifying and partitioning data into clusters that share common properties. These clusters are built based on the internal homogeneity of their elements and the external separation between them." });

            migrationBuilder.InsertData(
                table: "Approach.Process.Technique",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Custom heuristics", "Custom heuristic algorithms to decompose legacy software into Service Oriented Architecture differing from predefined algorithms." });

            migrationBuilder.InsertData(
                table: "Approach.Process.Technique",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Formal concept analysis", "A method for data analysis where we derive implicit relationships between objects in a formal way. It is also considered as a principled way of grouping objects that have common properties." });

            migrationBuilder.InsertData(
                table: "Approach.Process.Technique",
                columns: new[] { "Name", "Description" },
                values: new object[] { "General guidelines", "Proposes best practices, lessons learned, or recommendations for service identification." });

            migrationBuilder.InsertData(
                table: "Approach.Process.Technique",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Genetic algorithm", "A meta-heuristic for solving optimization problems that is based on \"natural selection\". It relies on the calculation of a fitness function to reach an optimal (or near-optimal) solution. By definition, an optimal solution is a feasible solution where the fitness function reaches its maximum (or minimum) value." });

            migrationBuilder.InsertData(
                table: "Approach.Process.Technique",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Wrapping", "A black-box identification technique that encapsulates the legacy system with a service layer without changing its implementation. The wrapper provides access to the legacy system through a service encapsulation layer that exposes only the functionalities desired by the software architect." });

            migrationBuilder.InsertData(
                table: "Approach.Usability.AccuracyPrecision",
                columns: new[] { "Name", "Description" },
                values: new object[] { "High", "Estimates the accuracy/precision of the service identification approach as high." });

            migrationBuilder.InsertData(
                table: "Approach.Usability.AccuracyPrecision",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Low", "Estimates the accuracy/precision of the service identification approach as low." });

            migrationBuilder.InsertData(
                table: "Approach.Usability.AccuracyPrecision",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Medium", "Estimates the accuracy/precision of the service identification approach as medium." });

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
                values: new object[] { "Industry ready", "The approach has a tool implementation which is industry ready." });

            migrationBuilder.InsertData(
                table: "Approach.Usability.ToolSupport",
                columns: new[] { "Name", "Description" },
                values: new object[] { "No tool support", "" });

            migrationBuilder.InsertData(
                table: "Approach.Usability.ToolSupport",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Open source", "The approach has a tool implementation which is open source." });

            migrationBuilder.InsertData(
                table: "Approach.Usability.ToolSupport",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Prototype", "The approach has a prototype tool which was implementation." });

            migrationBuilder.InsertData(
                table: "Approach.Usability.ValidationMethod",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Case study", "" });

            migrationBuilder.InsertData(
                table: "Approach.Usability.ValidationMethod",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Experiment", "The approach was applied to and tested on a (small) experimental system." });

            migrationBuilder.InsertData(
                table: "Approach.Usability.ValidationMethod",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Industry", "The approach was applied to and tested on a real industrial system." });

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
                name: "IX_Approaches_Identifier",
                table: "Approaches",
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
                name:"ProjectDescription"
            );

            migrationBuilder.DropTable(
                name: "StrategicGoals");


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

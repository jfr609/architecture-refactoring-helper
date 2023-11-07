using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Repository.Migrations
{
    public partial class removeUsabilityFKRequired : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Approach.Process.Technique",
                keyColumn: "Name",
                keyValue: "Formal concept analysis");

            migrationBuilder.DeleteData(
                table: "Approach.Process.Technique",
                keyColumn: "Name",
                keyValue: "Wrapping");

            migrationBuilder.InsertData(
                table: "Approach.Output.Representation",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Guideline / Workflow", "Software documentation describes and documents systems at different levels of abstraction. It includes textual descriptions as well as diagrams and models" });

            migrationBuilder.InsertData(
                table: "Approach.Output.Representation",
                columns: new[] { "Name", "Description" },
                values: new object[] { "List of services", "" });

            migrationBuilder.InsertData(
                table: "Approach.Output.Representation",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Source code", "An ontology is a structured set of terms representing the semantics of a domain, whether through metadata or elements of a knowledge domain" });

            migrationBuilder.InsertData(
                table: "Approach.Output.Representation",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Splitting recommendations", "Software documentation describes and documents systems at different levels of abstraction. It includes textual descriptions as well as diagrams and models" });

            migrationBuilder.InsertData(
                table: "Approach.Process.AtomarUnit",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Business Capability", "Clustering consists of classifying and partitioning data into clusters that share common properties. These clusters are built based on the internal homogeneity of their elements and the external separation between them." });

            migrationBuilder.InsertData(
                table: "Approach.Process.AtomarUnit",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Entity", "Custom heuristic algorithms to decompose legacy software into Service Oriented Architecture differing from predefined algorithms." });

            migrationBuilder.InsertData(
                table: "Approach.Process.AtomarUnit",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Function", "A black-box identification technique that encapsulates the legacy system with a service layer without changing its implementation. The wrapper provides access to the legacy system through a service encapsulation layer that exposes only the functionalities desired by the software architect." });

            migrationBuilder.InsertData(
                table: "Approach.Process.AtomarUnit",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Functionality", "A meta-heuristic for solving optimization problems that is based on \"natural selection\". It relies on the calculation of a fitness function to reach an optimal (or near-optimal) solution. By definition, an optimal solution is a feasible solution where the fitness function reaches its maximum (or minimum) value." });

            migrationBuilder.InsertData(
                table: "Approach.Process.AtomarUnit",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Interface", "Custom heuristic algorithms to decompose legacy software into Service Oriented Architecture differing from predefined algorithms." });

            migrationBuilder.InsertData(
                table: "Approach.Process.AtomarUnit",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Other", "Custom heuristic algorithms to decompose legacy software into Service Oriented Architecture differing from predefined algorithms." });

            migrationBuilder.InsertData(
                table: "Approach.Process.Strategy",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Continuous Evolution", "Custom heuristic algorithms to decompose legacy software into Service Oriented Architecture differing from predefined algorithms." });

            migrationBuilder.InsertData(
                table: "Approach.Process.Strategy",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Extension", "Custom heuristic algorithms to decompose legacy software into Service Oriented Architecture differing from predefined algorithms." });

            migrationBuilder.InsertData(
                table: "Approach.Process.Strategy",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Greenfield", "A black-box identification technique that encapsulates the legacy system with a service layer without changing its implementation. The wrapper provides access to the legacy system through a service encapsulation layer that exposes only the functionalities desired by the software architect." });

            migrationBuilder.InsertData(
                table: "Approach.Process.Strategy",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Refactor", "Clustering consists of classifying and partitioning data into clusters that share common properties. These clusters are built based on the internal homogeneity of their elements and the external separation between them." });

            migrationBuilder.InsertData(
                table: "Approach.Process.Strategy",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Rewrite / Rebuild", "A meta-heuristic for solving optimization problems that is based on \"natural selection\". It relies on the calculation of a fitness function to reach an optimal (or near-optimal) solution. By definition, an optimal solution is a feasible solution where the fitness function reaches its maximum (or minimum) value." });

            migrationBuilder.InsertData(
                table: "Approach.Process.Strategy",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Strangler", "Custom heuristic algorithms to decompose legacy software into Service Oriented Architecture differing from predefined algorithms." });

            migrationBuilder.InsertData(
                table: "Approach.Process.Technique",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Data-flow driven", "A black-box identification technique that encapsulates the legacy system with a service layer without changing its implementation. The wrapper provides access to the legacy system through a service encapsulation layer that exposes only the functionalities desired by the software architect." });

            migrationBuilder.InsertData(
                table: "Approach.Process.Technique",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Domain-Driven Design", "A black-box identification technique that encapsulates the legacy system with a service layer without changing its implementation. The wrapper provides access to the legacy system through a service encapsulation layer that exposes only the functionalities desired by the software architect." });

            migrationBuilder.InsertData(
                table: "Approach.Process.Technique",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Execution-trace modeling", "A black-box identification technique that encapsulates the legacy system with a service layer without changing its implementation. The wrapper provides access to the legacy system through a service encapsulation layer that exposes only the functionalities desired by the software architect." });

            migrationBuilder.InsertData(
                table: "Approach.Process.Technique",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Graph-based", "A black-box identification technique that encapsulates the legacy system with a service layer without changing its implementation. The wrapper provides access to the legacy system through a service encapsulation layer that exposes only the functionalities desired by the software architect." });

            migrationBuilder.InsertData(
                table: "Approach.Process.Technique",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Performance modeling", "A black-box identification technique that encapsulates the legacy system with a service layer without changing its implementation. The wrapper provides access to the legacy system through a service encapsulation layer that exposes only the functionalities desired by the software architect." });

            migrationBuilder.InsertData(
                table: "Approach.Process.Technique",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Scenario analysis", "A black-box identification technique that encapsulates the legacy system with a service layer without changing its implementation. The wrapper provides access to the legacy system through a service encapsulation layer that exposes only the functionalities desired by the software architect." });

            migrationBuilder.InsertData(
                table: "Approach.Process.Technique",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Wrapping / Black Box", "A black-box identification technique that encapsulates the legacy system with a service layer without changing its implementation. The wrapper provides access to the legacy system through a service encapsulation layer that exposes only the functionalities desired by the software architect." });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Approach.Output.Representation",
                keyColumn: "Name",
                keyValue: "Guideline / Workflow");

            migrationBuilder.DeleteData(
                table: "Approach.Output.Representation",
                keyColumn: "Name",
                keyValue: "List of services");

            migrationBuilder.DeleteData(
                table: "Approach.Output.Representation",
                keyColumn: "Name",
                keyValue: "Source code");

            migrationBuilder.DeleteData(
                table: "Approach.Output.Representation",
                keyColumn: "Name",
                keyValue: "Splitting recommendations");

            migrationBuilder.DeleteData(
                table: "Approach.Process.AtomarUnit",
                keyColumn: "Name",
                keyValue: "Business Capability");

            migrationBuilder.DeleteData(
                table: "Approach.Process.AtomarUnit",
                keyColumn: "Name",
                keyValue: "Entity");

            migrationBuilder.DeleteData(
                table: "Approach.Process.AtomarUnit",
                keyColumn: "Name",
                keyValue: "Function");

            migrationBuilder.DeleteData(
                table: "Approach.Process.AtomarUnit",
                keyColumn: "Name",
                keyValue: "Functionality");

            migrationBuilder.DeleteData(
                table: "Approach.Process.AtomarUnit",
                keyColumn: "Name",
                keyValue: "Interface");

            migrationBuilder.DeleteData(
                table: "Approach.Process.AtomarUnit",
                keyColumn: "Name",
                keyValue: "Other");

            migrationBuilder.DeleteData(
                table: "Approach.Process.Strategy",
                keyColumn: "Name",
                keyValue: "Continuous Evolution");

            migrationBuilder.DeleteData(
                table: "Approach.Process.Strategy",
                keyColumn: "Name",
                keyValue: "Extension");

            migrationBuilder.DeleteData(
                table: "Approach.Process.Strategy",
                keyColumn: "Name",
                keyValue: "Greenfield");

            migrationBuilder.DeleteData(
                table: "Approach.Process.Strategy",
                keyColumn: "Name",
                keyValue: "Refactor");

            migrationBuilder.DeleteData(
                table: "Approach.Process.Strategy",
                keyColumn: "Name",
                keyValue: "Rewrite / Rebuild");

            migrationBuilder.DeleteData(
                table: "Approach.Process.Strategy",
                keyColumn: "Name",
                keyValue: "Strangler");

            migrationBuilder.DeleteData(
                table: "Approach.Process.Technique",
                keyColumn: "Name",
                keyValue: "Data-flow driven");

            migrationBuilder.DeleteData(
                table: "Approach.Process.Technique",
                keyColumn: "Name",
                keyValue: "Domain-Driven Design");

            migrationBuilder.DeleteData(
                table: "Approach.Process.Technique",
                keyColumn: "Name",
                keyValue: "Execution-trace modeling");

            migrationBuilder.DeleteData(
                table: "Approach.Process.Technique",
                keyColumn: "Name",
                keyValue: "Graph-based");

            migrationBuilder.DeleteData(
                table: "Approach.Process.Technique",
                keyColumn: "Name",
                keyValue: "Performance modeling");

            migrationBuilder.DeleteData(
                table: "Approach.Process.Technique",
                keyColumn: "Name",
                keyValue: "Scenario analysis");

            migrationBuilder.DeleteData(
                table: "Approach.Process.Technique",
                keyColumn: "Name",
                keyValue: "Wrapping / Black Box");

            migrationBuilder.InsertData(
                table: "Approach.Process.Technique",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Formal concept analysis", "A method for data analysis where we derive implicit relationships between objects in a formal way. It is also considered as a principled way of grouping objects that have common properties." });

            migrationBuilder.InsertData(
                table: "Approach.Process.Technique",
                columns: new[] { "Name", "Description" },
                values: new object[] { "Wrapping", "A black-box identification technique that encapsulates the legacy system with a service layer without changing its implementation. The wrapper provides access to the legacy system through a service encapsulation layer that exposes only the functionalities desired by the software architect." });
        }
    }
}

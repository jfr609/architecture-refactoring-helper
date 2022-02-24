using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Repository.Models;

namespace Repository.DatabaseConfigurations;

public class RefactoringApproachEntityTypeConfiguration : IEntityTypeConfiguration<RefactoringApproach>
{
    public void Configure(EntityTypeBuilder<RefactoringApproach> builder)
    {
        builder.ToTable(Constants.TABLE_NAME_APPROACH + "es");

        builder.HasData(
            new RefactoringApproach
            {
                RefactoringApproachId = 1,
                ApproachSource = new ApproachSource
                {
                    ApproachSourceId = 1,
                    Title = "Functionality-oriented Microservice Extraction Based on Execution Trace Clustering",
                    Link = "https://ieeexplore.ieee.org/abstract/document/8456351",
                    Year = 2018,
                    Authors = "W. Jin, T. Liu, Q. Zheng, D. Cui and Y. Cai" 
                },
                RuntimeArtifactInputs = new List<RuntimeArtifactInput>
                {
                    new()
                    {
                        Name = "Log traces"
                    },
                    new()
                    {
                        Name = "User-Application interactions"
                    }
                },
                DomainArtifactInputs = new List<DomainArtifactInput>
                {
                    new()
                    {
                        Name = "Human expertise"
                    }
                },
                ExecutableInputs = new List<ExecutableInput>
                {
                    new()
                    {
                        Name = "Source code",
                        Language = "No specification"
                    },
                    new()
                    {
                        Name = "Test cases",
                        Language = "No specification"
                    }
                },
                ApproachProcess = new ApproachProcess
                {
                    ApproachProcessId = 1,
                    Directions = new List<Direction>
                    {
                        new()
                        {
                            Name = "Bottom-up"
                        }
                    },
                    Qualities = new List<Quality>
                    {
                        new()
                        {
                            Name = "Coupling",
                            Category = QualityCategory.Metric
                        },
                        new()
                        {
                            Name = "Cohesion",
                            Category = QualityCategory.Metric
                        }
                    },
                    Techniques = new List<Technique>
                    {
                        new()
                        {
                            Name = "Clustering"
                        },
                        new()
                        {
                            Name = "Custom heuristics"
                        } 
                    },
                    AnalysisTypes = new List<AnalysisType>
                    {
                        new()
                        {
                            Name = "Dynamic"
                        }
                    },
                    AutomationLevels = new List<AutomationLevel>
                    {
                        new()
                        {
                            Name = "Semi-automatic"
                        }
                    }
                },
                ApproachOutputs = new List<ApproachOutput>
                {
                    new()
                    {
                        ApproachOutputId = 1,
                        Architecture = new Architecture
                        {
                            Name = "Microservices"
                        },
                        ServiceType = new ServiceType
                        {
                            Name = "No specification"
                        }
                    }
                },
                ApproachUsability = new ApproachUsability
                {
                    ApproachUsabilityId = 1,
                    AccuracyPrecision = new AccuracyPrecision
                    {
                        Name = "Not available"
                    },
                    ResultsQualitiy = new ResultsQuality
                    {
                        Name = "Low"
                    },
                    ToolSupport = new ToolSupport
                    {
                        Name = "No tool support"
                    },
                    ValidationMethod = new ValidationMethod
                    {
                        Name = "Experiment"
                    }
                }
            });
    }
}
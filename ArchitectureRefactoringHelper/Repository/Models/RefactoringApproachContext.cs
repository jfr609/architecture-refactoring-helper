using Microsoft.EntityFrameworkCore;
using Repository.DatabaseConfigurations;
using Repository.Models.Database;

namespace Repository.Models;

public class RefactoringApproachContext : DbContext
{
    public DbSet<RefactoringApproach> RefactoringApproaches { get; set; }

    public DbSet<ApproachSource> ApproachSources { get; set; }

    public DbSet<ApproachProcess> ApproachProcesses { get; set; }
    public DbSet<ApproachOutput> ApproachOutputs { get; set; }
    public DbSet<ApproachUsability> ApproachUsabilities { get; set; }

    public DbSet<DomainArtifactInput> DomainArtifactInputs { get; set; }
    public DbSet<RuntimeArtifactInput> RuntimeArtifactInputs { get; set; }
    public DbSet<ModelArtifactInput> ModelArtifactInputs { get; set; }
    public DbSet<ExecutableInput> ExecutableInputs { get; set; }

    public DbSet<Quality> Qualities { get; set; }
    public DbSet<Direction> Directions { get; set; }
    public DbSet<AutomationLevel> AutomationLevels { get; set; }
    public DbSet<AnalysisType> AnalysisTypes { get; set; }
    public DbSet<Technique> Techniques { get; set; }

    public DbSet<Architecture> Architectures { get; set; }
    public DbSet<ServiceType> ServiceTypes { get; set; }

    public DbSet<ResultsQuality> ResultsQualities { get; set; }
    public DbSet<ToolSupport> ToolSupports { get; set; }
    public DbSet<AccuracyPrecision> AccuracyPrecisions { get; set; }
    public DbSet<ValidationMethod> ValidationMethods { get; set; }

    public string DbPath { get; }

    public RefactoringApproachContext()
    {
        var path = Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData);
        DbPath = Path.Join(path, "approaches.db");
    }

    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {
        options.UseSqlite($"Data Source={DbPath}");
        options.EnableSensitiveDataLogging();
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Apply Configurations
        modelBuilder.ApplyConfiguration(new RefactoringApproachConfiguration());
        modelBuilder.ApplyConfiguration(new ApproachProcessConfiguration());
        modelBuilder.ApplyConfiguration(new ApproachUsabilityConfiguration());

        modelBuilder.ApplyConfiguration(new DomainArtifactInputConfiguration());
        modelBuilder.ApplyConfiguration(new RuntimeArtifactInputConfiguration());
        modelBuilder.ApplyConfiguration(new ModelArtifactInputConfiguration());
        modelBuilder.ApplyConfiguration(new ExecutableInputInputConfiguration());

        modelBuilder.ApplyConfiguration(new QualityConfiguration());
        modelBuilder.ApplyConfiguration(new DirectionConfiguration());
        modelBuilder.ApplyConfiguration(new AutomationLevelConfiguration());
        modelBuilder.ApplyConfiguration(new AnalysisTypeConfiguration());
        modelBuilder.ApplyConfiguration(new TechniqueConfiguration());

        modelBuilder.ApplyConfiguration(new ArchitectureConfiguration());
        modelBuilder.ApplyConfiguration(new ServiceTypeConfiguration());

        modelBuilder.ApplyConfiguration(new ValidationMethodConfiguration());
        modelBuilder.ApplyConfiguration(new AccuracyPrecisionConfiguration());
        modelBuilder.ApplyConfiguration(new ToolSupportConfiguration());
        modelBuilder.ApplyConfiguration(new ResultsQualityConfiguration());
    }
}
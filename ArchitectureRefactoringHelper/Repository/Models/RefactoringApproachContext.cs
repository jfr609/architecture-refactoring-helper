using Microsoft.EntityFrameworkCore;
using Repository.DatabaseConfigurations;

namespace Repository.Models;

public class RefactoringApproachContext : DbContext
{
    public DbSet<RefactoringApproach> RefactoringApproaches { get; set; }
    
    public DbSet<ApproachSource> ApproachSources { get; set; }
    
    // public DbSet<ApproachInput> ApproachInputs { get; set; }
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
    
    // public DbSet<ProcessStrategy> ProcessStrategies { get; set; }
    // public DbSet<DecompositionStrategy> DecompositionStrategies { get; set; }

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
        // Define Join Table for RefactoringApproach and ApproachOutput
        modelBuilder.Entity<RefactoringApproach>()
            .HasMany(left => left.ApproachOutputs)
            .WithMany(right => right.RefactoringApproaches)
            .UsingEntity(join => join.ToTable(Constants.JOIN_TABLE_PREFIX + Constants.TABLE_NAME_APPROACH_OUTPUT));
        
        // Define Join Table for RefactoringApproach and DomainArtifactInput
        modelBuilder.Entity<RefactoringApproach>()
            .HasMany(left => left.DomainArtifactInputs)
            .WithMany(right => right.RefactoringApproaches)
            .UsingEntity(join => join.ToTable(Constants.JOIN_TABLE_PREFIX + Constants.TABLE_NAME_APPROACH_INPUT_DOMAINARTIFACT));
        
        // Define Join Table for RefactoringApproach and RuntimeArtifactInput
        modelBuilder.Entity<RefactoringApproach>()
            .HasMany(left => left.RuntimeArtifactInputs)
            .WithMany(right => right.RefactoringApproaches)
            .UsingEntity(join => join.ToTable(Constants.JOIN_TABLE_PREFIX + Constants.TABLE_NAME_APPROACH_INPUT_RUNTIMEARTIFACT));
        
        // Define Join Table for RefactoringApproach and ModelArtifactInput
        modelBuilder.Entity<RefactoringApproach>()
            .HasMany(left => left.ModelArtifactInputs)
            .WithMany(right => right.RefactoringApproaches)
            .UsingEntity(join => join.ToTable(Constants.JOIN_TABLE_PREFIX + Constants.TABLE_NAME_APPROACH_INPUT_MODELARTIFACT));
        
        // Define Join Table for RefactoringApproach and ExecutableInput
        modelBuilder.Entity<RefactoringApproach>()
            .HasMany(left => left.ExecutableInputs)
            .WithMany(right => right.RefactoringApproaches)
            .UsingEntity(join => join.ToTable(Constants.JOIN_TABLE_PREFIX + Constants.TABLE_NAME_APPROACH_INPUT_EXECUTABLE));
        
        // Define Join Table for ApproachProcess and Quality
        modelBuilder.Entity<ApproachProcess>()
            .HasMany(left => left.Qualities)
            .WithMany(right => right.ApproachProcesses)
            .UsingEntity(join => join.ToTable(Constants.JOIN_TABLE_PREFIX + Constants.TABLE_NAME_APPROACH_PROCESS_QUALITY));
        
        // Define Join Table for ApproachProcess and Direction
        modelBuilder.Entity<ApproachProcess>()
            .HasMany(left => left.Directions)
            .WithMany(right => right.ApproachProcesses)
            .UsingEntity(join => join.ToTable(Constants.JOIN_TABLE_PREFIX + Constants.TABLE_NAME_APPROACH_PROCESS_DIRECTION));
        
        // Define Join Table for ApproachProcess and AutomationLevel
        modelBuilder.Entity<ApproachProcess>()
            .HasMany(left => left.AutomationLevels)
            .WithMany(right => right.ApproachProcesses)
            .UsingEntity(join => join.ToTable(Constants.JOIN_TABLE_PREFIX + Constants.TABLE_NAME_APPROACH_PROCESS_AUTOMATIONLEVEL));
        
        // Define Join Table for ApproachProcess and AnalysisType
        modelBuilder.Entity<ApproachProcess>()
            .HasMany(left => left.AnalysisTypes)
            .WithMany(right => right.ApproachProcesses)
            .UsingEntity(join => join.ToTable(Constants.JOIN_TABLE_PREFIX + Constants.TABLE_NAME_APPROACH_PROCESS_ANALYSISTYPE));
        
        // Define Join Table for ApproachProcess and Technique
        modelBuilder.Entity<ApproachProcess>()
            .HasMany(left => left.Techniques)
            .WithMany(right => right.ApproachProcesses)
            .UsingEntity(join => join.ToTable(Constants.JOIN_TABLE_PREFIX + Constants.TABLE_NAME_APPROACH_PROCESS_TECHNIQUE));
        
        // Apply Configurations
        modelBuilder.ApplyConfiguration(new DomainArtifactInputEntityTypeConfiguration());
        modelBuilder.ApplyConfiguration(new RuntimeArtifactInputEntityTypeConfiguration());
        modelBuilder.ApplyConfiguration(new ModelArtifactInputEntityTypeConfiguration());
        modelBuilder.ApplyConfiguration(new ExecutableInputInputEntityTypeConfiguration());
        modelBuilder.ApplyConfiguration(new QualityEntityTypeConfiguration());
        modelBuilder.ApplyConfiguration(new DirectionEntityTypeConfiguration());
        modelBuilder.ApplyConfiguration(new AutomationLevelEntityTypeConfiguration());
        modelBuilder.ApplyConfiguration(new AnalysisTypeEntityTypeConfiguration());
        modelBuilder.ApplyConfiguration(new TechniqueEntityTypeConfiguration());
        modelBuilder.ApplyConfiguration(new ArchitectureEntityTypeConfiguration());
        modelBuilder.ApplyConfiguration(new ServiceTypeEntityTypeConfiguration());
        modelBuilder.ApplyConfiguration(new ValidationMethodEntityTypeConfiguration());
        modelBuilder.ApplyConfiguration(new AccuracyPrecisionEntityTypeConfiguration());
        modelBuilder.ApplyConfiguration(new ToolSupportEntityTypeConfiguration());
        modelBuilder.ApplyConfiguration(new ResultsQualityEntityTypeConfiguration());
    }
}
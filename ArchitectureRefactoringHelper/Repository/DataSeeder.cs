using System.Text.Json;
using Repository.Models;
using Repository.Models.Database;
using Repository.Services;

namespace Repository;

public static class DataSeeder
{
    public static async Task GenerateSeedDataAsync(IHost host)
    {
        await using (var db = new RefactoringApproachContext())
        {
            if (db.RefactoringApproaches.Any())
            {
                return;
            }
        }

        var serviceProvider = host.Services.CreateScope().ServiceProvider;
        var inputService = serviceProvider.GetRequiredService<ApproachInputService>();
        var processService = serviceProvider.GetRequiredService<ApproachProcessService>();
        var outputService = serviceProvider.GetRequiredService<ApproachOutputService>();
        var usabilityService = serviceProvider.GetRequiredService<ApproachUsabilityService>();

        var seedData = GetSeedDataFromJson<RefactoringApproach>("refactoringApproaches.json");
        await AddRefactoringApproachesAsync(seedData, inputService, processService, outputService, usabilityService);
    }

    private static async Task AddRefactoringApproachesAsync(IEnumerable<RefactoringApproach> refactoringApproaches,
        ApproachInputService inputService, 
        ApproachProcessService processService, 
        ApproachOutputService outputService,
        ApproachUsabilityService usabilityService)
    {
        var db = new RefactoringApproachContext();
        
        foreach (var refactoringApproach in refactoringApproaches)
        {
            var newApproach = new RefactoringApproach
            {
                ApproachSource = refactoringApproach.ApproachSource,
                DomainArtifactInputs =
                    inputService.AddDomainArtifactsIfNotExist(refactoringApproach.DomainArtifactInputs, ref db),
                RuntimeArtifactInputs =
                    inputService.AddRuntimeArtifactsIfNotExist(refactoringApproach.RuntimeArtifactInputs, ref db),
                ModelArtifactInputs =
                    inputService.AddModelArtifactsIfNotExist(refactoringApproach.ModelArtifactInputs, ref db),
                ExecutableInputs = inputService.AddExecutablesIfNotExist(refactoringApproach.ExecutableInputs, ref db),
                ApproachProcess = processService.AddApproachProcess(refactoringApproach.ApproachProcess, ref db),
                ApproachOutputs =
                    outputService.AddApproachOutputsIfNotExist(refactoringApproach.ApproachOutputs, ref db),
                ApproachUsability = usabilityService.AddApproachUsability(refactoringApproach.ApproachUsability, ref db)
            };

            db.RefactoringApproaches.Add(newApproach);
        }

        await db.SaveChangesAsync();
    }

    private static IEnumerable<T> GetSeedDataFromJson<T>(string seedSourceFile)
    {
        var filePath = Environment.CurrentDirectory + "/DatabaseSeedingData/" + seedSourceFile;

        using var reader = new StreamReader(filePath);
        var jsonString = reader.ReadToEnd();

        return JsonSerializer.Deserialize<List<T>>(jsonString) ?? new List<T>();
    }
}
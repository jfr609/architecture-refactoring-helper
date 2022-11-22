using System.Text.Json;
using Repository.Models;
using Repository.Models.Database;
using Repository.Services;

namespace Repository;

public static class DataSeeder
{
    public static void GenerateSeedData(IHost host)
    {
        using (var db = new RefactoringApproachContext())
        {
            if (db.RefactoringApproaches.Any())
            {
                return;
            }
        }

        var serviceProvider = host.Services.CreateScope().ServiceProvider;
        var refactoringApproachService = serviceProvider.GetRequiredService<RefactoringApproachService>();
        SeedRefactoringApproachData(refactoringApproachService);
    }

        public static void GenerateArchitecturalDesignSeedData(IHost host)
    {
        using (var db = new RefactoringApproachContext())
        {
            if (db.ArchitecturalDesigns.Any())
            {
                return;
            }
        }

        var serviceProvider = host.Services.CreateScope().ServiceProvider;
        var architecturalDesignService = serviceProvider.GetRequiredService<ArchitecturalDesignService>();
        SeedArchitecturalDesignData(architecturalDesignService);
    }

    private static void SeedRefactoringApproachData(RefactoringApproachService refactoringApproachService)
    {
        var refactoringApproaches = GetSeedDataFromJson<RefactoringApproach>("RefactoringApproaches.json");
        foreach (var refactoringApproach in refactoringApproaches)
        {
            refactoringApproachService.AddRefactoringApproachIfNotExists(refactoringApproach);
        }
    }

    private static void SeedArchitecturalDesignData(ArchitecturalDesignService architecturalDesignService)
    {
        var architecturalDesigns = GetSeedDataFromJson<ArchitecturalDesign>("ArchitecturalDesigns.json");
         foreach (var architecturalDesign in architecturalDesigns)
        {
            Console.WriteLine(architecturalDesign.ArchitecturalDesignSource.Name);
            architecturalDesignService.AddArchitecturalDesignIfNotExists(architecturalDesign);
        }
    }

    private static IEnumerable<T> GetSeedDataFromJson<T>(string seedSourceFile)
    {
        var filePath = Environment.CurrentDirectory + "/DatabaseSeedingData/" + seedSourceFile;

        using var reader = new StreamReader(filePath);
        var jsonString = reader.ReadToEnd();

        return JsonSerializer.Deserialize<List<T>>(jsonString) ?? new List<T>();
    }
}
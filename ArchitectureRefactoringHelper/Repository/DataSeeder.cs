using System.Text.Json;
using Repository.Models;
using Repository.Models.Database;
using Repository.Services;

namespace Repository;

public static class DataSeeder
{
    public static void GenerateSeedDataAsync(IHost host)
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

        var seedData = GetSeedDataFromJson<RefactoringApproach>("RefactoringApproaches.json");
        AddRefactoringApproachesAsync(seedData, refactoringApproachService);
    }

    private static void AddRefactoringApproachesAsync(IEnumerable<RefactoringApproach> refactoringApproaches,
        RefactoringApproachService refactoringApproachService)
    {
        foreach (var refactoringApproach in refactoringApproaches)
        {
            refactoringApproachService.AddRefactoringApproachIfNotExists(refactoringApproach);
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
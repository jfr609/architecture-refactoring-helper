using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using NeinLinq;
using Repository.Models;

namespace Repository;

public static class Utils
{
    public static EntityEntry<T>? AddIfNotExists<T>(this DbSet<T> dbSet, T entity, string key) where T : class, new()
    {
        var trackedEntity = dbSet.Find(key);
        Console.WriteLine(trackedEntity);
        return trackedEntity == null ? dbSet.Add(entity) : null;
    }

    public static string ToJsonString(this object? o)
    {
        return JsonSerializer.Serialize(o);
    }
    
    public static bool ListEquals<T>(this IEnumerable<T>? list1, IEnumerable<T>? list2) where T : notnull
    {
        var counter = new Dictionary<T, int>();
        if (list1 != null)
        {
            foreach (var element in list1)
            {
                if (counter.ContainsKey(element))
                {
                    counter[element]++;
                }
                else
                {
                    counter.Add(element, 1);
                }
            }
        }

        if (list2 != null)
        {
            foreach (var element in list2)
            {
                if (counter.ContainsKey(element))
                {
                    counter[element]--;
                }
                else
                {
                    return false;
                }
            }
        }

        return counter.Values.All(count => count == 0);
    }

    public static IQueryable<ApproachProcess> IncludeAllApproachProcessData(this IQueryable<ApproachProcess> source)
    {
        return source
            .Include(e => e.Qualities)
            .Include(e => e.Directions)
            .Include(e => e.AutomationLevels)
            .Include(e => e.AnalysisTypes)
            .Include(e => e.Techniques);
    }

    public static IQueryable<ApproachOutput> IncludeAllApproachOutputData(this IQueryable<ApproachOutput> source)
    {
        return source
            .Include(e => e.Architecture)
            .Include(e => e.ServiceType);
    }

    public static IQueryable<ApproachUsability> IncludeAllApproachUsabilityData(
        this IQueryable<ApproachUsability> source)
    {
        return source
            .Include(e => e.ResultsQualitiy)
            .Include(e => e.ToolSupport)
            .Include(e => e.AccuracyPrecision)
            .Include(e => e.ValidationMethod);
    }
}
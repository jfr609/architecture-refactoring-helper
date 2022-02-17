using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using Repository.Models;

namespace Repository;

public static class Utils
{
    public static string ToJsonString(this object? o)
    {
        return JsonSerializer.Serialize(o);
    }

    public static bool EntityKeysEquals<T, TKey>(this IEnumerable<T>? list1, IEnumerable<T>? list2,
        Func<T, TKey> keyFunction)
        where T : notnull
        where TKey : notnull
    {
        if (list1 == null && list2 != null || list1 != null && list2 == null)
            return false;
        if (list1 == null && list2 == null)
            return true;

        var counter = new Dictionary<TKey, int>();
        foreach (var element in list1!)
        {
            var key = keyFunction(element);
            if (counter.ContainsKey(key))
            {
                counter[key]++;
            }
            else
            {
                counter.Add(key, 1);
            }
        }

        foreach (var element in list2!)
        {
            var key = keyFunction(element);
            if (counter.ContainsKey(key))
            {
                counter[key]--;
            }
            else
            {
                return false;
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
using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using Repository.Models;
using Repository.Models.Database;

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

    public static bool IsNullOrEmpty<T>(this IEnumerable<T>? enumerable)
    {
        return enumerable == null || !enumerable.Any();
    }

    public static T AddEntity<T>(T entity, ref RefactoringApproachContext db) where T : class
    {
        return db.Set<T>().Add(entity).Entity;
    }

    public static T AddEntityAndSaveChanges<T>(T entity, ref RefactoringApproachContext db) where T : class
    {
        var savedEntity = AddEntity(entity, ref db);
        db.SaveChanges();
        db.Dispose();

        return savedEntity;
    }

    public static ICollection<T> AddEntitiesIfNotExist<T>(ICollection<T>? entities, Func<T, object?[]?> keyFunction,
        ref RefactoringApproachContext db)
        where T : class
    {
        if (entities == null || !entities.Any())
            return new List<T>();

        var distinctEntities = entities.Distinct().ToList();
        var savedEntities = new List<T>();
        foreach (var entity in distinctEntities)
        {
            var duplicateEntity = db.Set<T>().Find(keyFunction(entity));
            savedEntities.Add(duplicateEntity ?? AddEntity(entity, ref db));
        }

        return savedEntities;
    }

    public static bool DeleteEntityAndSaveChanges<T>(ref RefactoringApproachContext db, params object?[]? keyValues)
        where T : class
    {
        var entity = db.Set<T>().Find(keyValues);
        var deleteSuccess = entity != null;
        if (deleteSuccess)
        {
            db.Set<T>().Remove(entity!);
            db.SaveChanges();
        }

        db.Dispose();

        return deleteSuccess;
    }

    public static IQueryable<ApproachOutput> IncludeAllApproachOutputData(this IQueryable<ApproachOutput> query)
    {
        return query
            .Include(e => e.Architecture)
            .Include(e => e.ServiceType);
    }

    public static IQueryable<ApproachUsability> IncludeAllApproachUsabilityData(
        this IQueryable<ApproachUsability> query)
    {
        return query
            .Include(e => e.ResultsQuality)
            .Include(e => e.ToolSupport)
            .Include(e => e.AccuracyPrecision)
            .Include(e => e.ValidationMethod);
    }
}
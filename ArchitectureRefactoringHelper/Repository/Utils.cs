using System.Linq.Expressions;
using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

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
}
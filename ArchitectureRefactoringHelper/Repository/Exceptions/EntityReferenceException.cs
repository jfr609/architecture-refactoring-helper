namespace Repository.Exceptions;

public class EntityReferenceException : Exception
{
    public EntityReferenceException()
    {
    }

    public EntityReferenceException(string? message) : base(message)
    {
    }

    public EntityReferenceException(string? message, Exception? innerException) : base(message, innerException)
    {
    }
}
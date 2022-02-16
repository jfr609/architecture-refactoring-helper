namespace Repository.Exceptions;

[Serializable]
public class ElementNotFoundExceptions : Exception
{
    public ElementNotFoundExceptions()
    {
    }

    public ElementNotFoundExceptions(string? message) : base(message)
    {
    }

    public ElementNotFoundExceptions(string? message, Exception? innerException) : base(message, innerException)
    {
    }
}
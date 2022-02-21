using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Repository.Exceptions;

public class ServiceExceptionFilter : IExceptionFilter
{
    public void OnException(ExceptionContext context)
    {
        Console.WriteLine(context.Exception);
        switch (context.Exception)
        {
            case ElementNotFoundException:
                context.Result = new BadRequestObjectResult(context.Exception.Message);
                break;
            case DuplicateElementException:
                context.Result = new ConflictObjectResult(context.Exception.Message);
                break;
        }
    }
}
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;

namespace Repository.Exceptions;

public class ServiceExceptionFilter : IExceptionFilter
{
    public void OnException(ExceptionContext context)
    {
        Console.WriteLine(context.Exception);
        switch (context.Exception)
        {
            case EntityNotFoundException:
                context.Result = new NotFoundObjectResult(context.Exception.Message);
                break;
            case DuplicateElementException:
                context.Result = new ConflictObjectResult(context.Exception.Message);
                break;
            case EntityReferenceException:
                context.Result = new BadRequestObjectResult(context.Exception.Message);
                break;
            case DbUpdateException:
                context.Result = new BadRequestObjectResult(context.Exception.InnerException?.Message);
                break;
        }
    }
}
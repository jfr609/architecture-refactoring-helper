using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;
using Repository.Models;
using Repository.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
});
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<RefactoringApproachService>();
builder.Services.AddScoped<ApproachInputService>();
builder.Services.AddScoped<ApproachProcessService>();
builder.Services.AddScoped<ApproachOutputService>();
builder.Services.AddScoped<ApproachUsabilityService>();
builder.Services.AddScoped<RefactoringApproachContext>();

var app = builder.Build();

// Create database file on startup if it doesn't exist
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;

    var context = services.GetRequiredService<RefactoringApproachContext>();    
    context.Database.Migrate();
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
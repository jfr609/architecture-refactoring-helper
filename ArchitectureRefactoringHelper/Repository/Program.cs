using System.Reflection;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;
using Repository;
using Repository.Models;
using Repository.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
    options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
    // Added these lines to solve json cycle error
    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
    options.JsonSerializerOptions.WriteIndented = true;
});
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    var xmlFilename = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    options.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, xmlFilename));
});

const string corsPolicy = "corsPolicy";
builder.Services.AddCors(options =>
{
    options.AddPolicy(corsPolicy, policyBuilder =>
    {
        policyBuilder
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});

builder.Services.AddScoped<RefactoringApproachService>();
builder.Services.AddScoped<ApproachInputService>();
builder.Services.AddScoped<ApproachProcessService>();
builder.Services.AddScoped<ApproachOutputService>();
builder.Services.AddScoped<ApproachUsabilityService>();
builder.Services.AddScoped<RefactoringApproachContext>();
builder.Services.AddScoped<IRecommendationService, SimpleRecommendationService>();
builder.Services.AddScoped<ScenarioService>();
builder.Services.AddScoped<ArchitecturalDesignService>();
builder.Services.AddScoped<ToolService>();
builder.Services.AddScoped<ToolTypeService>();

var app = builder.Build();

// Create database file on startup if it doesn't exist
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;

    var context = services.GetRequiredService<RefactoringApproachContext>();
    await context.Database.MigrateAsync();
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(corsPolicy);

app.UseAuthorization();

app.MapControllers();

// Seed database with initial data
DataSeeder.GenerateSeedData(app);
DataSeeder.GenerateArchitecturalDesignSeedData(app);
DataSeeder.GenerateToolSeedData(app);

app.Run();
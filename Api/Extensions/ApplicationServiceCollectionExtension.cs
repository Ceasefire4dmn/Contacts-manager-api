using Microsoft.EntityFrameworkCore;


public static class ApplicationServiceCollectionExtension
{
    public static IServiceCollection AddServiceCollection(this IServiceCollection services, ConfigurationManager configuration)
    {
        // Add option for creating controllers
        services.AddControllers();

        // Add DB via EF
        var stringConnection = configuration.GetConnectionString("SqliteConnection");
        services.AddDbContext<SqliteDbContext>(opt => opt.UseSqlite(stringConnection));
        services.AddScoped<IStorage, SqliteEfStorage>();
        // Replace option for using Singleton project pattern with DB Context via Entity Framework
        // services.AddSingleton<IStorage>(new SqliteStorage(configuration.GetConnectionString("SqliteConnection")));
        
        
        // Add option for Cross-Origin Request handling
        services.AddCors(opt =>
            opt.AddPolicy("CorsPolicy", policy =>
            {
                policy.AllowAnyHeader()
                .AllowAnyMethod()
                .WithOrigins([configuration["clientHost"]]);

            }
        ));

        // Add autodocumentation option using Swagger 
        services.AddSwaggerGen(opt =>
        {
            opt.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
            {
                Title = "API для управления списком контактов.",
                Description = "Это API позволяет создавать, редактировать и удалять контакты.",
                Contact = new Microsoft.OpenApi.Models.OpenApiContact
                {
                    Name = "Alexandra T.",
                    Email = "alpha4ka.2005@gmail.com",
                    Url = new Uri("https://github.com/Ceasefire4dmn")
                },
            });
        });
        services.AddEndpointsApiExplorer();

        

        return services;
    }
}
public static class ApplicationServiceCollectionExtension
{
    public static IServiceCollection AddServiceCollection(this IServiceCollection services, ConfigurationManager configuration)
    {
        //Add option for creating controllers
        services.AddControllers();
        //Add option for Cross-Origin Request handling
        services.AddCors(opt =>
            opt.AddPolicy("CorsPolicy", policy =>
            {
                policy.AllowAnyHeader()
                .AllowAnyMethod()
                .WithOrigins([configuration["clientHost"]]);

            }
        ));

        //Add autodocumentation option using Swagger 
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

        //Add option for using Singleton project pattern
        services.AddSingleton<IStorage>(new SqliteStorage(configuration.GetConnectionString("SqliteConnection")));

        return services;
    }
}
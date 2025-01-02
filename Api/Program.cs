var builder = WebApplication.CreateBuilder(args);

//Add option for creating controllers
builder.Services.AddControllers();

//Add option for Cross-Origin Request handling
builder.Services.AddCors(opt =>
    opt.AddPolicy("CorsPolicy", policy =>
    {
        policy.AllowAnyHeader()
        .AllowAnyMethod()
        .WithOrigins(args[0], args[1]);
        // .WithOrigins("http://localhost:3000");
        // The first flag(argument) after "dotnet run" will be the link to the resourse that can get information from the API. Example for localhost:3000:
        // dotnet run "http://localhost:3000"
    }
));

//Add autodocumentation option using Swagger 
builder.Services.AddSwaggerGen(opt =>
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
builder.Services.AddEndpointsApiExplorer();

//Add option for using Singleton project pattern
builder.Services.AddSingleton<ContactStorage>();

//Build app
var app = builder.Build();

//Use added options in app
app.UseSwagger();
app.UseSwaggerUI();
app.UseCors("CorsPolicy");
app.MapControllers();

//Run app
app.Run();
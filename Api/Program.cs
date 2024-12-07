var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
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
builder.Services.AddSingleton<ContactStorage>();

var app = builder.Build();



app.UseSwagger();
app.UseSwaggerUI();
app.MapControllers();

app.Run();

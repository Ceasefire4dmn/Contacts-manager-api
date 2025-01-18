var builder = WebApplication.CreateBuilder(args);

builder.Services.AddServiceCollection(builder.Configuration);


//Build app
var app = builder.Build();

//Use added options in app
app.UseSwagger();
app.UseSwaggerUI();
app.UseCors("CorsPolicy");
app.MapControllers();

//Run app
app.Run();
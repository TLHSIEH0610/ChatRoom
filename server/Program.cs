using server.Hubs;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSignalR();
builder.Services.AddControllers();
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyMethod().AllowAnyHeader().AllowCredentials().WithOrigins("http://client:8080");
    });
});
builder.Services.AddSingleton<IDictionary<string, UserConnection>>(opts => new Dictionary<string, UserConnection>());

var app = builder.Build();

//serve static
app.UseDefaultFiles();
app.UseStaticFiles();

app.MapControllers();

app.UseCors();

//route for signalR
app.MapHub<ChatHub>("/chatroom");
app.MapFallbackToController("Index", "Fallback");

app.Run();

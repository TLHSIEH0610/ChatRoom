using server.Hubs;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSignalR();
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyMethod().AllowAnyHeader().AllowCredentials().WithOrigins("http://localhost:5173");
    });
});

var app = builder.Build();

app.UseRouting();

app.UseCors();

//route for signalR
app.MapHub<ChatHub>("/chatroom");

app.Run();

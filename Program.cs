using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Http.Json;

List<Dog> dogs = new List<Dog>{
    new Dog()
    {
        Id = 1,
        Name = "Bruce",
        Breed = "Schnauzer"
    },
    new Dog(){
        Id =2,
        Name ="Bailey",
        Breed = "Schnauzer"
    },
    new Dog(){
        Id = 3,
        Name = "Sasha",
        Breed ="Husky"
    },
    new Dog(){
        Id = 4,
        Name = "Tali",
        Breed= "Golden Labradoodle"
    },
    new Dog(){
        Id = 5,
        Name = "Remy",
        Breed = "Red Lab"
    },
     new Dog(){
        Id = 6,
        Name = "Goose",
        Breed = "Great Pyrenees"
    },
};
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapGet("/api/hello", () =>
{
    return new { Message = "Welcome to DeShawn's Dog Walking" };
});

app.MapGet("api/dogs", () =>
{
    return dogs;
});


app.Run();

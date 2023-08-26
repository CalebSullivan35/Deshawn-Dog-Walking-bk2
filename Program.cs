using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Http.Json;

List<Dog> dogs = new List<Dog>{
    new Dog()
    {
        Id = 1,
        Name = "Bruce",
        Breed = "Schnauzer"
    },
    new Dog()
    {
        Id =2,
        Name ="Bailey",
        Breed = "Schnauzer"
    },
    new Dog()
    {
        Id = 3,
        Name = "Sasha",
        Breed ="Husky"
    },
    new Dog()
    {
        Id = 4,
        Name = "Tali",
        Breed= "Golden Labradoodle"
    },
    new Dog()
    {
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
List<Walker> walkers = new List<Walker>
{
    new Walker(){
        Id = 1,
        Name = "Caleb"
    },
    new Walker()
    {
        Id = 2,
        Name = "Chase"
    },
    new Walker()
    {
        Id = 3,
        Name = "Ryan"
    },
    new Walker()
    {
        Id = 4,
        Name = "John"
    },
    new Walker()
    {
        Id = 5,
        Name = "Deanna"
    }
};

List<WalkerDogRelationship> walkerDogRelationships = new List<WalkerDogRelationship>
{
    new WalkerDogRelationship()
    {
        Id =1,
        WalkerId =1,
        DogId=1
    },
    new WalkerDogRelationship(){
        Id =2,
        WalkerId =1,
        DogId=2
    },
    new WalkerDogRelationship(){
        Id =3,
        WalkerId =1,
        DogId=3
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

app.MapGet("/api/walkers", () =>
{
    return walkers;
});

app.MapGet("/api/dogs", () =>
{
    return dogs;
});

app.MapGet("/api/walkerDogRelationships", () =>
{
    walkerDogRelationships.ForEach(r =>
    {
        r.Walker = walkers.FirstOrDefault(w => w.Id == r.WalkerId);
        r.Dog = dogs.FirstOrDefault(d => d.Id == r.DogId);
    });
    return walkerDogRelationships;
});

app.Run();

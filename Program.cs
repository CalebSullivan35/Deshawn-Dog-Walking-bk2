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

List<City> Cities = new List<City>
{
    new City(){
        Id = 1,
        Name = "Nashville"
    },
    new City()
{
    Id = 2,
    Name = "New York"
},
new City()
{
    Id = 3,
    Name = "Los Angeles"
},
new City()
{
    Id = 4,
    Name = "Chicago"
},
new City()
{
    Id = 5,
    Name = "San Francisco"
},
new City()
{
    Id = 6,
    Name = "Miami"
}
};

List<WalkerCityRelationship> WalkerCityRelationships = new List<WalkerCityRelationship>
{
 new WalkerCityRelationship()
 {
    Id = 1,
    WalkerId =1,
    CityId =1,
 },
 new WalkerCityRelationship()
 {
    Id = 2,
    WalkerId =1,
    CityId =2,
 },
 new WalkerCityRelationship()
 {
    Id = 3,
    WalkerId =1,
    CityId =4,
 },
 new WalkerCityRelationship()
 {
    Id = 4,
    WalkerId =1,
    CityId =5,
 },
 new WalkerCityRelationship()
 {
    Id = 5,
    WalkerId =2,
    CityId =3,
 },
 new WalkerCityRelationship()
 {
    Id = 6,
    WalkerId =3,
    CityId =4,
 },
 new WalkerCityRelationship()
 {
    Id = 7,
    WalkerId =2,
    CityId =5,
 },
 new WalkerCityRelationship()
 {
    Id = 8,
    WalkerId =5,
    CityId =3,
 },
 new WalkerCityRelationship()
 {
    Id = 9,
    WalkerId =5,
    CityId =2,
 },
 new WalkerCityRelationship()
 {
    Id = 10,
    WalkerId =4,
    CityId =2,
 }
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

app.MapGet("/api/cities", () =>
{
    return Cities;
});


app.MapGet("/api/WalkerCityRelationships" ,() =>
{
    WalkerCityRelationships.ForEach(r =>
    {
        r.City = Cities.FirstOrDefault(c => c.Id == r.CityId);
        r.Walker = walkers.FirstOrDefault(w => w.Id == r.WalkerId); 
    });
    return WalkerCityRelationships;
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

app.MapPost("/api/dogs", (Dog dog) =>
{
    //create a new id for the dog.
    dog.Id = dogs.Count > 0 ?
    dogs.Max(d => d.Id) + 1 : 1;
    dogs.Add(dog);
    return dog;
});

app.MapPost("/api/walkerDogRelationships", (WalkerDogRelationship walkerDogRelationship) =>
{
    //create a new id for the relationship.
    walkerDogRelationship.Id = walkerDogRelationships.Count > 0 ?
    walkerDogRelationships.Max(r => r.Id) + 1 : 1;
    walkerDogRelationships.Add(walkerDogRelationship);
    return walkerDogRelationships;
});

//post a new city

app.MapPost("/api/cities", (City city) =>
{
    city.Id = Cities.Count > 0 ?
    Cities.Max(c => c.Id) + 1 : 1;
    Cities.Add(city);
    return city;
});

//delete from the walkerCityRelationships.
app.MapDelete("/api/WalkerCityRelationship/{id}", (int id) =>
{
    //find the relationships to remove based on the idea.
    List<WalkerCityRelationship> walkerCityRelationshipsToRemove = WalkerCityRelationships.Where((r) => r.WalkerId == id).ToList();

    walkerCityRelationshipsToRemove.ForEach((r) =>
    {
        WalkerCityRelationships.Remove(r);
    });
    return walkerCityRelationshipsToRemove;
});

//delete from the the dogs
app.MapDelete("/api/dogs/{id}", (int id) =>
{
    {
        //find the dog to remove based of off dog id
        Dog dogToRemove = dogs.FirstOrDefault((dog) => dog.Id == id);
        dogs.Remove(dogToRemove);
        return dogToRemove;
    }
});


//Post to the walkerCityRelationships as a whole list.
app.MapPost("/api/WalkerCityRelationship", (List <WalkerCityRelationship> walkerCityRelationshipList) =>
{
    walkerCityRelationshipList.ForEach((r) =>
    {
        r.Id = WalkerCityRelationships.Count > 0 ?
        WalkerCityRelationships.Max(wcr => wcr.Id) + 1 : 1;
        WalkerCityRelationships.Add(r);
    });
    return walkerCityRelationshipList;
});

//we will need to do a put request on the actual walker to update its lists of cities.
app.MapPut("/api/walkers/{id}", (int id, Walker walker) =>
{
    //find the selected walker to do a put request.
    Walker walkerToUpdate = walkers.FirstOrDefault(w => w.Id == id);
    int walkerIndex = walkers.IndexOf(walkerToUpdate);
    walkers[walkerIndex] = walker;
    return walker;
    
});

//delete a walker

app.MapDelete("/api/walkers/{id}", (int id) =>
{
    Walker walkerToRemove = walkers.FirstOrDefault((w) => w.Id == id);
    walkers.Remove(walkerToRemove);
    //also lets remove any relationships with that walker with dogs. 
    List<WalkerDogRelationship> walkerDogRelationshipsToDelete = walkerDogRelationships.Where((r) => r.WalkerId == id).ToList();
    //now lets loop through this array and remove em all
    walkerDogRelationshipsToDelete.ForEach((r) =>
    {
        walkerDogRelationships.Remove(r);
    });
    return walkerToRemove;
});

app.Run();

//put request on the dogs. 

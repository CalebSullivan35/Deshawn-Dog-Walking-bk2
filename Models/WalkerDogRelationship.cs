public class WalkerDogRelationship{
  public int Id { get; set; }
  public int WalkerId { get; set; }
  public Walker Walker { get; set; }
  public int DogId { get; set; }
  public  Dog Dog {get; set;}
}
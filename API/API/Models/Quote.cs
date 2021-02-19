namespace API.Models
{
    public class Quote
    {
        public int Id { get; set; }
        public int ItemId { get; set; }
        public string Username { get; set; }
        public float TotalCost { get; set; }
        public string Description { get; set; }
    }
}

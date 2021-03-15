namespace API.Models
{
    public class Quote
    {
        public string Id { get; set; }
        public string ItemId { get; set; }
        public string Username { get; set; }
        public float TotalCost { get; set; }
        public string Description { get; set; }
    }
}

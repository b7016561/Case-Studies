namespace API.Models
{
    public class QuoteRequest
    {
        public int Id { get; set; }
        public string ItemId { get; set; }
        public string Username { get; set; }
        public string Status { get; set; }
    }
}

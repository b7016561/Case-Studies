namespace API.Models
{
    public class Quote : QuoteRequest
    {
        public float TotalCost { get; set; }
        public string Description { get; set; }
    }
}

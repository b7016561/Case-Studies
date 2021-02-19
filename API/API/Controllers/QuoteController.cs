using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class QuoteController
    {
        private readonly ILogger<QuoteController> _logger;

        public QuoteController(ILogger<QuoteController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<Quote> Get()
        {
            _logger.LogInformation("Get Quotes");
            return null;
        }

        [HttpPost]
        public Quote Post(Quote quote)
        {
            _logger.LogInformation($"Create Quote: {quote}");
            return null;
        }
    }
}

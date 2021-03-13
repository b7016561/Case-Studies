using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class QuoteRequestController
    {
        private readonly ILogger<QuoteRequestController> _logger;

        public QuoteRequestController(ILogger<QuoteRequestController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<QuoteRequest> Get()
        {
            _logger.LogInformation("Get Quote Requests");
            return null;
        }

        [HttpPost]
        public QuoteRequest Post(QuoteRequest quoteRequest)
        {
            _logger.LogInformation($"Create Quote Request: {quoteRequest}");
            return null;
        }
    }
}

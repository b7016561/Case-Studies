using API.Helpers.Database;
using API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;

namespace API.Controllers
{
    [ApiController]
    [Authorize(policy: "User")]
    [Route("[controller]")]
    public class QuoteController : ControllerBase
    {
        private readonly ILogger<QuoteController> _logger;
        private readonly IStoredProcedureExecutor _sprExecutor;

        public QuoteController(ILogger<QuoteController> logger, IStoredProcedureExecutor sprExecutor)
        {
            _logger = logger;
            _sprExecutor = sprExecutor;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            _logger.LogInformation("Get Quotes");
            var quotes = await _sprExecutor.Query<Quote>("sprGetQuotes");
            return Ok(quotes);
        }

        [HttpPost]
        public Quote Post(Quote quote)
        {
            _logger.LogInformation($"Create Quote: {quote}");
            return null;
        }
    }
}

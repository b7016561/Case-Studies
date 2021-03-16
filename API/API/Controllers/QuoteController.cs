﻿using API.Helpers.Database;
using API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
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
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _sprExecutor = sprExecutor ?? throw new ArgumentNullException(nameof(sprExecutor));
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            _logger.LogInformation("Get Quotes");

            // Get user context
            var userContext = HttpContext.Items["user"] as IUserContext;

            // Build query parameters
            var param = new { username = userContext?.Username };

            // Execute stored procedure
            var quotes = await _sprExecutor.Query<Quote>("sprGetQuotes", param);

            // Return quotes with status 200
            return Ok(quotes);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> Get(string id)
        {
            _logger.LogInformation($"Get Quote: {id}");

            // Build query parameters
            var param = new { quoteID = id };

            // Execute stored procedure
            var quote = await _sprExecutor.QuerySingleOrDefault<Quote>("sprGetQuote", param);

            if (quote is null)
            {
                // Return error with status 400
                return BadRequest(new { error = "Invalid Quote ID" });
            }
            // Return quote with status 200
            return Ok(quote);
        }

        [HttpPost]
        public Quote Post(Quote quote)
        {
            _logger.LogInformation($"Create Quote: {quote}");
            return null;
        }
    }
}

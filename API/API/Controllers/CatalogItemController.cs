using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CatalogItemController: ControllerBase
    {
        private readonly ILogger<CatalogItemController> _logger;

        public CatalogItemController(ILogger<CatalogItemController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<CatalogItem> Get()
        {
            _logger.LogInformation("Get Catalog Items");
            return null;
        }
    }
}

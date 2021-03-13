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
    public class CatalogItemController: ControllerBase
    {
        private readonly ILogger<CatalogItemController> _logger;
        private readonly IStoredProcedureExecutor _sprExecutor;

        public CatalogItemController(ILogger<CatalogItemController> logger, IStoredProcedureExecutor sprExecutor)
        {
            _logger = logger;
            _sprExecutor = sprExecutor;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            _logger.LogInformation("Get Catalog Items");

            var items = await _sprExecutor.Query<CatalogItem>("sprGetItems");
            
            return Ok(items);
        }
    }
}

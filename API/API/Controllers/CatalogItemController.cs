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
    public class CatalogItemController : ControllerBase
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

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> Get(string id)
        {
            _logger.LogInformation("Get Catalog Items");
            var param = new { itemID = id };

            var item = await _sprExecutor.QuerySingleOrDefault<CatalogItem>("sprGetItem", param);

            if (item is null)
            {
                return Unauthorized(new { error = "Invalid Item ID" });
            }
            return Ok(item);
        }
    }
}

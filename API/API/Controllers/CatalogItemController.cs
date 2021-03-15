using API.Helpers.Database;
using API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using System.Text.Json;
using System.Text.Json.Serialization;
using System;
namespace API.Controllers
{
    [ApiController]
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


        [Route("product")]
        [HttpPost]
        public async Task<IActionResult> Post(GetItem Item)
        {
            Console.WriteLine(Item);
            _logger.LogInformation("Get Product Item");
            var param = new { ItemID = Item.ItemID };

            // query and return product from id
            var item = await _sprExecutor.QuerySingleOrDefault<CatalogItem>("sprGetItem", param);
            Console.WriteLine(param);
            string json = JsonSerializer.Serialize(item);
            Console.WriteLine(json);
            return Ok(item);
        }
    }
}

using API.Models;
using Dapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Data;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CatalogItemController: ControllerBase
    {
        private readonly ILogger<CatalogItemController> _logger;
        private readonly IDbConnection _connection;

        public CatalogItemController(ILogger<CatalogItemController> logger, IDbConnection connection)
        {
            _logger = logger;
            _connection = connection;
        }

        [HttpGet]
        public IEnumerable<CatalogItem> Get()
        {
            _logger.LogInformation("Get Catalog Items");

            return _connection.Query<CatalogItem>("sprGetItems", commandType: CommandType.StoredProcedure);
        }
    }
}

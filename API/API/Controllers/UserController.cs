using API.Models;
using Dapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;
        private readonly IDbConnection _connection;

        public UserController(ILogger<UserController> logger, IDbConnection connection)
        {
            _logger = logger;
            _connection = connection;
        }

        [HttpPost]
        public User Post(LoginRequest loginRequest)
        {
            _logger.LogInformation("Login");

            var user = _connection.QuerySingleOrDefault<User>("sprGetUser", new { username = loginRequest.Username, password = loginRequest.Password }, commandType: CommandType.StoredProcedure);

            if (user is null)
            {
                // Return error response
            }
            return user;
        }
    }
}

using API.Helpers.Database;
using API.Models;
using API.OAuth;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;

namespace API.Controllers
{
    [ApiController]
    [Route("user")]
    public class UserController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;
        private readonly IStoredProcedureExecutor _sprExecutor;
        private readonly IJwtTokenBuilder _jwtTokenBuilder;

        public UserController(ILogger<UserController> logger, IStoredProcedureExecutor sprExecutor, IJwtTokenBuilder jwtTokenBuilder)
        {
            _logger = logger;
            _sprExecutor = sprExecutor;
            _jwtTokenBuilder = jwtTokenBuilder;
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Post(LoginRequest loginRequest)
        {
            _logger.LogInformation("Login");

            var param = new { username = loginRequest.Username, password = loginRequest.Password };
            
            var user = await _sprExecutor.QuerySingleOrDefault<User>("sprGetUser", param);

            if (user is null)
            {
                return Unauthorized(new { error = "Invalid Login Credentials" });
            }

            var response = new 
            { 
                user,
                token = _jwtTokenBuilder.Build(user.Username, user.AccountType.ToString())
            };

            return Ok(response);
        }
    }
}

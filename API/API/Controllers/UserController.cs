using API.Helpers.Database;
using API.Models;
using API.OAuth;
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
    public class UserController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;
        private readonly IStoredProcedureExecutor _sprExecutor;
        private readonly IJwtTokenBuilder _jwtTokenBuilder;

        public UserController(ILogger<UserController> logger, IStoredProcedureExecutor sprExecutor, IJwtTokenBuilder jwtTokenBuilder)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _sprExecutor = sprExecutor ?? throw new ArgumentNullException(nameof(sprExecutor));
            _jwtTokenBuilder = jwtTokenBuilder ?? throw new ArgumentNullException(nameof(jwtTokenBuilder));
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("login")]
        public async Task<IActionResult> Post(LoginRequest loginRequest)
        {
            _logger.LogInformation("Login");

            // Build query parameters
            var param = new { username = loginRequest.Username, password = loginRequest.Password };
            
            // Execute stored procedure
            var user = await _sprExecutor.QuerySingleOrDefault<User>("sprGetUser", param);

            if (user is null)
            {
                // Return error with status 401
                return Unauthorized(new { error = "Invalid Login Credentials" });
            }

            // Build response
            var response = new 
            { 
                user,
                token = _jwtTokenBuilder.Build(user.Username, user.AccountType.ToString())
            };
            // Return response with status 200
            return Ok(response);
        }

        [HttpGet]
        [Route("info")]
        public IActionResult Get()
        {
            _logger.LogInformation("Get User Account Type");

            // Get user context
            var userContext = HttpContext.Items["user"] as IUserContext;

            if (userContext is null)
            {
                // Return error with status 401
                return Unauthorized(new { error = "Invalid Account Type" });
            }

            // Return account type with status 200
            return Ok(userContext);
        }
    }
}

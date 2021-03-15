using API.Controllers;
using API.Helpers.Database;
using API.Models;
using API.OAuth;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using System.Threading.Tasks;
using Test.API.Helpers;
using Xunit;

namespace Test.API
{
    public class UserControllerTests
    {
        private readonly Mock<IStoredProcedureExecutor> _sprExecutorMock;
        private readonly ILogger<UserController> _logger;
        private readonly IJwtTokenBuilder _jwtTokenBuilder;

        public UserControllerTests()
        {
            _sprExecutorMock = new Mock<IStoredProcedureExecutor>();
            _logger = new Mock<ILogger<UserController>>().Object;
            _jwtTokenBuilder = new Mock<IJwtTokenBuilder>().Object;
        }

        [Fact]
        public async void WhenTheLoginMethodIsCalled_ThenTheExpectedStoredProcedureIsCalledWithTheExpectedParameters()
        {
            // Setup
            var user = new User()
            {
                Username = "username",
                AccountType = 'U'
            };
            _sprExecutorMock
                .Setup(mock => mock.QuerySingleOrDefault<User>(It.IsAny<string>(), It.IsAny<object>()))
                .Returns(Task.FromResult(user));

            // Action
            var controller = new UserController(_logger, _sprExecutorMock.Object, _jwtTokenBuilder);

            var loginRequest = new LoginRequest()
            {
                Username = "username",
                Password = "password"
            };
            var result = await controller.Post(loginRequest);

            // Verify 
            var expectedParams = new
            {
                username = loginRequest.Username,
                password = loginRequest.Password,
            };

            _sprExecutorMock.Verify(Mock => 
                Mock.QuerySingleOrDefault<User>(
                    "sprGetUser",
                    It.Is<object>(actual => VerifyHelper.AreEqualObjects(expectedParams, actual))
                ), Times.Once
            );
        }

        [Fact]
        public async void WhenStoredProcedureReturnsNull_ThenStatus401IsReturned()
        {
            // Setup
            _sprExecutorMock
                .Setup(mock => mock.QuerySingleOrDefault<User>(It.IsAny<string>(), It.IsAny<object>()))
                .Returns(Task.FromResult<User>(null));

            // Action
            var controller = new UserController(_logger, _sprExecutorMock.Object, _jwtTokenBuilder);

            var loginRequest = new LoginRequest()
            {
                Username = "username",
                Password = "password"
            };
            var result = await controller.Post(loginRequest);

            // Verify 
            Assert.Equal(401, (result as ObjectResult)?.StatusCode);
        }

        [Fact]
        public async void WhenStoredProcedureReturnsAResult_ThenStatus200IsReturned()
        {
            // Setup
            var user = new User()
            {
                Username = "username",
                AccountType = 'U'
            };
            _sprExecutorMock
                .Setup(mock => mock.QuerySingleOrDefault<User>(It.IsAny<string>(), It.IsAny<object>()))
                .Returns(Task.FromResult(user));

            // Action
            var controller = new UserController(_logger, _sprExecutorMock.Object, _jwtTokenBuilder);

            var loginRequest = new LoginRequest()
            {
                Username = "username",
                Password = "password"
            };
            var result = await controller.Post(loginRequest);

            // Verify 
            Assert.Equal(200, (result as ObjectResult)?.StatusCode);
        }
    }
}

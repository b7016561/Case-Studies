using API.Controllers;
using API.Helpers.Database;
using API.Models;
using API.OAuth;
using Microsoft.Extensions.Logging;
using Moq;
using System.Threading.Tasks;
using Test.API.Helpers;
using Xunit;

namespace Test.API
{
    public class UserControllerTests
    {
        [Fact]
        public async void WhenTheLoginMethodIsCalled_ThenTheExpectedStoredProcedureIsCalledWithTheExpectedParameters()
        {
            // Setup
            var loggerMock = new Mock<ILogger<UserController>>();
            var sprExecutorMock = new Mock<IStoredProcedureExecutor>();
            var jwtTokenBuilderMock = new Mock<IJwtTokenBuilder>();

            var user = new User()
            {
                Username = "username",
                AccountType = 'U'
            };
            sprExecutorMock
                .Setup(mock => mock.QuerySingleOrDefault<User>(It.IsAny<string>(), It.IsAny<object>()))
                .Returns(Task.FromResult(user));

            // Action
            var controller = new UserController(loggerMock.Object, sprExecutorMock.Object, jwtTokenBuilderMock.Object);

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

            sprExecutorMock.Verify(Mock => 
                Mock.QuerySingleOrDefault<User>(
                    "sprGetUser",
                    It.Is<object>(actual => VerifyHelper.AreEqualObjects(expectedParams, actual))
                ), Times.Once
            );
        }
    }
}

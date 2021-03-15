using API.Controllers;
using API.Helpers.Database;
using API.Models;
using Microsoft.Extensions.Logging;
using Moq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Xunit;

namespace Test.API
{
    public class CatalogItemControllerTests
    {
        [Fact]
        public async void WhenTheGetMethodIsCalled_ThenTheExpectedStoredProcedureIsCalledWithTheExpectedParameters()
        {
            // Setup
            var loggerMock = new Mock<ILogger<CatalogItemController>>();
            var sprExecutorMock = new Mock<IStoredProcedureExecutor>();

            IEnumerable<CatalogItem> items = new List<CatalogItem>();
            sprExecutorMock
                .Setup(mock => mock.Query<CatalogItem>(It.IsAny<string>(), null))
                .Returns(Task.FromResult(items));

            // Action
            var controller = new CatalogItemController(loggerMock.Object, sprExecutorMock.Object);

            var result = await controller.Get();

            // Verify 
            sprExecutorMock.Verify(Mock => Mock.Query<CatalogItem>("sprGetItems", null), Times.Once);
        }
    }
}

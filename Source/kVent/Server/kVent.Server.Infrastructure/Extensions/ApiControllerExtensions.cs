namespace kVent.Server.Infrastructure.Extensions
{
    using System.Net;
    using System.Web.Http;
    using System.Web.Http.Results;

    using kVent.Server.Common;
    using Formatters;

    public static class ApiControllerExtensions
    {
        public static FormattedContentResult<ResultObject> Data(this ApiController apiController, object data)
        {
            if (data == null)
            {
                return apiController.Data(false, Constants.RequestedResourceWasNotFound);
            }

            return new FormattedContentResult<ResultObject>(HttpStatusCode.OK, new ResultObject(data), new BrowserJsonFormatter(), null, apiController);
        }

        public static FormattedContentResult<ResultObject> Data(this ApiController apiController, bool success, string errorMessage, object data = null)
        {
            return new FormattedContentResult<ResultObject>(HttpStatusCode.OK, new ResultObject(success, errorMessage, data), new BrowserJsonFormatter(), null, apiController);
        }

        //public static FileResult File(this ApiController apiController, FileStream fileStream, string fileName)
        //{
        //    return new FileResult(fileStream, fileName);
        //}
    }
}

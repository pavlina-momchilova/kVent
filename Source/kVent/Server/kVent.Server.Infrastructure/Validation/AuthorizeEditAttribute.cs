namespace kVent.Server.Infrastructure.Validation
{
    using System;
    using System.Linq;
    using System.Net.Http;
    using System.Threading;
    using System.Threading.Tasks;
    using System.Web;
    using System.Web.Http.Controllers;
    using System.Web.Http.Filters;

    using Ninject;
    using kVent.Services.Data.Contracts;

    [AttributeUsage(AttributeTargets.Method)]
    public class AuthorizeEditAttribute : ActionFilterAttribute
    {
        [Inject]
        public IUsersService UsersService { private get; set; }

        public override async Task OnActionExecutingAsync(HttpActionContext actionContext, CancellationToken cancellationToken)
        {
            var bindedUser = actionContext.ActionArguments.FirstOrDefault(a => a.Key == "user");
            if (bindedUser.Value == null)
            {
                this.CreateErrorResponseMessage(actionContext, Common.Constants.RequestCannotBeEmpty);
            }

            var currentIdentity = HttpContext.Current.User;
            if (!currentIdentity.Identity.IsAuthenticated)
            {
                this.CreateErrorResponseMessage(actionContext, Common.Constants.NotAuthorized);
            }
        }

        private void CreateErrorResponseMessage(HttpActionContext actionContext, string message)
        {
            actionContext.Response = actionContext.Request.CreateResponse(new ResultObject(false, message));
        }
    }
}

namespace kVent.Sever.Api.Controllers.Base
{
    using System.Linq;
    using Microsoft.AspNet.Identity;

    using kVent.Data.Models;
    using kVent.Services.Data.Contracts;

    public class BaseAuthorizationController : BaseController
    {
        public BaseAuthorizationController(IUsersService usersService)
        {
            this.UsersService = usersService;
            this.SetCurrentUser();
        }

        protected IUsersService UsersService { get; private set; }

        protected User CurrentUser { get; private set; }

        protected void SetCurrentUser()
        {
            var username = this.User.Identity.GetUserName();
            if (username != null)
            {
                this.CurrentUser = this.UsersService
                    .ByUsername(username)
                    .FirstOrDefault();
            }
        }
    }
}
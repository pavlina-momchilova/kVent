namespace kVent.Sever.Api.Controllers
{
    using System.ComponentModel.DataAnnotations;
    using System.Data.Entity;
    using System.Web.Http;
    using System.Threading.Tasks;
    using Microsoft.AspNet.Identity;

    using AutoMapper.QueryableExtensions;
    using kVent.Sever.Api.Controllers.Base;
    using kVent.Services.Data.Contracts;
    using Server.DataTransferModels.User;
    using Server.Infrastructure.Extensions;

    public class UsersController : BaseAuthorizationController
    {
        public UsersController(IUsersService usersService) 
            : base(usersService)
        {
        }

        [HttpGet]
        public async Task<IHttpActionResult> Get([Required]string username)
        {
            var user = await this.UsersService
                .GetByUserName(username)
                .ProjectTo<UserDetailsResponseModel>()
                .FirstOrDefaultAsync();

            return this.Data(user);
        }

        [Route("api/Users/Identity")]
        [Authorize]
        [HttpGet]
        public async Task<IHttpActionResult> Identity()
        {
            var userName = this.User.Identity.GetUserName();
            this.SetCurrentUser();

            var model = await this.UsersService
                .ByUsername(this.CurrentUser.UserName)
                .ProjectTo<IdentityResponseModel>()
                .FirstOrDefaultAsync();

            return this.Data(model);
        }

        [Route("api/Users/AllUsers")]
        [HttpGet]
        public async Task<IHttpActionResult> AllUsers()
        {
            var users = await this.UsersService
                .AllUsers()
                .ProjectTo<IdentityResponseModel>()
                .ToListAsync();

            return this.Data(users);
        }
    }
}
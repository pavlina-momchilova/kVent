namespace kVent.Sever.Api.Controllers
{
    using System.Web.Http;
    using System.Threading.Tasks;
    using AutoMapper.QueryableExtensions;
    using System.Data.Entity;

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

        [Authorize]
        [HttpGet]
        public async Task<IHttpActionResult> Identity()
        {
            var model = await this.UsersService
                .ByUsername(this.CurrentUser.UserName)
                .ProjectTo<IdentityResponseModel>()
                .FirstOrDefaultAsync();

            return this.Data(model);
        }
    }
}
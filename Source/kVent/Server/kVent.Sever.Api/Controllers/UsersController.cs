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
    using Server.Infrastructure.Validation;
    using Services.Logic.Contracts;

    public class UsersController : BaseAuthorizationController
    {
        private readonly IMappingService mappingService;

        public UsersController(
            IUsersService usersService,
            IMappingService mappingService) 
            : base(usersService)
        {
            this.mappingService = mappingService;
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
                .ProjectTo<ListedUsersResponseModel>()
                .ToListAsync();

            return this.Data(users);
        }

        [Route("api/Users/Edit")]
        [Authorize]
        //[AuthorizeEdit]
        [HttpPost]
        [ValidateModel]
        public async Task<IHttpActionResult> Edit(EditUserRequestModel newUser)
        {
            // TODO. CRITICAL - validate 'isAuthorized' to edit works properly.
            var isAuthorized =
                System.Web.HttpContext.Current.User.Identity.GetUserId() == newUser.Id ||
                await this.UsersService.UserIsAdmin(System.Web.HttpContext.Current.User.Identity.Name);

            if(!isAuthorized)
            {
                return this.BadRequest(Server.Common.Constants.NotAuthorized);
            }

            // TODO assert errors. /dublicate username etc.
            var existingUser = await this.UsersService.UserById(newUser.Id);
            await this.UsersService.Edit(this.mappingService.Map(newUser, existingUser));

            return this.Ok(this.mappingService.Map<UserDetailsResponseModel>(existingUser));
        }


        [Route("api/Users/Delete")]
        [Authorize]
        //[AuthorizeEdit]
        [HttpPost]
        [ValidateModel]
        public async Task<IHttpActionResult> Delete(DeleteUserRequestModel user)
        {
            // TODO. CRITICAL - validate 'isAuthorized' to edit works properly.
            var isAuthorized =
                System.Web.HttpContext.Current.User.Identity.GetUserId() == user.Id ||
                await this.UsersService.UserIsAdmin(System.Web.HttpContext.Current.User.Identity.Name);

            if (!isAuthorized)
            {
                return this.BadRequest(Server.Common.Constants.NotAuthorized);
            }

            var existingUser = await this.UsersService.UserById(user.Id);
            await this.UsersService.Delete(this.mappingService.Map(user, existingUser));

            return this.Ok();
        }
    }
}
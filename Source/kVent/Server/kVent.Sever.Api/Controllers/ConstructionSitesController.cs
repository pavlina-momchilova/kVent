namespace kVent.Sever.Api.Controllers
{
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations;
    using System.Threading.Tasks;
    using System.Web.Http;

    using AutoMapper.QueryableExtensions;

    using Data.Models;
    using kVent.Services.Data.Contracts;
    using kVent.Services.Logic.Contracts;
    using kVent.Sever.Api.Controllers.Base;
    using kVent.Server.Infrastructure.Validation;
    using Server.DataTransferModels.ConstructionSites;
    using Server.Infrastructure.Extensions;

    [Authorize]
    public class ConstructionSitesController : BaseAuthorizationController
    {
        private readonly IConstructionSitesService constructionSitesService;
        private readonly IMappingService mappingService;

        public ConstructionSitesController(
            IUsersService usersService,
            IConstructionSitesService constructionSitesService,
            IMappingService mappingService)
            : base (usersService)
        {
            this.constructionSitesService = constructionSitesService;
            this.mappingService = mappingService;
        }


        [Route("api/ConstructionSites/AllConstructionSites")]
        [HttpGet]
        public async Task<IHttpActionResult> AllConstructionSites()
        {
            var constructionSites = await this.constructionSitesService
                .AllConstructionSites()
                .ProjectTo<ListedConstructionSitesResponseModel>()
                .ToListAsync();

            return this.Data(constructionSites);
        }

        [Route("api/ConstructionSites/Add")]
        //[AuthorizeEdit] // TODO add to 'AuthorizeEdit' -> isAdmin and rename to AuthorizeAdminOperation
        [HttpPost]
        [ValidateModel]
        public async Task<IHttpActionResult> Add(AddConstructionSiteRequestModel constructionSite)
        {
            // TODO. CRITICAL - validate 'isAuthorized' to edit works properly.
            // TODO. When refactoring - try to limit the calls to the services.
            var isAuthorized = await this.UsersService.UserIsAdmin(System.Web.HttpContext.Current.User.Identity.Name);

            if (!isAuthorized)
            {
                return this.BadRequest(Server.Common.Constants.NotAuthorized);
            }

            // TODO assert errors. /dublicate companyName etc.
            var addedClient = await this.constructionSitesService
                .AddNew(this.mappingService.Map<ConstructionSite>(constructionSite));

            return this.Ok(this.mappingService.Map<AddConstructionSiteResponseModel>(addedClient));
        }
    }
}
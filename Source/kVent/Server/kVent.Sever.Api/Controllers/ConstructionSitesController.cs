namespace kVent.Sever.Api.Controllers
{
    using System;
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
        private readonly IRecordsService recordsService;
        private readonly IMappingService mappingService;

        public ConstructionSitesController(
            IUsersService usersService,
            IConstructionSitesService constructionSitesService,
            IRecordsService recordsService,
            IMappingService mappingService)
            : base(usersService)
        {
            this.constructionSitesService = constructionSitesService;
            this.recordsService = recordsService;
            this.mappingService = mappingService;
        }

        [HttpGet]
        public async Task<IHttpActionResult> Get([Required]int id)
        {
            var constructionSite = await this.constructionSitesService
                .GetById(id)
                .ProjectTo<ConstructionSitesDetailsResponseModel>()
                .FirstOrDefaultAsync();

            return this.Data(constructionSite);
        }

        [Route("api/ConstructionSites/AllConstructionSites")]
        [HttpGet]
        public async Task<IHttpActionResult> AllConstructionSites()
        {
            var constructionSites = await this.constructionSitesService
                .AllConstructionSites()
                .ProjectTo<ListedConstructionSitesResponseModel>()
                .ToListAsync();

            foreach (var constructioniSite in constructionSites)
            {
                var records = await this.recordsService
                    .GetRecordsByConstructionSiteId(constructioniSite.Id)
                    .ToListAsync();

                TimeSpan totalWorkedHours = new TimeSpan();
                foreach(var record in records)
                {
                    var workedHours = (record.EndTime - record.StartTime) - record.TotalBreakMinutes;
                    totalWorkedHours += workedHours;
                }

                string totalWorkedHoursResult = string.Concat(
                    (totalWorkedHours.Days * 24 + totalWorkedHours.Hours).ToString(),
                    ":",
                    totalWorkedHours.Minutes);
                constructioniSite.TotalWorkedHours = totalWorkedHoursResult;
            }

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

        [Route("api/ConstructionSites/Delete")]
        //[AuthorizeEdit]
        [HttpPost]
        [ValidateModel]
        public async Task<IHttpActionResult> Delete(DeleteConstructionSiteRequestModel constructionSite)
        {
            // TODO. CRITICAL - validate 'isAuthorized' to edit works properly.
            var isAuthorized = await this.UsersService
                .UserIsAdmin(System.Web.HttpContext.Current.User.Identity.Name);

            if (!isAuthorized)
            {
                return this.BadRequest(Server.Common.Constants.NotAuthorized);
            }

            var existingConstructionSite = await this.constructionSitesService.ConstructionSiteById(constructionSite.Id);
            await this.constructionSitesService.Delete(this.mappingService.Map(constructionSite, existingConstructionSite));

            return this.Ok();
        }

        [Route("api/ConstructionSites/Edit")]
        //[AuthorizeEdit]
        [HttpPost]
        [ValidateModel]
        public async Task<IHttpActionResult> Edit(EditConstructionSiteRequestModel updatedConstructionSite)
        {
            // TODO. CRITICAL - validate 'isAuthorized' to edit works properly.
            // TODO. When refactoring - try to limit the calls to the services.
            var isAuthorized = await this.UsersService.UserIsAdmin(System.Web.HttpContext.Current.User.Identity.Name);

            if (!isAuthorized)
            {
                return this.BadRequest(Server.Common.Constants.NotAuthorized);
            }

            // TODO assert errors. /dublicate username etc.
            var existingConstructionSite = await this.constructionSitesService.ConstructionSiteById(updatedConstructionSite.Id);
            await this.constructionSitesService.Edit(this.mappingService.Map(updatedConstructionSite, existingConstructionSite));

            return this.Ok(this.mappingService.Map<ConstructionSitesDetailsResponseModel>(existingConstructionSite));
        }
    }
}
namespace kVent.Sever.Api.Controllers
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations;
    using System.Linq;
    using System.Threading.Tasks;
    using System.Web.Http;
    using Microsoft.AspNet.Identity;

    using AutoMapper.QueryableExtensions;

    using Data.Models;
    using kVent.Services.Data.Contracts;
    using kVent.Services.Logic.Contracts;
    using kVent.Sever.Api.Controllers.Base;
    using kVent.Server.Infrastructure.Validation;
    using Server.DataTransferModels.Records;
    using Server.Infrastructure.Extensions;

    [Authorize]
    public class RecordsController : BaseAuthorizationController
    {
        private readonly IRecordsService recordsService;
        private readonly IMappingService mappingService;

        public RecordsController(
            IUsersService usersService,
            IRecordsService recordsService,
            IMappingService mappingService)
            : base (usersService)
        {
            this.recordsService = recordsService;
            this.mappingService = mappingService;
        }

        [HttpGet]
        public async Task<IHttpActionResult> Get()
        {
            var records = await this.recordsService
                .AllRecords()
                .ProjectTo<ListedRecordsResponseModel>()
                .ToListAsync();

            return this.Data(records);
        }

        [HttpGet]
        public async Task<IHttpActionResult> Get([Required]string username)
        {
            var records = await this.recordsService
                .GetRecordsByUsername(username)
                .ProjectTo<ListedRecordsPerUserResponseModel>()
                .ToListAsync();

            return this.Data(records);
        }

        [HttpGet]
        public async Task<IHttpActionResult> Get(string fromDate, string toDate, string constructionSiteName)
        {
            DateTime fromDateData = DateTime.MinValue;
            DateTime toDateData = DateTime.Today;

            if(!string.IsNullOrEmpty(fromDate))
            {
                fromDateData = Convert.ToDateTime(fromDate);
            }

            if (!string.IsNullOrEmpty(toDate))
            {
                toDateData = Convert.ToDateTime(toDate);
            }

            var records = await this.recordsService
                .AllRecords()
                .ProjectTo<ListedRecordsResponseModel>()
                .ToListAsync();
            
            return this.Data(records);
        }

        [Route("api/Records/Add")]
        //[AuthorizeEdit] // TODO add to 'AuthorizeEdit' -> isAdmin and rename to AuthorizeAdminOperation
        [HttpPost]
        [ValidateModel]
        public async Task<IHttpActionResult> Add(AddRecordRequestModel record)
        {
            // TODO. CRITICAL - validate 'isAuthorized' to edit works properly.
            // TODO. When refactoring - try to limit the calls to the services.
            var isAuthorized =
                System.Web.HttpContext.Current.User.Identity.GetUserId() == record.UserId ||
                await this.UsersService.UserIsAdmin(System.Web.HttpContext.Current.User.Identity.Name);

            if (!isAuthorized)
            {
                return this.BadRequest(Server.Common.Constants.NotAuthorized);
            }
            
            var addedRecord = await this.recordsService
                .AddNew(this.mappingService.Map<Record>(record));

            return this.Ok(this.mappingService.Map<AddRecordResponseModel>(addedRecord));
        }
    }
}
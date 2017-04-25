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
    using Server.Common;

    [Authorize]
    public class RecordsController : BaseAuthorizationController
    {
        private readonly IRecordsService recordsService;
        private readonly IMappingService mappingService;

        public RecordsController(
            IUsersService usersService,
            IRecordsService recordsService,
            IMappingService mappingService)
            : base(usersService)
        {
            this.recordsService = recordsService;
            this.mappingService = mappingService;
        }

        [HttpGet]
        public async Task<IHttpActionResult> Get()
        {
            // TODO: Try to remove async for workaround server time and login faliure issue.
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

            foreach (var record in records)
            {
                record.CanBeModified = kVentExtensions.CanModifyRecord(record.DateCreated);
            }

            return this.Data(records);
        }

        public async Task<IHttpActionResult> Get(string userId, int id)
        {
            // TODO. CRITICAL - validate 'isAuthorized' to edit works properly.
            // TODO. When refactoring - try to limit the calls to the services
            var isAuthorized =
                System.Web.HttpContext.Current.User.Identity.GetUserId() == userId ||
                await this.UsersService.UserIsAdmin(System.Web.HttpContext.Current.User.Identity.Name);

            if (!isAuthorized)
            {
                return this.BadRequest(Server.Common.Constants.NotAuthorized);
            }

            // TODO: Logic for admin users can be implemented here.
            var record = await this.recordsService
                .RecordById(userId, id)
                .ProjectTo<RecordDetailsResponseModel>()
                .FirstOrDefaultAsync();

            return this.Data(record);
        }

        [HttpGet]
        public async Task<IHttpActionResult> Get(
            string fromDate, string toDate, string constructionSiteName, string userName)
        {
            /*
             * Could be done with method 'Filter' with FilterRecords poco as parameter.
             * */

            DateTime fromDateData = DateTime.MinValue;
            DateTime toDateData = DateTime.Today;
            string nullString = "null";

            if (constructionSiteName == "null")
            {
                constructionSiteName = "";
            }

            if (userName == "undefined")
            {
                userName = "";
            }

            if (!string.IsNullOrEmpty(fromDate) && fromDate != nullString)
            {
                fromDateData = Convert.ToDateTime(fromDate);
            }

            if (!string.IsNullOrEmpty(toDate) && toDate != nullString)
            {
                toDateData = Convert.ToDateTime(toDate);
            }

            var records = await this.recordsService
                .AllRecords()
                .Where(r => r.User.UserName == userName || r.User.UserName.Contains(userName))
                .ProjectTo<ListedRecordsResponseModel>()
                .Where(i => fromDateData <= i.Date &&
                    i.Date <= toDateData &&
                    (i.ConstructionSiteName == constructionSiteName ||
                        i.ConstructionSiteName.Contains(constructionSiteName)))
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

        [Route("api/Records/Delete")]
        //[AuthorizeEdit] // TODO add to 'AuthorizeEdit' -> isAdmin and rename to AuthorizeAdminOperation
        [HttpPost]
        [ValidateModel]
        public async Task<IHttpActionResult> Delete(string userId, int recordId)
        {
            // TODO. CRITICAL - validate 'isAuthorized' to edit works properly.
            // TODO. When refactoring - try to limit the calls to the services.
            var isAuthorized =
                System.Web.HttpContext.Current.User.Identity.GetUserId() == userId ||
                await this.UsersService.UserIsAdmin(System.Web.HttpContext.Current.User.Identity.Name);

            if (!isAuthorized)
            {
                return this.BadRequest(Server.Common.Constants.NotAuthorized);
            }

            var record = await this.recordsService.
                RecordById(userId, recordId).FirstOrDefaultAsync();

            if (record != null && kVentExtensions.CanModifyRecord(record.DateCreated))
            {
                await this.recordsService.Delete(record);
                return this.Ok();
            }
            else
            {
                return this.BadRequest(Server.Common.Constants.RecordCantBeDeleted);
            }
        }

        [Route("api/Records/Edit")]
        //[AuthorizeEdit] // TODO add to 'AuthorizeEdit' -> isAdmin and rename to AuthorizeAdminOperation
        [HttpPost]
        [ValidateModel]
        public async Task<IHttpActionResult> Edit(EditRecordRequestModel newRecord)
        {
            var isAuthorized =
                System.Web.HttpContext.Current.User.Identity.GetUserId() == newRecord.UserId ||
                await this.UsersService.UserIsAdmin(System.Web.HttpContext.Current.User.Identity.Name);

            if (!isAuthorized)
            {
                return this.BadRequest(Server.Common.Constants.NotAuthorized);
            }

            var existingRecord = this.recordsService.RecordById(newRecord.UserId, newRecord.Id).FirstOrDefault();
            await this.recordsService.Edit(this.mappingService.Map(newRecord, existingRecord));
            
            return this.Ok(this.mappingService.Map<RecordDetailsResponseModel>(existingRecord));
        }
    }
}
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
    using Server.DataTransferModels.Client;
    using Server.Infrastructure.Extensions;

    [Authorize]
    public class ClientsController : BaseAuthorizationController
    {
        private readonly IClientsService clientsService;
        private readonly IMappingService mappingService;

        public ClientsController(
            IUsersService usersService,
            IClientsService clientsService,
            IMappingService mappingService)
            : base (usersService)
        {
            this.clientsService = clientsService;
            this.mappingService = mappingService;
        }

        [HttpGet]
        public async Task<IHttpActionResult> Get([Required]int id)
        {
            var client = await this.clientsService
                .GetById(id)
                .ProjectTo<ClientDetailsResponseModel>()
                .FirstOrDefaultAsync();

            return this.Data(client);
        }

        [Route("api/Clients/Add")]
        //[AuthorizeEdit] // TODO add to 'AuthorizeEdit' -> isAdmin and rename to AuthorizeAdminOperation
        [HttpPost]
        [ValidateModel]
        public async Task<IHttpActionResult> Add(AddClientRequestModel client)
        {
            // TODO. CRITICAL - validate 'isAuthorized' to edit works properly.
            // TODO. When refactoring - try to limit the calls to the services.
            var isAuthorized = await this.UsersService.UserIsAdmin(System.Web.HttpContext.Current.User.Identity.Name);

            if (!isAuthorized)
            {
                return this.BadRequest(Server.Common.Constants.NotAuthorized);
            }

            // TODO assert errors. /dublicate companyName etc.
            var addedClient = await this.clientsService
                .AddNew(this.mappingService.Map<Client>(client));

            return this.Ok(this.mappingService.Map<AddClientResponseModel>(addedClient));
        }
        
        [Route("api/Clients/AllClients")]
        [HttpGet]
        public async Task<IHttpActionResult> AllClients()
        {
            var clients = await this.clientsService
                .AllClients()
                .ProjectTo<ListedClientsResponseModel>()
                .ToListAsync();

            return this.Data(clients);
        }

        [Route("api/Clients/Delete")]
        //[AuthorizeEdit]
        [HttpPost]
        [ValidateModel]
        public async Task<IHttpActionResult> Delete(DeleteClientRequestModel client)
        {
            // TODO. CRITICAL - validate 'isAuthorized' to edit works properly.
            var isAuthorized = await this.UsersService
                .UserIsAdmin(System.Web.HttpContext.Current.User.Identity.Name);

            if (!isAuthorized)
            {
                return this.BadRequest(Server.Common.Constants.NotAuthorized);
            }

            var existingClient = await this.clientsService.ClientById(client.Id);
            await this.clientsService.Delete(this.mappingService.Map(client, existingClient));

            return this.Ok();
        }

        [Route("api/Clients/Edit")]
        //[AuthorizeEdit]
        [HttpPost]
        [ValidateModel]
        public async Task<IHttpActionResult> Edit(EditClientRequestModel updatedClient)
        {
            // TODO. CRITICAL - validate 'isAuthorized' to edit works properly.
            // TODO. When refactoring - try to limit the calls to the services.
            var isAuthorized = await this.UsersService.UserIsAdmin(System.Web.HttpContext.Current.User.Identity.Name);

            if (!isAuthorized)
            {
                return this.BadRequest(Server.Common.Constants.NotAuthorized);
            }

            // TODO assert errors. /dublicate username etc.
            var existingClient = await this.clientsService.ClientById(updatedClient.Id);
            await this.clientsService.Edit(this.mappingService.Map(updatedClient, existingClient));

            return this.Ok(this.mappingService.Map<ClientDetailsResponseModel>(existingClient));
        }
    }
}
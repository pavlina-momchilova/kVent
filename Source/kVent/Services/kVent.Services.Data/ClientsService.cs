namespace kVent.Services.Data
{
    using System;
    using System.Data.Entity;
    using System.Linq;
    using System.Threading.Tasks;

    using kVent.Data.Models;
    using kVent.Data.Common.Repositories;
    using kVent.Services.Data.Contracts;

    public class ClientsService : IClientsService
    {
        private readonly IRepository<Client> clients;

        public ClientsService(IRepository<Client> clients)
        {
            this.clients = clients;
        }

        public async Task<Client> AddNew(Client client)
        {
            client.DateCreated = DateTime.Now;
            this.clients.Add(client);
            await this.clients.SaveChangesAsync();
            return client;
        }

        public IQueryable<Client> AllClients()
        {
            return this.clients.All();
        }

        public async Task<Client> ClientById(int id)
        {
            return await this.clients
                .All()
                .Where(c => c.Id == id)
                .FirstOrDefaultAsync();
        }

        public async Task Delete(Client client)
        {
            this.clients.Delete(client);
            await this.clients.SaveChangesAsync();
        }

        public async Task Edit(Client updatedClient)
        {
            this.clients.Update(updatedClient);
            await this.clients.SaveChangesAsync();
        }

        public IQueryable<Client> GetById(int id)
        {
            return this.clients
                .All()
                .Where(c => c.Id == id);                
        }
    }
}

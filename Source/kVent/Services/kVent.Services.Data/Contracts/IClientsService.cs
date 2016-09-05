namespace kVent.Services.Data.Contracts
{
    using System.Linq;
    using System.Threading.Tasks;

    using kVent.Data.Models;
    using kVent.Services.Common;

    public interface IClientsService : IService
    {
        Task<Client> AddNew(Client client);

        IQueryable<Client> AllClients();

        IQueryable<Client> GetById(int id);

        Task<Client> ClientById(int id);

        Task Edit(Client updatedClient);

        Task Delete(Client client);
    }
}

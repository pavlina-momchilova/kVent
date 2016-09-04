namespace kVent.Services.Data.Contracts
{
    using System.Linq;
    using System.Threading.Tasks;

    using kVent.Data.Models;
    using kVent.Services.Common;
    
    public interface IUsersService : IService
    {
        IQueryable<User> ByUsername(string username);

        IQueryable<User> AllUsers();

        IQueryable<User> GetByUserName(string username);

        Task<User> UserById(string id);

        Task<bool> UserIsAdmin(string username);

        Task<string> UserIdByUsername(string username);

        Task Edit(User updatedUser);

        Task Delete(User user);
    }
}

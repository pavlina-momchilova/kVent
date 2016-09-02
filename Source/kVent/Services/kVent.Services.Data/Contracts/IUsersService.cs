namespace kVent.Services.Data.Contracts
{
    using System.Linq;

    using kVent.Data.Models;
    using kVent.Services.Common;

    public interface IUsersService : IService
    {
        IQueryable<User> ByUsername(string username);

        IQueryable<User> AllUsers();

        IQueryable<User> GetByUserName(string username);
    }
}

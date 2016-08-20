namespace kVent.Services.Data
{
    using System;
    using System.Linq;

    using kVent.Data.Models;
    using kVent.Services.Data.Contracts;
    using kVent.Data.Common.Repositories;

    public class UsersService : IUsersService
    {
        private readonly IRepository<User> users;

        public UsersService(IRepository<User> users)
        {
            this.users = users;
        }

        public IQueryable<User> ByUsername(string name)
        {
            throw new NotImplementedException();
        }
    }
}

namespace kVent.Services.Data
{
    using System;
    using System.Linq;

    using kVent.Data.Models;
    using kVent.Data.Common.Repositories;
    using kVent.Services.Data.Contracts;

    public class UsersService : IUsersService
    {
        private readonly IRepository<User> users;

        public UsersService(IRepository<User> users)
        {
            this.users = users;
        }

        public IQueryable<User> ByUsername(string username)
        {
            return this.users
                   .All()
                   .Where(u => u.UserName == username);
        }
    }
}

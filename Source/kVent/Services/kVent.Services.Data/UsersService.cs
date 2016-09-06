namespace kVent.Services.Data
{
    using System;
    using System.Data.Entity;
    using System.Linq;
    using System.Threading.Tasks;

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
                   .Where(u => u.UserName.Equals(username));
        }

        public IQueryable<User> AllUsers()
        {
            return this.users
                .All()
                .OrderByDescending(u => u.DateCreated);
        }

        public IQueryable<User> GetByUserName(string username)
        {
            return this.users
                .All()
                .Where(u => u.UserName == username);
        }

        public async Task<bool> UserIsAdmin(string username)
        {
            return await this.users
                .All()
                .Where(u => u.UserName == username)
                .Select(u => u.IsAdmin)
                .FirstOrDefaultAsync();
        }

        public async Task<string> UserIdByUsername(string username)
        {
            return await this.users
                   .All()
                   .Where(u => u.UserName == username)
                   .Select(u => u.Id)
                   .FirstOrDefaultAsync();
        }

        public async Task Edit(User updatedUser)
        {
            this.users.Update(updatedUser);
            await this.users.SaveChangesAsync();
        }

        public async Task Delete(User user)
        {
            this.users.Delete(user);
            await this.users.SaveChangesAsync();
        }

        public async Task<User> UserById(string id)
        {
            return await this.users
                .All()
                .Where(u => u.Id.Equals(id))
                .FirstOrDefaultAsync();
        }
    }
}

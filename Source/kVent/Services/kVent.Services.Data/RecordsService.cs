namespace kVent.Services.Data
{
    using System;
    using System.Data.Entity;
    using System.Linq;
    using System.Threading.Tasks;

    using kVent.Data.Models;
    using kVent.Data.Common.Repositories;
    using kVent.Services.Data.Contracts;

    public class RecordsService : IRecordsService
    {

        private const int TotalBreakMinutes = 30; // TODO; decimal hours in user and timespan must work propperly.

        private readonly IRepository<Record> records;
        private readonly IRepository<User> users;
        private readonly IRepository<ConstructionSite> constructionSites;

        public RecordsService(
            IRepository<Record> records, 
            IRepository<User> users,
            IRepository<ConstructionSite> constructionSites)
        {
            this.records = records;
            this.users = users;
            this.constructionSites = constructionSites;
        }

        //public Record ById(string id)
        //{
        //    return this.records
        //           .All()
        //           .Where(u => u.Id.Equals(id))
        //           .FirstOrDefault();
        //}

        public async Task<Record> AddNew(Record record)
        {
            record.DateCreated = DateTime.Now;
            record.TotalBreakMinutes = new TimeSpan(0, TotalBreakMinutes, 0);

            // TODO - refactoring in to separate table with userId an total experience hours!
            var user = this.users.GetById(record.UserId);
            var experience = record.EndTime -
                record.StartTime -
                record.TotalBreakMinutes;
            user.TotalExperience += (decimal)experience.TotalHours;
            this.users.Update(user);
            await this.users.SaveChangesAsync();

            this.constructionSites.All().ToList(); // to 'invoke' constructionSites. Find solution later.

            this.records.Add(record);
            await this.records.SaveChangesAsync();

            return record;
        }

        public IQueryable<Record> AllRecords()
        {
            return this.records
                .All()
                .OrderByDescending(r => r.Date)
                .ThenByDescending(r => r.StartTime)
                .ThenByDescending(r => r.DateCreated);
        }

        public IQueryable<Record> RecordById(string userId, int id)
        {
            return this.records
                .All()
                .Where(r => r.Id == id && r.UserId == userId);
        }

        public async Task Delete(Record record)
        {
            this.records.Delete(record);
            await this.records.SaveChangesAsync();
        }

        public async Task Edit(Record updatedRecord)
        {
            this.records.Update(updatedRecord);
            await this.records.SaveChangesAsync();
        }

        public IQueryable<Record> GetRecordsByUsername(string username)
        {
            return this.records
                .All()
                .Where(r => r.User.UserName == username)
                .OrderByDescending(r => r.Date)
                .ThenByDescending(r => r.StartTime)
                .ThenByDescending(r => r.DateCreated);
        }

        public IQueryable<Record> GetRecordsByConstructionSiteId(int constructionSiteId)
        {
            return this.records
                .All()
                .Where(r => r.ConstructionSiteId == constructionSiteId);
        }
    }
}

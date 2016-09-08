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

        private const int TotalBreakMinutes = 60; // TODO; decimal hours in user and timespan must work propperly.

        private readonly IRepository<Record> records;
        private readonly IRepository<User> users;

        public RecordsService(IRepository<Record> records, IRepository<User> users)
        {
            this.records = records;
            this.users = users;
        }

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

            this.records.Add(record);
            await this.records.SaveChangesAsync();
            return record;
        }

        public IQueryable<Record> AllRecords()
        {
            return this.records
                .All()
                .OrderByDescending(r => r.Date)
                .ThenByDescending(r => r.StartTime);
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

        public IQueryable<Record> GetById(int id)
        {
            return this.records
                .All()
                .Where(r => r.Id == id);
        }

        public async Task<Record> RecordById(int id)
        {
            return await this.records
                .All()
                .Where(r => r.Id == id)
                .FirstOrDefaultAsync();
        }
    }
}

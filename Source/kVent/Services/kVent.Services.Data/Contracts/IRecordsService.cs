namespace kVent.Services.Data.Contracts
{
    using System.Linq;
    using System.Threading.Tasks;

    using kVent.Data.Models;
    using kVent.Services.Common;

    public interface IRecordsService : IService
    {
        Task<Record> AddNew(Record record);

        IQueryable<Record> AllRecords();

        IQueryable<Record> GetRecordsByUsername(string username);

        IQueryable<Record> GetRecordsByConstructionSiteId(int constructionSiteId);

        IQueryable<Record> RecordById(string userId, int id);

        Task Edit(Record updatedRecord);

        Task Delete(Record record);
    }
}

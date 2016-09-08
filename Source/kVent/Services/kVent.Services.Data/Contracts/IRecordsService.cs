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

        IQueryable<Record> GetById(int id);

        Task<Record> RecordById(int id);

        Task Edit(Record updatedRecord);

        Task Delete(Record record);
    }
}

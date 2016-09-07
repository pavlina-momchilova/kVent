namespace kVent.Services.Data.Contracts
{
    using System.Linq;
    using System.Threading.Tasks;

    using kVent.Data.Models;
    using kVent.Services.Common;

    public interface IConstructionSitesService : IService
    {
        Task<ConstructionSite> AddNew(ConstructionSite constructionSite);

        IQueryable<ConstructionSite> AllConstructionSites();

        IQueryable<ConstructionSite> GetById(int id);

        Task<ConstructionSite> ConstructionSiteById(int id);

        Task Edit(ConstructionSite updatedConstructionSite);

        Task Delete(ConstructionSite constructionSite);
    }
}

namespace kVent.Services.Data
{
    using System;
    using System.Data.Entity;
    using System.Linq;
    using System.Threading.Tasks;

    using kVent.Data.Models;
    using kVent.Data.Common.Repositories;
    using kVent.Services.Data.Contracts;

    public class ConstructionSitesService : IConstructionSitesService
    {
        private readonly IRepository<ConstructionSite> constructionSites;

        public ConstructionSitesService(IRepository<ConstructionSite> constructionSites)
        {
            this.constructionSites  = constructionSites;
        }

        public async Task<ConstructionSite> AddNew(ConstructionSite constructionSite)
        {
            constructionSite.DateCreated = DateTime.Now;
            this.constructionSites.Add(constructionSite);
            await this.constructionSites.SaveChangesAsync();
            return constructionSite;
        }

        public IQueryable<ConstructionSite> AllConstructionSites()
        {
            return this.constructionSites
                .All()
                .OrderByDescending(c => c.DateCreated);
        }

        public async Task<ConstructionSite> ConstructionSiteById(int id)
        {
            return await this.constructionSites
                .All()
                .Where(c => c.Id == id)
                .FirstOrDefaultAsync();
        }

        public async Task Delete(ConstructionSite constructionSite)
        {
            this.constructionSites.Delete(constructionSite);
            await this.constructionSites.SaveChangesAsync();
        }

        public async Task Edit(ConstructionSite updatedConstructionSite)
        {
            this.constructionSites.Update(updatedConstructionSite);
            await this.constructionSites.SaveChangesAsync();
        }

        public IQueryable<ConstructionSite> GetById(int id)
        {
            return this.constructionSites
                .All()
                .Where(c => c.Id == id);
        }
    }
}

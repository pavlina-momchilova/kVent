namespace kVent.Data
{
    using Microsoft.AspNet.Identity.EntityFramework;

    using kVent.Data.Models;
    using System.Data.Entity;

    public class kVentDbContext : IdentityDbContext<User>, IkVentDbContext
    {
        public kVentDbContext()
            : base("DefaultConnection", throwIfV1Schema: false)
        {
        }

        public virtual IDbSet<Client> Clients { get; set; }

        public virtual IDbSet<ConstructionSite> ConstructionSites { get; set; }

        public virtual IDbSet<Record> Records { get; set; }

        public static kVentDbContext Create()
        {
            return new kVentDbContext();
        }
    }
}

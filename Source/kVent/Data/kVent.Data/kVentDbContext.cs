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

        public virtual IDbSet<Client> Commits { get; set; }

        public static kVentDbContext Create()
        {
            return new kVentDbContext();
        }
    }
}

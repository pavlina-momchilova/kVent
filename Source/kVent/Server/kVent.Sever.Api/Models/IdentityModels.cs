namespace kVent.Sever.Api.Models
{
    using Microsoft.AspNet.Identity.EntityFramework;
    using kVent.Data.Models;

    // You can add profile data for the user by adding more properties to your ApplicationUser class, please visit http://go.microsoft.com/fwlink/?LinkID=317594 to learn more.
    public class kVentDbContext : IdentityDbContext<User>
    {
        public kVentDbContext()
            : base("DefaultConnection", throwIfV1Schema: false)
        {
        }
        
        public static kVentDbContext Create()
        {
            return new kVentDbContext();
        }
    }
}
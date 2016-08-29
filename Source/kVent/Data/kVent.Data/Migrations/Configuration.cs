namespace kVent.Data.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    using Models;
    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.EntityFramework;
    public sealed class Configuration : DbMigrationsConfiguration<kVentDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
            AutomaticMigrationDataLossAllowed = true; // TODO set false in production
        }

        protected override void Seed(kVentDbContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data. E.g.
            //
            //    context.People.AddOrUpdate(
            //      p => p.FullName,
            //      new Person { FullName = "Andrew Peters" },
            //      new Person { FullName = "Brice Lambson" },
            //      new Person { FullName = "Rowan Miller" }
            //    );
            //

            var userManager = new UserManager<User>(new UserStore<User>(new kVentDbContext()));

            var roleManager = new RoleManager<IdentityRole>(new RoleStore<IdentityRole>(new kVentDbContext()));

            var user = new User()
            {
                UserName = "Admin",
                Email = "admin@admin.admin",
                EmailConfirmed = true,
                IsAdmin = true // TODO refactoring of user roles tables and IsAdmin
            };

            userManager.Create(user, "admin12345");

            if (roleManager.Roles.Count() == 0)
            {
                roleManager.Create(new IdentityRole { Name = kVent.Server.Common.Constants.AdminRole });
                roleManager.Create(new IdentityRole { Name = kVent.Server.Common.Constants.UserRole });
            }

            var admin = userManager.FindByName("Admin");
            userManager.AddToRoles(admin.Id, new string[] { "Admin" });
        }
    }
}

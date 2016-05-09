namespace kVent.Sever.Api
{
    using System.Data.Entity;

    using kVent.Data;
    using kVent.Data.Migrations;

    public static class DatabaseConfig
    {
        public static void Initialize()
        {
            Database.SetInitializer(new MigrateDatabaseToLatestVersion<kVentDbContext, Configuration>());
            //kVentDbContext.Create().Database.Initialize(true);
        }
    }
}
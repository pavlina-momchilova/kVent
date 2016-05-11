namespace kVent.Sever.Api
{
    using Owin;
    using System.Data.Entity;
    using System.Web.Http;

    using kVent.Data;
    using kVent.Data.Migrations;

    public class WebApiStartup
    {
        public static void StartWebApi(IAppBuilder app)
        {
            Database.SetInitializer(new MigrateDatabaseToLatestVersion<kVentDbContext, Configuration>());
            // Automapper register mappings

            var httpConfig = new HttpConfiguration();

            //ODataConfig
            WebApiConfig.Register(httpConfig);

            httpConfig.EnsureInitialized();
        }
    }
}
namespace kVent.Sever.Api
{
    using Owin;
    using System.Web.Http;
    using Ninject.Web.Common.OwinHost;
    using Ninject.Web.WebApi.OwinHost;
    using System.Data.Entity;

    using Data;
    using Data.Migrations;
    using Server.Common;

    public class WebApiStartup
    {
        public static void StartWebApi(IAppBuilder app)
        {
            Database.SetInitializer(new MigrateDatabaseToLatestVersion<kVentDbContext, Configuration>());
            DatabaseConfig.Initialize();
            // Automapper register mappings
            AutoMapperConfig.RegisterMappings(Constants.DataTransferModelsAssembly);

            var httpConfig = new HttpConfiguration();

            //ODataConfig
            WebApiConfig.Register(httpConfig);

            httpConfig.EnsureInitialized();

            app
                .UseNinjectMiddleware(NinjectConfig.CreateKernel)
                .UseNinjectWebApi(httpConfig);
        }
    }
}
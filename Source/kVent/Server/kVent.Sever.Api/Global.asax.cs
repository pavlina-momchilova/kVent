namespace kVent.Sever.Api
{
    using Owin;
    using System.Web.Http;

    public class WebApiApplication : System.Web.HttpApplication
    {
        public static void StartWebApi(IAppBuilder app)
        {
            Application_Start();
        }

        protected static void Application_Start()
        {
            DatabaseConfig.Initialize();
            //AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
        }
    }
}

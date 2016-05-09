[assembly: Microsoft.Owin.OwinStartup(typeof(kVent.Client.App.Startup))]
namespace kVent.Client.App
{
    using Owin;

    using kVent.Sever.Api;

    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            //ConfigureAuth(app);
            WebApiApplication.StartWebApi(app);
        }
    }
}
using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(kVent.Sever.Api.Startup))]

namespace kVent.Sever.Api
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}

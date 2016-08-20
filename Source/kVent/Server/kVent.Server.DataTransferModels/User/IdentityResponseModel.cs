namespace kVent.Server.DataTransferModels
{
    using kVent.Data.Models;
    using kVent.Server.Common.Mappings;

    public class IdentityResponseModel : IMapFrom<User>
    {
        public string UserName { get; set; }
    }
}

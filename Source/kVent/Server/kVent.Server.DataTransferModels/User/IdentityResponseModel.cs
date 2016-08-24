namespace kVent.Server.DataTransferModels.User
{
    using kVent.Data.Models;
    using kVent.Server.Common.Mapping;

    public class IdentityResponseModel : IMapFrom<User>
    {
        public string UserName { get; set; }

        public bool IsAdmin { get; set; }

        public string AvatarUrl { get; set; }
    }
}

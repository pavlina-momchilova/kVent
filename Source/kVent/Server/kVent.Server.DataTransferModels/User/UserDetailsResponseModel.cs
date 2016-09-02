namespace kVent.Server.DataTransferModels.User
{
    using kVent.Data.Models;
    using kVent.Server.Common.Mapping;

    public class UserDetailsResponseModel : IMapFrom<User>
    {
        public string UserName { get; set; }

        public bool IsAdmin { get; set; }
    }
}

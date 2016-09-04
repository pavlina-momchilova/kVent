namespace kVent.Server.DataTransferModels.User
{
    using kVent.Data.Models;
    using kVent.Server.Common.Mapping;

    public class UserDetailsResponseModel : IMapFrom<User>
    {
        public string Id { get; set; }

        public string UserName { get; set; }

        public bool IsAdmin { get; set; }

        public string Email { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Speciality { get; set; }
    }
}

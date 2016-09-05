namespace kVent.Server.DataTransferModels.Client
{
    using kVent.Data.Models;
    using kVent.Server.Common.Mapping;

    public class ClientDetailsResponseModel : IMapFrom<Client>
    {
        public int Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string CompanyName { get; set; }

        public string PhoneNumber { get; set; }

        public string Email { get; set; }
    }
}

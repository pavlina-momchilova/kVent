namespace kVent.Server.DataTransferModels.Client
{
    using System.ComponentModel.DataAnnotations;

    using kVent.Data.Models;
    using Common.Mapping;

    public class AddClientRequestModel : IMapFrom<Client>
    {
        [Required]
        [MinLength(Common.Constants.MinNameLength)]
        [MaxLength(Server.Common.Constants.MaxNameLength)]
        public string FirstName { get; set; }

        [Required]
        [MinLength(Server.Common.Constants.MinNameLength)]
        [MaxLength(Server.Common.Constants.MaxNameLength)]
        public string LastName { get; set; }


        [Required]
        [MinLength(Server.Common.Constants.MinNameLength)]
        [MaxLength(Server.Common.Constants.MaxNameLength)]
        public string CompanyName { get; set; }

        public string PhoneNumber { get; set; }

        public string Email { get; set; }
    }
}

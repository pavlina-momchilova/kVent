namespace kVent.Server.DataTransferModels.User
{
    using System.ComponentModel.DataAnnotations;

    using kVent.Data.Models;
    using kVent.Server.Common.Mapping;

    public class EditUserRequestModel : IMapFrom<User>
    {
        [Required]
        public string Id { get; set; }

        [Required]
        public string UserName { get; set; }

        [Required]
        public string Email { get; set; }

        public bool IsAdmin { get; set; }

        [Required]
        [MinLength(Server.Common.Constants.MinNameLength)]
        [MaxLength(Server.Common.Constants.MaxNameLength)]
        public string FirstName { get; set; }

        [Required]
        [MinLength(Server.Common.Constants.MinNameLength)]
        [MaxLength(Server.Common.Constants.MaxNameLength)]
        public string LastName { get; set; }

        [MinLength(Server.Common.Constants.MinSpecialityLength)]
        [MaxLength(Server.Common.Constants.MaxSpecialityLength)]
        public string Speciality { get; set; }
    }
}

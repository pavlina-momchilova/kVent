namespace kVent.Server.DataTransferModels.User
{
    using System.ComponentModel.DataAnnotations;

    using kVent.Data.Models;
    using kVent.Server.Common.Mapping;

    public class DeleteUserRequestModel : IMapFrom<User>
    {
        [Required]
        public string Id { get; set; }
    }
}

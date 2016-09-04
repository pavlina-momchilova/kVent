namespace kVent.Server.DataTransferModels.User
{
    using kVent.Data.Models;
    using kVent.Server.Common.Mapping;

    public class EditUserRequestModel : IMapFrom<User>
    {
        public string Id { get; set; }

        public string UserName { get; set; }

        public string Email { get; set; }
    }
}

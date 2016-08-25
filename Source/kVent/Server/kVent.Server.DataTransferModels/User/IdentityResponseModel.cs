namespace kVent.Server.DataTransferModels.User
{
    using AutoMapper;
    using kVent.Data.Models;
    using kVent.Server.Common.Mapping;

    public class IdentityResponseModel : IMapFrom<User>
    {
        public string UserName { get; set; }

        public bool IsAdmin { get; set; }
    }
}

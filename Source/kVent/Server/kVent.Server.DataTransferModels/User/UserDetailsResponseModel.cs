namespace kVent.Server.DataTransferModels.User
{
    using System.Collections.Generic;

    using AutoMapper;

    using kVent.Data.Models;
    using kVent.Server.Common.Mapping;
    using ConstructionSites;
    using System.Linq;
    public class UserDetailsResponseModel : IMapFrom<User>, IHaveCustomMappings
    {
        public string Id { get; set; }

        public string UserName { get; set; }

        public bool IsAdmin { get; set; }

        public string Email { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Speciality { get; set; }

        public IEnumerable<ConstructionSiteResponseModel> ConstructionSites { get; set; }

        public void CreateMappings(IConfiguration configuration)
        {
            configuration.CreateMap<User, UserDetailsResponseModel>()
                .ForMember(c => c.ConstructionSites, opt => opt.MapFrom(u => u.Records.Select(rc => rc.ConstructionSite).Distinct()));
        }
    }
}

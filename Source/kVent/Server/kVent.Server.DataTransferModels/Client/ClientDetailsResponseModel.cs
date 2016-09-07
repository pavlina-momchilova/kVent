namespace kVent.Server.DataTransferModels.Client
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using AutoMapper;
    using kVent.Data.Models;
    using kVent.Server.Common.Mapping;
    using ConstructionSites;

    public class ClientDetailsResponseModel : IMapFrom<Client>//, IHaveCustomMappings
    {
        public int Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string CompanyName { get; set; }

        public string PhoneNumber { get; set; }

        public string Email { get; set; }

        public DateTime DateCreated { get; set; }

        public IEnumerable<ConstructionSiteResponseModel> ConstructionSites { get; set; }

        //public void CreateMappings(IConfiguration configuration)
        //{
        //    configuration.CreateMap<User, ClientDetailsResponseModel>()
        //        .ForMember(c => c.ConstructionSites, opt => opt.MapFrom(u => u.Records.Select(rc => rc.ConstructionSite).Distinct()));
        //}
    }
}

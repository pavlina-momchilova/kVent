namespace kVent.Server.DataTransferModels.Records
{
    using System;

    using AutoMapper;

    using Common;
    using kVent.Data.Models;
    using kVent.Server.Common.Mapping;

    public class ListedRecordsResponseModel : IMapFrom<Record>, IHaveCustomMappings
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string ConstructionSiteAddress { get; set; }

        public string ConstructionSiteName { get; set; }

        public DateTime Date { get; set; }

        public TimeSpan StartTime { get; set; }

        public TimeSpan EndTime { get; set; }

        public TimeSpan LunchBreak
        {
            get
            {
                return new Constants().LunchBreak;
            }
        }

        public TimeSpan TotalHours
        {
            get
            {
                return (this.EndTime - this.StartTime) - this.LunchBreak;
            }
        }

        public void CreateMappings(IConfiguration configuration)
        {
            configuration.CreateMap<Record, ListedRecordsResponseModel>()
                .ForMember(c => c.Name, opt => opt.MapFrom(r => r.User.FirstName + " " + r.User.LastName))
                .ForMember(c => c.ConstructionSiteName, opt => opt.MapFrom(r => r.ConstructionSite.ConstructionSiteName))
                .ForMember(c => c.ConstructionSiteAddress, opt => opt.MapFrom(r => r.ConstructionSite.City + ", " + r.ConstructionSite.Address));
        }
    }
}

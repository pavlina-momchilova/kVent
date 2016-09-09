namespace kVent.Server.DataTransferModels.Records
{
    using System;

    using AutoMapper;

    using kVent.Data.Models;
    using kVent.Server.Common.Mapping;

    public class ListedRecordsPerUserResponseModel : IMapFrom<Record>, IHaveCustomMappings
    {
        public int Id { get; set; }

        public string ConstructionSiteName { get; set; }

        public DateTime Date { get; set; }
        
        public TimeSpan StartTime { get; set; }

        public TimeSpan EndTime { get; set; }

        public void CreateMappings(IConfiguration configuration)
        {
            configuration.CreateMap<Record, ListedRecordsPerUserResponseModel>()
                .ForMember(c => c.ConstructionSiteName, opt => opt.MapFrom(r => r.ConstructionSite.ConstructionSiteName));
        }
    }
}

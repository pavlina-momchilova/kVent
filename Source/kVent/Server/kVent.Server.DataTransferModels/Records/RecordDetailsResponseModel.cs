namespace kVent.Server.DataTransferModels.Records
{
    using System;

    using AutoMapper;

    using kVent.Data.Models;
    using kVent.Server.Common.Mapping;

    public class RecordDetailsResponseModel : IMapFrom<Record>, IHaveCustomMappings
    {
        public int Id { get; set; }

        public DateTime Date { get; set; }

        public TimeSpan StartTime { get; set; }

        public TimeSpan EndTime { get; set; }

        public DateTime DateCreated { get; set; }

        public string UserId { get; set; }

        public int ConstructionSiteId { get; set; }

        public int TotalBreakMinutes { get; set; }
        
        public void CreateMappings(IConfiguration configuration)
        {
            configuration.CreateMap<Record, RecordDetailsResponseModel>()
                   .ForMember(c => c.TotalBreakMinutes, opt => opt.MapFrom(r => (r.TotalBreakMinutes.Minutes + (r.TotalBreakMinutes.Hours * 60))));
        }
    }
}

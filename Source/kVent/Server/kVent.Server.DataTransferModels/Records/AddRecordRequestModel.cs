namespace kVent.Server.DataTransferModels.Records
{
    using System;
    using System.ComponentModel.DataAnnotations;

    using kVent.Data.Models;
    using Common.Mapping;
    using AutoMapper;

    public class AddRecordRequestModel : IMapFrom<Record>, IHaveCustomMappings
    {
        [Required]
        public DateTime Date { get; set; }

        [Required]
        public TimeSpan StartTime { get; set; }

        [Required]
        public TimeSpan EndTime { get; set; }

        [Required]
        public int TotalBreakMinutes { get; set; }

        [Required]
        public string UserId { get; set; }

        [Required]
        public int ConstructionSiteId { get; set; }

        public void CreateMappings(IConfiguration configuration)
        {
            configuration.CreateMap<AddRecordRequestModel, Record>()
                   .ForMember(c => c.TotalBreakMinutes, opt => opt.MapFrom(r => new TimeSpan(0, r.TotalBreakMinutes, 0)));
        }
    }
}

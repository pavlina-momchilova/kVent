namespace kVent.Server.DataTransferModels.Records
{
    using System;
    using System.ComponentModel.DataAnnotations;

    using kVent.Data.Models;
    using Common.Mapping;
    using AutoMapper;

    public class AddRecordResponseModel : IMapFrom<Record>, IHaveCustomMappings
    {
        public int Id { get; set; }

        public string UserName { get; set; }

        public string ConstructionSiteName { get; set; }

        public TimeSpan WorkedHours { get; set; }

        public void CreateMappings(IConfiguration configuration)
        {
            configuration.CreateMap<Record, AddRecordResponseModel>()
                .ForMember(c => c.UserName, opt => opt.MapFrom(r => r.User.UserName))
                .ForMember(c => c.ConstructionSiteName, opt => opt.MapFrom(r => r.ConstructionSite.ConstructionSiteName))
                .ForMember(c => c.WorkedHours, opt => opt.MapFrom(r => r.EndTime - r.StartTime - r.TotalBreakMinutes));
        }
    }
}

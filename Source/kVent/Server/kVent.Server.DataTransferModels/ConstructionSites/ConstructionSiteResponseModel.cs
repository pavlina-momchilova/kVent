namespace kVent.Server.DataTransferModels.ConstructionSites
{
    using System;
    using System.Collections;

    using AutoMapper;

    using kVent.Data.Models;
    using kVent.Server.Common.Mapping;

    public class ConstructionSiteResponseModel : IMapFrom<ConstructionSite>
    {
        public int Id { get; set; }
        
        public string ConstructionSiteName { get; set; }

        public string Address { get; set; }

        public bool PaymentPerHour { get; set; }
    }
}

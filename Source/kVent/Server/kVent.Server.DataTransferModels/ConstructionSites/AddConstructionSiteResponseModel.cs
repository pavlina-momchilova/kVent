namespace kVent.Server.DataTransferModels.ConstructionSites
{
    using System;
    using System.ComponentModel.DataAnnotations;

    using kVent.Data.Models;
    using Common.Mapping;

    public class AddConstructionSiteResponseModel : IMapFrom<ConstructionSite>
    {
        public string ConstructionSiteName { get; set; }
    }
}

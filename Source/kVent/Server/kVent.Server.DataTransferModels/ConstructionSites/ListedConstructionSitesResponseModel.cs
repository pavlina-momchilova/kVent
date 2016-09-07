namespace kVent.Server.DataTransferModels.ConstructionSites
{
    using System;
    using System.ComponentModel.DataAnnotations;

    using kVent.Data.Models;
    using Common.Mapping;

    public class ListedConstructionSitesResponseModel : IMapFrom<ConstructionSite>
    {
        public int Id { get; set; }

        public string ConstructionSiteName { get; set; }

        public string Address { get; set; }
    }
}

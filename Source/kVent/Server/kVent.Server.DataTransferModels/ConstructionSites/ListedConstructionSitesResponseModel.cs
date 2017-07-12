namespace kVent.Server.DataTransferModels.ConstructionSites
{
    using System;
    using System.ComponentModel.DataAnnotations;
    using System.Linq;

    using kVent.Data.Models;
    using Common.Mapping;
    using AutoMapper;

    public class ListedConstructionSitesResponseModel : IMapFrom<ConstructionSite>
    {
        public int Id { get; set; }

        public string ConstructionSiteName { get; set; }

        public string Address { get; set; }

        // Must be setted from the controller
        // due to automapper, entityframework and db restrictions
        // public TimeSpan TotalWorkedHours { get; set; }
        public string TotalWorkedHours { get; set; }
    }
}

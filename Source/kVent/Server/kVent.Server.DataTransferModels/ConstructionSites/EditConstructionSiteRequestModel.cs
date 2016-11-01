namespace kVent.Server.DataTransferModels.ConstructionSites
{
    using System;
    using System.ComponentModel.DataAnnotations;

    using kVent.Data.Models;
    using Common.Mapping;

    public class EditConstructionSiteRequestModel : IMapFrom<ConstructionSite>
    {
        [Required]
        public int Id { get; set; }

        [Required]
        [MinLength(Server.Common.Constants.MinNameLength)]
        [MaxLength(Server.Common.Constants.MaxNameLength)]
        public string ConstructionSiteName { get; set; }

        public string City { get; set; }

        [Required]
        [MinLength(Server.Common.Constants.MinNameLength)]
        [MaxLength(Server.Common.Constants.MaxNameLength)]
        public string Address { get; set; }

        public bool PaymentPerHour { get; set; }

        [Required]
        public int ClientId { get; set; }
    }
}

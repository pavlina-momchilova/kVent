namespace kVent.Server.DataTransferModels.ConstructionSites
{
    using System.ComponentModel.DataAnnotations;

    using kVent.Data.Models;
    using kVent.Server.Common.Mapping;

    public class DeleteConstructionSiteRequestModel : IMapFrom<ConstructionSite>
    {
        [Required]
        public int Id { get; set; }
    }
}

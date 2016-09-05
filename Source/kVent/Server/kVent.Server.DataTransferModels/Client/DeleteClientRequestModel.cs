namespace kVent.Server.DataTransferModels.Client
{
    using System.ComponentModel.DataAnnotations;

    using kVent.Data.Models;
    using kVent.Server.Common.Mapping;

    public class DeleteClientRequestModel : IMapFrom<Client>
    {
        [Required]
        public int Id { get; set; }
    }
}

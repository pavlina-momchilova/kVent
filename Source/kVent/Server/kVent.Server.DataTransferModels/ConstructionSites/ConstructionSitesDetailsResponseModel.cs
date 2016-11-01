namespace kVent.Server.DataTransferModels.ConstructionSites
{
    using System;
    using kVent.Data.Models;
    using kVent.Server.Common.Mapping;

    public class ConstructionSitesDetailsResponseModel : IMapFrom<ConstructionSite>
    {
        public int Id { get; set; }
        
        public string ConstructionSiteName { get; set; }

        public string City { get; set; }

        public string Address { get; set; }

        public bool PaymentPerHour { get; set; }

        public DateTime DateCreated { get; set; }

        public int ClientId { get; set; }

        //public virtual Client Client { get; set; }

        //public virtual ICollection<Record> Records
        //{
        //    get { return this.records; }
        //    set { this.records = value; }
        //}
    }
}

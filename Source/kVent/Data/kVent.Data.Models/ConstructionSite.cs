namespace kVent.Data.Models
{
    using System;
    using System.Collections;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    public class ConstructionSite
    {
        private ICollection<Record> records;

        public ConstructionSite()
        {
            this.records = new HashSet<Record>();
        }

        [Key]
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

        public DateTime DateCreated { get; set; }

        public int ClientId { get; set; }

        public virtual Client Client { get; set; }

        public virtual ICollection<Record> Records
        {
            get { return this.records; }
            set { this.records = value; }
        }
    }
}

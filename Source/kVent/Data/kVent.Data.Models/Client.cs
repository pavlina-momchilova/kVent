namespace kVent.Data.Models
{
    using System;
    using System.Collections;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class Client
    {
        private ICollection<ConstructionSite> constructionSites;

        public Client()
        {
            this.constructionSites = new HashSet<ConstructionSite>();
        }

        [Key]
        public int Id { get; set; }

        [Required]
        [MinLength(Server.Common.Constants.MinNameLength)]
        [MaxLength(Server.Common.Constants.MaxNameLength)]
        public string FirstName { get; set; }

        [Required]
        [MinLength(Server.Common.Constants.MinNameLength)]
        [MaxLength(Server.Common.Constants.MaxNameLength)]
        public string LastName { get; set; }


        [Required]
        [Index(IsUnique = true)]
        [MinLength(Server.Common.Constants.MinNameLength)]
        [MaxLength(Server.Common.Constants.MaxNameLength)]
        public string CompanyName { get; set; }

        public string PhoneNumber { get; set; }
        
        public string Email { get; set; }

        public DateTime DateCreated { get; set; }

        public virtual ICollection<ConstructionSite> ConstructionSites
        {
            get { return this.constructionSites; }
            set { this.constructionSites = value; }
        }
    }
}

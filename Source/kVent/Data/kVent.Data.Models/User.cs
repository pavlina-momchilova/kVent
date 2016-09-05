namespace kVent.Data.Models
{
    using System;
    using System.Collections.Generic;
    using System.Security.Claims;
    using System.Threading.Tasks;
    using System.ComponentModel.DataAnnotations;
    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.EntityFramework;

    public class User : IdentityUser
    {
        private ICollection<Record> records;

        public User()
        {
            this.records = new HashSet<Record>();
        }

        public bool IsAdmin { get; set; }

        [Required]
        [MinLength(Server.Common.Constants.MinNameLength)]
        [MaxLength(Server.Common.Constants.MaxNameLength)]
        public string FirstName { get; set; }

        [Required]
        [MinLength(Server.Common.Constants.MinNameLength)]
        [MaxLength(Server.Common.Constants.MaxNameLength)]
        public string LastName { get; set; }

        [MinLength(Server.Common.Constants.MinSpecialityLength)]
        [MaxLength(Server.Common.Constants.MaxSpecialityLength)]
        public string Speciality { get; set; }
        
        public DateTime DateCreated { get; set; }

        public string LastEntry { get; set; }

        public virtual ICollection<Record> Records
        {
            get { return this.records; }
            set { this.records = value; }
        }

        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<User> manager, string authenticationType)
        {
            // Note the authenticationType must match the one defined in CookieAuthenticationOptions.AuthenticationType
            var userIdentity = await manager.CreateIdentityAsync(this, authenticationType);
            // Add custom user claims here
            return userIdentity;
        }
    }
}

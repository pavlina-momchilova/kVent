namespace kVent.Data.Models
{
    using System;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class Record
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [Required]
        public TimeSpan StartTime { get; set; }

        [Required]
        public TimeSpan EndTime { get; set; }

        [Required]
        public TimeSpan TotalBreakMinutes { get; set; }

        public DateTime DateCreated { get; set; }

        public string UserId { get; set; }
        
        public virtual User User { get; set; }

        public int ConstructionSiteId { get; set; }
        
        public virtual ConstructionSite ConstructionSite { get; set; }
    }
}
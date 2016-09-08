﻿namespace kVent.Server.DataTransferModels.Records
{
    using System;
    using System.ComponentModel.DataAnnotations;

    using kVent.Data.Models;
    using Common.Mapping;

    public class AddRecordRequestModel : IMapFrom<Record>
    {
        [Required]
        public DateTime Date { get; set; }

        [Required]
        public TimeSpan StartTime { get; set; }

        [Required]
        public TimeSpan EndTime { get; set; }

        [Required]
        public string UserId { get; set; }

        [Required]
        public int ConstructionSiteId { get; set; }
    }
}

﻿namespace kVent.Server.DataTransferModels.Records
{
    using System;

    using AutoMapper;

    using kVent.Data.Models;
    using kVent.Server.Common.Mapping;

    public class RecordDetailsResponseModel : IMapFrom<Record>
    {
        public int Id { get; set; }

        public DateTime Date { get; set; }

        public TimeSpan StartTime { get; set; }

        public TimeSpan EndTime { get; set; }

        public DateTime DateCreated { get; set; }

        public string UserId { get; set; }

        public int ConstructionSiteId { get; set; }
    }
}

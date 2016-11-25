namespace kVent.Server.DataTransferModels.Records
{
    using System;

    using kVent.Data.Models;
    using Common.Mapping;

    public class FilterRecords : IMapFrom<Record>
    {
        public DateTime FromDate { get; set; }

        public DateTime ToDate { get; set; }

        public string ConstructionSiteName { get; set; }
    }
}

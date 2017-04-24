namespace kVent.Server.Common
{
    using System;

    public static class kVentExtensions
    {
        public static bool CanModifyRecord(DateTime recordCreationDate)
        {
            return DateTime.Now.AddDays(-Constants.DaysAvailableForRecordModification) <= recordCreationDate;
        }
    }
}

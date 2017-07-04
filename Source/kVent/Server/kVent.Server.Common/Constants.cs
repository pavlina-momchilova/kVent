namespace kVent.Server.Common
{
    using System;

    public class Constants
    {
        public const string DataTransferModelsAssembly = "kVent.Server.DataTransferModels";
        public const string InfrastructureAssembly = "kVent.Server.Infrastructure";
        public const string DataServicesAssembly = "kVent.Services.Data";
        public const string LogicServicesAssembly = "kVent.Services.Logic";

        public const string ShortDateFormat = "dd MMM yyyy";
        // public const int MaxProjectsPageSize = 128;

        public const int MaxUploadedFileSize = 10485760;

        public const string RequestCannotBeEmpty = "Request cannot be empty";
        public const string RequestedResourceWasNotFound = "The requested resource was not found";
        public const string EditingProjectIsNotAllowed = "You are not allowed to edit this project";
        public const string NotAuthorized = "You are not authorized for this operation";
        public const string InvalidPageNumber = "Invalid page number";
        public const string RecordCantBeDeleted = "Record can not be deleted";

        public const string AdminRole = "Admin";
        public const string UserRole = "User";

        public const int MinNameLength = 2;
        public const int MaxNameLength = 30;

        public const int MinSpecialityLength = 2;
        public const int MaxSpecialityLength = 30;

        public const int DaysAvailableForRecordModification = 31; // The original value is 2
        public TimeSpan LunchBreak
        {
            get
            {
                return new TimeSpan(0, 30, 0);
            }
        }
    }
}

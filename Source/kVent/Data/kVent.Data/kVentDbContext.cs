﻿namespace kVent.Data
{
    using Microsoft.AspNet.Identity.EntityFramework;

    using kVent.Data.Models;

    public class kVentDbContext : IdentityDbContext<User>, IkVentDbContext
    {
        public kVentDbContext()
            : base("name=kVent", throwIfV1Schema: false)
        {
        }

        public static kVentDbContext Create()
        {
            return new kVentDbContext();
        }
    }
}

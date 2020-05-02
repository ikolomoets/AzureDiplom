using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Diplom.DataModels;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace Diplom.Data
{
    public class DiplomDatabaseContext : IdentityDbContext<AppUser>
    {
        public DiplomDatabaseContext()
        {
        }

        public DiplomDatabaseContext(DbContextOptions<DiplomDatabaseContext> options)
            : base(options)
        {
        }

        public virtual DbSet<JobSeekers> JobSeekers { get; set; }
        public virtual DbSet<TestData> TestData { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }
    }
}

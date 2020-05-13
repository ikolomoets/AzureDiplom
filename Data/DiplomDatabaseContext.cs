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

        public virtual DbSet<AppUserInfo> AppUserInfos { get; set; }
        public virtual DbSet<Emergency> Emergencies { get; set; }
        public virtual DbSet<Event> Events { get; set; }
        public virtual DbSet<EventPosition> EventPositions { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Event>(b =>
            {
                b.HasKey(e1 => e1.EventId);
                b.OwnsOne(e1 => e1.EventPosition, md => {
                    md.ToTable("EventPosition");
                });

                b.ToTable("Event");
            });

            
        }
    }
}

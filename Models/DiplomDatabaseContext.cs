using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Diplom.Models
{
    public partial class DiplomDatabaseContext : DbContext
    {
        public DiplomDatabaseContext()
        {
        }

        public DiplomDatabaseContext(DbContextOptions<DiplomDatabaseContext> options)
            : base(options)
        {
        }

        public virtual DbSet<TestData> TestData { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=tcp:diplomserv.database.windows.net,1433;Initial Catalog=DiplomDatabase;Persist Security Info=False;User ID=diplomadmin;Password=Dfyz12091999;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TestData>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.Name)
                    .HasMaxLength(10)
                    .IsFixedLength();
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}

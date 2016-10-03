namespace Justjack.Dashboard.Models
{
    using System;
    using Microsoft.EntityFrameworkCore;

    public partial class JustjackContext : DbContext
    {
        public JustjackContext(DbContextOptions<JustjackContext> options) : base(options)
        {
            //this.Configuration.LazyLoadingEnabled = true;
        }

        public virtual DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            
        }
    }
}

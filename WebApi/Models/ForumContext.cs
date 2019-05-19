using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace WebApi.Models
{
    public partial class ForumContext : IdentityDbContext<User>
    {
        public ForumContext(DbContextOptions<ForumContext>
            options) : base(options) { }
        public virtual DbSet<Post> Posts { get; set; }
        public virtual DbSet<Theme> Themes { get; set; }
        public virtual DbSet<Category> Categories { get; set; }
        public virtual DbSet<Like> Likes { get; set; }
        public virtual DbSet<User> Users { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Theme>()
                .HasOne(e => e.User)
                .WithMany(e => e.Themes)
                .HasForeignKey(e => e.UserId);

            modelBuilder.Entity<Post>()
                .HasOne(e => e.User)
                .WithMany(e => e.Posts)
                .HasForeignKey(e => e.UserId);

            modelBuilder.Entity<Post>()
                .HasOne(e => e.Theme)
                .WithMany(e => e.Posts)
                .HasForeignKey(e => e.ThemeId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Like>()
                .HasOne(e => e.User)
                .WithMany(e => e.Likes)
                .HasForeignKey(e => e.UserId);

            modelBuilder.Entity<Like>()
               .HasOne(e => e.Post)
               .WithMany(e => e.Likes)
               .HasForeignKey(e => e.PostId)
               .IsRequired(false)
               .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Theme>()
                .HasOne(e => e.Category)
                .WithMany(e => e.Themes)
                .HasForeignKey(e => e.CategoryId);
        }
    }
}

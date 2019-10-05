using GameOfRooms.API.Models;
using Microsoft.EntityFrameworkCore;

namespace GameOfRooms.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        public DbSet<Value> Values { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Photo> Photos { get; set; }
        public DbSet<Room> Rooms { get; set; }
        public DbSet<Reservation> Reservations { get; set; }
        public DbSet<Rating> Ratings { get; set; }
        public DbSet<SignUp> Consultations { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<SignUp>().HasKey(k => new { k.UserId, k.ReservationId });
            builder.Entity<SignUp>().HasOne(u => u.Student).WithMany(u => u.Consultations).HasForeignKey(u => u.UserId).OnDelete(DeleteBehavior.Restrict);
            builder.Entity<SignUp>().HasOne(u => u.Consultation).WithMany(u => u.Students).HasForeignKey(u => u.ReservationId).OnDelete(DeleteBehavior.Restrict);


        }

    }
}
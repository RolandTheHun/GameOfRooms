using System.Collections.Generic;
using System.Threading.Tasks;
using GameOfRooms.API.Models;
using Microsoft.EntityFrameworkCore;

namespace GameOfRooms.API.Data
{
    public class GoRepository : IGoRepository
    {
        private readonly DataContext _context;
        public GoRepository(DataContext context)
        {
            _context = context;

        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<Room> GetRoom(int id)
        {

            var room = await _context.Rooms.FirstOrDefaultAsync(r => r.Id == id);

            return room;
        }

        public async Task<IEnumerable<Room>> GetRooms()
        {
            var rooms = await _context.Rooms.ToListAsync();

            return rooms;
        }

        public async Task<User> GetUser(int id)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);

            return user;
        }

        public async Task<IEnumerable<User>> GetUsers()
        {
            var users = await _context.Users.ToListAsync();

            return users;
        }

        public async Task<Rating> GetRating(int id)
        {
            var rating = await _context.Ratings.FirstOrDefaultAsync(r => r.Id == id);

            return rating;
        }

        public async Task<IEnumerable<Rating>> GetRatings()
        {
            var ratings = await _context.Ratings.ToListAsync();

            return ratings;
        }

        public async Task<Reservation> GetReservation(int id)
        {
            var reservation = await _context.Reservations.FirstOrDefaultAsync(r => r.Id == id);

            return reservation;
        }

        public async Task<IEnumerable<Reservation>> GetReservations()
        {
            var reservations = await _context.Reservations.ToListAsync();

            return reservations;
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
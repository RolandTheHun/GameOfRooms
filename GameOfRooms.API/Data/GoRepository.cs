using System.Collections.Generic;
using System.Threading.Tasks;
using GameOfRooms.API.Helpers;
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

        public async Task<PagedList<User>> GetUsers(UserParams userParams)
        {
            var users = _context.Users;

            return await PagedList<User>.CreateAsync(users, userParams.PageNumber, userParams.PageSize);
        }

        public async Task<Rating> GetRating(int id)
        {
            var rating = await _context.Ratings.FirstOrDefaultAsync(r => r.Id == id);

            return rating;
        }

        public async Task<PagedList<Rating>> GetRatings(RatingParams ratingParams)
        {
            var ratings = _context.Ratings;

            return await PagedList<Rating>.CreateAsync(ratings, ratingParams.PageNumber, ratingParams.PageSize);
        }

        public async Task<Reservation> GetReservation(int id)
        {
            var reservation = await _context.Reservations.FirstOrDefaultAsync(r => r.Id == id);

            return reservation;
        }

        public async Task<PagedList<Reservation>> GetReservations(ReservationParams reservationParams)
        {
            var reservations = _context.Reservations;

            return await PagedList<Reservation>.CreateAsync(reservations, reservationParams.PageNumber, reservationParams.PageSize);
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<SignUp> GetConsultation(int userId, int reservationId)
        {
            return await _context.Consultations.FirstOrDefaultAsync(u => u.UserId == userId && u.ReservationId == reservationId);
        }

        public async Task<IEnumerable<SignUp>> GetUserConsultations()
        {
            var consultatitions = await _context.Consultations.ToListAsync();

            return consultatitions;
        }
    }
}
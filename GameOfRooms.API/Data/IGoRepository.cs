using System.Collections.Generic;
using System.Threading.Tasks;
using GameOfRooms.API.Helpers;
using GameOfRooms.API.Models;

namespace GameOfRooms.API.Data
{
    public interface IGoRepository
    {
        void Add<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        Task<bool> SaveAll();
        Task<PagedList<User>> GetUsers(UserParams userParams);
        Task<User> GetUser(int id);
        Task<IEnumerable<Room>> GetRooms();
        Task<Room> GetRoom(int id);
        Task<PagedList<Rating>> GetRatings(RatingParams ratingParams);
        Task<Rating> GetRating(int id);
        Task<PagedList<Reservation>> GetReservations(ReservationParams reservationParams);
        Task<Reservation> GetReservation(int id);
        Task<SignUp> GetConsultation(int userId, int consultationId);
        Task<IEnumerable<SignUp>> GetUserConsultations();
    }
}
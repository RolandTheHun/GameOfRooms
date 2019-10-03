using System.Collections.Generic;
using System.Threading.Tasks;
using GameOfRooms.API.Models;

namespace GameOfRooms.API.Data
{
    public interface IGoRepository
    {
        void Add<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        Task<bool> SaveAll();
        Task<IEnumerable<User>> GetUsers();
        Task<User> GetUser(int id);
        Task<IEnumerable<Room>> GetRooms();
        Task<Room> GetRoom(int id);
        Task<IEnumerable<Rating>> GetRatings();
        Task<Rating> GetRating(int id);
        Task<IEnumerable<Reservation>> GetReservations();
        Task<Reservation> GetReservation(int id);
    }
}
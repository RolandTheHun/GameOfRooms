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

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
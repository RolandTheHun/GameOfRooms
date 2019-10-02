using System;

namespace GameOfRooms.API.Models
{
    public class Reservation
    {
        public int Id { get; set; }
        public DateTime From { get; set; }
        public DateTime Until { get; set; }
        public Room Room { get; set; }
        public int RoomId { get; set; }
        public User User { get; set; }
        public int UserId { get; set; }
        public string Summary { get; set; }
        public bool OwnMachine { get; set; }
        public string Title { get; set; }

    }
}
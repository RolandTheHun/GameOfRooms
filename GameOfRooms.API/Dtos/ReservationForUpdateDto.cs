using System;

namespace GameOfRooms.API.Dtos
{
    public class ReservationForUpdateDto
    {
        public DateTime From { get; set; }
        public DateTime Until { get; set; }
        public int RoomId { get; set; }
        public string Summary { get; set; }
        public bool OwnMachine { get; set; }
        public string Title { get; set; }
        public int Capacity { get; set; }
    }
}
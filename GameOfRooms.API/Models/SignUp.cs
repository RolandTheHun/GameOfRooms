namespace GameOfRooms.API.Models
{
    public class SignUp
    {
        public int UserId { get; set; }
        public int ReservationId { get; set; }
        public User Student { get; set; }
        public Reservation Consultation { get; set; }
    }
}
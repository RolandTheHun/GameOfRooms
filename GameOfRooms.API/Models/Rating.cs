namespace GameOfRooms.API.Models
{
    public class Rating
    {
        public int Id { get; set; }
        public User User { get; set; }
        public int UserId { get; set; }
        public int Star { get; set; }
        public string Overall { get; set; }
    }
}
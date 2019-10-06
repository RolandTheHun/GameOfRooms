using GameOfRooms.API.Models;

namespace GameOfRooms.API.Helpers
{
    public class UserParams
    {
        private const int MaxPageSize = 50;
        public int PageNumber { get; set; } = 1;
        public int pageSize { get; set; } = 10;
        public int PageSize
        {
            get { return pageSize; }
            set { pageSize = (value > MaxPageSize) ? MaxPageSize : value; }
        }

        public int UserId { get; set; }
        public UserType UserType { get; set; }
    }
}
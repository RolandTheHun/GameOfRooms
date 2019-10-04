using System;
using GameOfRooms.API.Models;

namespace GameOfRooms.API.Dtos
{
    public class UserForListDto
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Gender { get; set; }
        public int Age { get; set; }
        public string KnownAs { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string PhotoUrl { get; set; }
        public UserType UserType { get; set; }
        public string FamilyName { get; set; }
        public string FirstName { get; set; }
        public string Email { get; set; }
        public int TelephoneNumber { get; set; }
    }
}
using System;
using System.Collections.Generic;

namespace GameOfRooms.API.Models
{

    public enum UserType
    {
        student, consultant, admin
    }
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public string Gender { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string KnownAs { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }
        public string Introduction { get; set; }
        public string LookingFor { get; set; }
        public string Intrests { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public ICollection<Photo> Photos { get; set; }
        public UserType UserType { get; set; }
        public string FamilyName { get; set; }
        public string FirstName { get; set; }
        public string Email { get; set; }
        public int TelephoneNumber { get; set; }
    }
}
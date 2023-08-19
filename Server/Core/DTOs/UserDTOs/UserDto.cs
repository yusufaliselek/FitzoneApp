using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.DTOs.UserDTOs
{
    public class UserDto
    {
        public string Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string? Gender { get; set; }
        public string? Role { get; set; }
        public string? TCKN { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? PhoneNumber { get; set; }
        public string? BirthdayDate { get; set; }
        public string? Biography { get; set; }
        public string? Location { get; set; }
        public string? PersonalPhoto { get; set; }
        public float? Qualification { get; set; }
        public string? Profession { get; set; }
        public string? CreatedAt { get; set; }
    }
}

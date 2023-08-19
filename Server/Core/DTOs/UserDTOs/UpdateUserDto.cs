using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.DTOs.UserDTOs
{
    public class UpdateUserDto
    {
        public string Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? RoleId { get; set; }
        public string? Qualification { get; set; }
        public string? PhoneNumber { get; set; }
        public string? BirthdayDate { get; set; }
        public string? Profession { get; set; }
        public string? TCKNO { get; set; }
        public string? Gender { get; set; }
        public string? Biography { get; set; }
        public string? Location { get; set; }
        public bool IsActive { get; set; }
        public string? CreatedAt { get; set; }
        public string? UpdatedAt { get; set; }
    }
}

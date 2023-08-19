using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace Server.Core.Models
{
    public class User : IdentityUser
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Role { get; set; }
        public string? BirthdayDate { get; set; }
        public string? TCKNO { get; set; }
        public string? Gender { get; set; }
        public bool IsActive { get; set; }
        public string? CreatedAt { get; set; }
        public string? UpdatedAt { get; set; }

    }
}

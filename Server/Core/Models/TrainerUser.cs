using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace Server.Core.Models
{
    public class TrainerUser : IdentityUser
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Biography { get; set; }
        public string? TCKN { get; set; }
        public string? Gender { get; set; }
        public DateTime BirthdayDate { get; set; }
        public string? PersonalPhoto { get; set; }
        public string? Location { get; set; }
        public List<TrainerLicence> TrainerLicences { get; set; } // Dependent Entity
        public List<TrainerClub> TrainerClubs { get; set; } // Dependent Entity
        public float? Qualification { get; set; }
        public string? Profession { get; set; }
        public bool IsActive { get; set; } = true;
        public TrainerCanEdit TrainerCanEdit { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set;} = DateTime.Now;

    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace Server.Core.Models
{
    public class TrainerUser : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Biography { get; set; }
        public int TCKN { get; set; }
        public DateTime BirthdayDate { get; set; }
        public string PersonalPhoto { get; set; }
        public ICollection<TrainerLicence> TrainerLicences { get; set; } // Dependent Entity
        public ICollection<TrainerClub> TrainerClubs { get; set; } // Dependent Entity
        public float Qualification { get; set; }
        public string Profession { get; set; }
        public bool IsActive { get; set; }
        public TrainerCanEdit TrainerCanEdit { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set;}

    }
}

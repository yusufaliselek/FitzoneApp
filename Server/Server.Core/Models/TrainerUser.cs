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
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Biography { get; set; } = string.Empty;
        public Int64 TCKN { get; set; } = Int64.MaxValue; // -> Enese sorulacak
        public bool Gender { get; set; }
        public DateTime BirthdayDate { get; set; }
        public string PersonalPhoto { get; set; } = string.Empty;
      //  public string Location { get; set; } = string.Empty;
        public ICollection<TrainerLicence> TrainerLicences { get; set; } // Dependent Entity
        public ICollection<TrainerClub> TrainerClubs { get; set; } // Dependent Entity
        public float Qualification { get; set; }
        public string Profession { get; set; } = string.Empty;
        public bool IsActive { get; set; } = true;
        public TrainerCanEdit TrainerCanEdit { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime? UpdatedAt { get; set;} = DateTime.Now;

    }
}

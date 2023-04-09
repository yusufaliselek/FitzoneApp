using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Core.Models
{
    public class TrainerCanEdit : BaseEntity
    {
        public bool IsFounder { get; set; }
        public bool CanAddTrainerUser { get; set; }
        public bool CanEditTrainerUser { get; set; }
        public bool CanDeleteTrainerUser { get; set; }
        public bool CanAddTraining { get; set; }
        public bool CanEditTraining { get; set;}
        public bool CanDeleteTraining { get; set;}
        public bool CanAddMember { get; set; }
        public bool CanEditMember { get; set; }
        public bool CanDeleteMember { get; set;}
        public bool CanDefineProgram { get; set; }
        public string TrainerUserId { get; set; }
        public TrainerUser TrainerUser { get; set; }
    }
}

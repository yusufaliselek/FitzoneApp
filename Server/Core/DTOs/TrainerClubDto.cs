using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Core.DTOs
{
    public class TrainerClubDto : BaseDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime EntryDate { get; set; }
        public DateTime LeaveDate { get; set; }
        public string Role { get; set; }
        public string TrainerUserId { get; set; }
    }
}

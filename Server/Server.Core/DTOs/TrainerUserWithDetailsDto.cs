using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Core.DTOs
{
    public class TrainerUserWithDetailsDto : TrainerUserDto
    {
        public string Biography { get; set; }
        public string PhoneNumber { get; set; }
        public int TCKN { get; set; }
        public List<TrainerLicenceDto> TrainerLicences { get; set; }
        public List<TrainerClubDto> TrainerClubs { get; set; }
        public TrainerCanEditDto TrainerCanEdit { get; set; }
    }
}

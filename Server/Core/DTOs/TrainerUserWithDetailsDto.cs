using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Core.DTOs
{
    public class TrainerUserWithDetailsDto : TrainerUserDto
    {
        public List<TrainerLicenceDto> TrainerLicences { get; set; }
        public List<TrainerClubDto> TrainerClubs { get; set; }
        public TrainerCanEditDto TrainerCanEdit { get; set; }
    }
}

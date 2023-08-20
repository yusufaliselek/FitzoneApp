using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.DTOs.TrainerDetailDTOs
{
    public class CreateTrainerDetailDto
    {
        public string TrainerId { get; set; }
        public string? Biography { get; set; }
        public string? Location { get; set; }
        public string? Profession { get; set; }
        public string? Qualification { get; set; }
        public string? TrainerPermissionId { get; set; }
    }
}

using Core.DTOs.TrainerPermissionDTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.DTOs.TrainerDetailDTOs
{
    public class TrainerDetailDto
    {
        public string Id { get; set; }
        public string TrainerId { get; set; }
        public string? Biography { get; set; }
        public string? Location { get; set; }
        public string? Profession { get; set; }
        public string? Qualification { get; set; }
        public string? TrainerPermissionId { get; set; }
        public TrainerPermissionDto? TrainerPermission { get; set; }
        public string? CreatedAt { get; set; }
        public string? UpdatedAt { get; set; }
    }
}

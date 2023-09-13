using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.DTOs.TrainerPermissionDTOs
{
    public class TrainerWithPermissionDto
    {
        public string Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string? TrainerPermissionId { get; set; }
        public string? TrainerPermissionName { get; set; }
    }
}

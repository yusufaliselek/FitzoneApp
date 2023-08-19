using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.DTOs.TrainerPermissionDTOs
{
    public class TrainerPermissionDto
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public bool CanCreateUser { get; set; }
        public bool CanEditUser { get; set; }
        public bool CanDeleteUser { get; set; }
        public bool CanCreateRole { get; set; }
        public bool CanEditRole { get; set; }
        public bool CanDeleteRole { get; set; }
        public bool CanCreateTraining { get; set; }
        public bool CanEditTraining { get; set; }
        public bool CanDeleteTraining { get; set; }
        public bool CanCreateTrainingCategory { get; set; }
        public bool CanEditTrainingCategory { get; set; }
        public bool CanDeleteTrainingCategory { get; set; }
        public bool CanCreateMember { get; set; }
        public bool CanEditMember { get; set; }
        public bool CanDeleteMember { get; set; }
        public bool CanSetRole { get; set; }
        public string? CreatedAt { get; set; }
        public string? UpdatedAt { get; set; }
    }
}

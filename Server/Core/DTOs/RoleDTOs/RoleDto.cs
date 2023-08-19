﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.DTOs.RoleDTOs
{
    public class RoleDto
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }
        public string? CreatedAt { get; set; }
        public string? UpdatedAt { get; set; }
    }
}

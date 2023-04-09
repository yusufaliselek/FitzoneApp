﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Core.DTOs
{
    public class TrainerLicenceDto : BaseDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime LicenceDate { get; set; }
        public string TrainerUserId { get; set; }
    }
}

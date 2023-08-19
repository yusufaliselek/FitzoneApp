using Server.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Models
{
    public class Role:BaseEntity
    {
        public string Name { get; set; }
        public string? Description { get; set; }

    }
}

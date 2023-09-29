using Server.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Models
{
    public class Document : BaseEntity
    {
        public string Name { get; set; }
        public string Path { get; set; }
        public string ContentType { get; set; }
    }
}

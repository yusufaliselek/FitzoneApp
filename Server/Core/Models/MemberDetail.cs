using Server.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Models
{
    public class MemberDetail : BaseEntity
    {
        public string UserId { get; set; }
        public string MemberType { get; set; }
        public string MemberRegisterDate { get; set; }
        public string MemberExpireDate { get; set; }
        public string MemberStatus { get; set; }
        
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.DTOs.MemberDetailDTOs
{
    public class UpdateMemberDetailDto
    {
        public string Id { get; set; }
        public string UserId { get; set; }
        public string MemberType { get; set; }
        public string MemberRegisterDate { get; set; }
        public string MemberExpireDate { get; set; }
        public string MemberStatus { get; set; }
    }
}

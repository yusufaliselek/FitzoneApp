using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.DTOs.FileDTOs
{
    public class ResponseFileDetailDto
    {
        public byte[] Data { get; set; }
        public string Message { get; set; }
        public bool Success { get; set; }
    }
}

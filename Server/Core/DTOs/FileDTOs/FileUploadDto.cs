using Core.Models;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.DTOs.FileDTOs
{
    public class FileUploadDto
    {
        public IFormFile FileDetail { get; set; }
        public FileType FileType { get; set; }
        
    }
}

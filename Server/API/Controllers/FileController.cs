using Core.Models;
using Core.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class FileController : CustomBaseController
    {
        private readonly IFileService _fileService;
        public FileController(IFileService fileService)
        {
            _fileService = fileService;
        }

        [HttpPost]
        public async Task<IActionResult> UploadFile(IFormFile file, string fileId)
        {
            return ActionResultInstance(await _fileService.UploadFileAsync(file, fileId));

        }
    }
}

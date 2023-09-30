using Core.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.Core.Services;

namespace API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class MemberController : CustomBaseController
    {
        private readonly IUserService _userService;
        private readonly IDocumentService _documentService;
        private string ContentPath()
        {
            return Path.Combine(Directory.GetCurrentDirectory(), "Uploads");
        }

        public MemberController(IUserService userService, IDocumentService documentService)
        {
            _userService = userService;
            _documentService = documentService;
        }

        // Members
        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetAllActiveMembers()
        {
            return ActionResultInstance(await _userService.GetAllActiveMembers());
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetAllPassiveMembers()
        {
            return ActionResultInstance(await _userService.GetAllPassiveMembers());
        }

        [Authorize]
        [HttpDelete]
        public async Task<IActionResult> DeleteMember(string memberId)
        {
            return ActionResultInstance(await _userService.DeleteMemberAsync(memberId));
        }

        [Authorize]
        [HttpPut]
        public async Task<IActionResult> FreezeMember(string memberId)
        {
            return ActionResultInstance(await _userService.FreezeMember(memberId));
        }

        [Authorize]
        [HttpPut]
        public async Task<IActionResult> UnfreezeMember(string memberId)
        {
            return ActionResultInstance(await _userService.UnfreezeMember(memberId));
        }
    }
}

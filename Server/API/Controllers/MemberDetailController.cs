using Core.DTOs.MemberDetailDTOs;
using Core.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class MemberDetailController : CustomBaseController
    {
        private readonly IMemberDetailService _memberDetailService;
        public MemberDetailController(IMemberDetailService memberDetailService)
        {
            _memberDetailService = memberDetailService;
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateMemberDetailDto createMemberDetailDto)
        {
            return ActionResultInstance(await _memberDetailService.CreateMemberDetailAsync(createMemberDetailDto));
        }

        [HttpGet]
        public async Task<IActionResult> GetById(string memberId)
        {
            return ActionResultInstance(await _memberDetailService.GetMemberDetailAsync(memberId));
        }

        [HttpPost]
        public async Task<IActionResult> Update(UpdateMemberDetailDto updateMemberDetailDto)
        {
            return ActionResultInstance(await _memberDetailService.UpdateMemberDetailAsync(updateMemberDetailDto));
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(string memberDetailId)
        {
            return ActionResultInstance(await _memberDetailService.DeleteMemberDetailAsync(memberDetailId));
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteByMemberId(string memberId)
        {
            return ActionResultInstance(await _memberDetailService.DeleteByMemberIdAsync(memberId));
        }
    }
}

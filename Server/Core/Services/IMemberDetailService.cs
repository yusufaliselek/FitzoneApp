using Core.DTOs;
using Core.DTOs.MemberDetailDTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Services
{
    public interface IMemberDetailService
    {
        Task<CustomResponseDto<MemberDetailDto>> CreateMemberDetailAsync(CreateMemberDetailDto memberDetail);
        Task<CustomResponseDto<MemberDetailDto>> UpdateMemberDetailAsync(UpdateMemberDetailDto memberDetail);
        Task<CustomResponseDto<MemberDetailDto>> GetMemberDetailAsync(string memberId);
        Task<CustomResponseDto<MemberDetailDto>> DeleteMemberDetailAsync(string memberDetailId);
        Task<CustomResponseDto<MemberDetailDto>> DeleteByMemberIdAsync(string memberId);
    }
}

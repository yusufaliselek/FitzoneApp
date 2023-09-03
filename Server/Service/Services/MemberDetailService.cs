using AutoMapper;
using Core.DTOs;
using Core.DTOs.MemberDetailDTOs;
using Core.Models;
using Core.Services;
using Microsoft.EntityFrameworkCore;
using Server.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Services
{
    public class MemberDetailService : IMemberDetailService
    {
        private IMapper _mapper;
        private IGenericService<MemberDetail> _genericService;
        public MemberDetailService(IGenericService<MemberDetail> genericService, IMapper mapper)
        {
            _genericService = genericService;
            _mapper = mapper;
        }

        public async Task<CustomResponseDto<MemberDetailDto>> CreateMemberDetailAsync(CreateMemberDetailDto memberDetail)
        {
            var newMemberDetail = _mapper.Map<MemberDetail>(memberDetail);
            newMemberDetail.Id = Guid.NewGuid().ToString();
            var result = await _genericService.AddAsync(newMemberDetail);
            if (result == null)
            {
                return CustomResponseDto<MemberDetailDto>.Fail(400, "Could not create member detail!");
            }
            return CustomResponseDto<MemberDetailDto>.Success(200, _mapper.Map<MemberDetailDto>(newMemberDetail));
            
        }

        public async Task<CustomResponseDto<MemberDetailDto>> DeleteMemberDetailAsync(string memberDetailId)
        {
            var memberDetail = _genericService.Where(x => x.Id == memberDetailId).FirstOrDefault();
            if (memberDetail == null)
            {
                return CustomResponseDto<MemberDetailDto>.Fail(404, "Member detail not found!");
            }
            await _genericService.RemoveAsync(memberDetail);
            return CustomResponseDto<MemberDetailDto>.Success(200, _mapper.Map<MemberDetailDto>(memberDetail));
        }

        public async Task<CustomResponseDto<MemberDetailDto>> GetMemberDetailAsync(string memberId)
        {
            var memberDetail = await _genericService.Where(x => x.UserId == memberId).FirstOrDefaultAsync();
            if (memberDetail == null)
            {
                return CustomResponseDto<MemberDetailDto>.Fail(404, "Member detail not found!");
            }
            return CustomResponseDto<MemberDetailDto>.Success(200, _mapper.Map<MemberDetailDto>(memberDetail));
        }

        public async Task<CustomResponseDto<MemberDetailDto>> UpdateMemberDetailAsync(UpdateMemberDetailDto memberDetail)
        {
            var memberDetailInDb = await _genericService.Where(x => x.Id == memberDetail.Id).FirstOrDefaultAsync();
            if (memberDetailInDb == null)
            {
                return CustomResponseDto<MemberDetailDto>.Fail(404, "Member detail not found!");
            }
            var updatedMemberDetail = _mapper.Map<MemberDetail>(memberDetail);
            await _genericService.UpdateAsync(updatedMemberDetail);
            return CustomResponseDto<MemberDetailDto>.Success(200, _mapper.Map<MemberDetailDto>(updatedMemberDetail));
        }

        public async Task<CustomResponseDto<MemberDetailDto>> DeleteByMemberIdAsync(string memberId)
        {
            var memberDetail = await _genericService.Where(x => x.UserId == memberId).FirstOrDefaultAsync();
            if (memberDetail == null)
            {
                return CustomResponseDto<MemberDetailDto>.Fail(404, "Member detail not found!");
            }
            await _genericService.RemoveAsync(memberDetail);
            return CustomResponseDto<MemberDetailDto>.Success(200, _mapper.Map<MemberDetailDto>(memberDetail));
        }
    }
}

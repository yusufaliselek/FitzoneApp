import React from 'react';
import PhotoUpload from '../../components/PhotoUpload/PhotoUpload';
import { ITrainerUserProps } from '../../types/Types';
import { RiFileUserFill, RiPhoneFill, RiSave3Fill } from 'react-icons/ri';
import CustomInput from '../../components/CustomInput';
import { cities } from '../../assets/Cities';

interface ITrainerPersonalInfoProps {
  trainerProps: ITrainerUserProps;
  setUserProps: React.Dispatch<React.SetStateAction<ITrainerUserProps>>;
  firstName: string;
  email: string;
  phoneNumberVisibility: boolean;
  setPhoneNumberVisibility: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserPersonalInfos = (props: ITrainerPersonalInfoProps) => {
  return (
    <>
      <div className='flex flex-col items-center gap-y-4 my-5'>
        <PhotoUpload photo={props.trainerProps.personalPhoto} />
        <div className='flex gap-x-4'>
          <div className='flex gap-x-1 items-center'>
            <RiFileUserFill size={20} color='rgba(29,78,216, 0.8)' />
            <span>{!props.firstName ? props.email : props.trainerProps.firstName + " " + props.trainerProps.lastName}</span>
          </div>
          <div className='flex gap-x-1 items-center'>
            <RiPhoneFill size={20} color='rgba(29,78,216, 0.8)' />
            <input
              type='text'
              readOnly={!props.phoneNumberVisibility}
              value={props.trainerProps.phoneNumber ? props.trainerProps.phoneNumber : "05** *** ** **"}
              onChange={e => props.setUserProps({ ...props.trainerProps, phoneNumber: e.target.value })}
              onDoubleClick={(e: any) => { props.setPhoneNumberVisibility(!props.phoneNumberVisibility) }}
              style={{ backgroundColor: 'transparent', border: `${props.phoneNumberVisibility ? "1px solid lightgray" : "1px solid transparent"}`, outline: 'none', width: "130px" }}
            />
            <RiSave3Fill
              size={20}
              color='rgba(29,78,216, 0.8)'
              visibility={props.phoneNumberVisibility ? "visible" : "hidden"}
              style={{ cursor: 'pointer' }}
              onClick={() => {
                props.setPhoneNumberVisibility(false)
              }}
            />
          </div>
        </div>

      </div>
      <div className='grid grid-cols-2 md:w-[41.25rem] justify-center items-start gap-x-5 gap-y-2'>
        <CustomInput type='text' formType='text' label='Kullanıcı Adı' value={props.trainerProps.username} changeFunction={e => props.setUserProps({ ...props.trainerProps, username: e.target.value })} isDisabled />
        <CustomInput type='email' formType='email' label='Email' value={props.trainerProps.email} changeFunction={e => props.setUserProps({ ...props.trainerProps, email: e.target.value })} />
        <CustomInput type='text' formType='text' label='Adı' value={props.trainerProps.firstName} changeFunction={e => props.setUserProps({ ...props.trainerProps, firstName: e.target.value })} />
        <CustomInput type='text' formType='text' label='Soyadı' value={props.trainerProps.lastName} changeFunction={e => props.setUserProps({ ...props.trainerProps, lastName: e.target.value })} />
        <CustomInput type='text' formType='tckn' label='T.C Kimlik Numarası' value={props.trainerProps.tckn} changeFunction={e => props.setUserProps({ ...props.trainerProps, tckn: e.target.value })} />
        <CustomInput type='date' formType='profession' label='Doğum Tarihi' value={props.trainerProps.birthdayDate} changeFunction={e => { props.setUserProps({ ...props.trainerProps, birthdayDate: e.target.value }) }} />
        <div className="mb-2 w-full">
          <label
            form="location"
            className="block text-sm font-semibold text-gray-600"
          >
            Lokasyon
          </label>
          <select value={String(props.trainerProps.location)} className='block w-[20rem] px-2 py-2 mt-2 text-blue-700 bg-white border rounded-md 
                            focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40' onChange={(e: any) => props.setUserProps({ ...props.trainerProps, location: e.target.value })}>
            <option value={undefined} hidden> -- Şehir seçiniz -- </option>
            {cities.map((city, index) => {
              return <option key={index} value={city.plaka}>{city.il_adi}</option>
            })}
          </select>
        </div>
        <div className='mb-2 w-full'>
          <label
            form="gender"
            className="block text-sm font-semibold text-gray-600">Cinsiyet</label>

          <select value={String(props.trainerProps.gender)} className='block w-[20rem] px-2 py-2 mt-2 text-blue-700 bg-white border rounded-md 
                            focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40' onChange={(e: any) => props.setUserProps({ ...props.trainerProps, gender: e.target.value })}>
            <option value={undefined} hidden>-- Cinsiyet Seçiniz --</option>
            <option value={"male"}>Erkek</option>
            <option value={"female"}>Kız</option>
          </select>
        </div>
        <div className="mb-2 w-full col-span-2">
          <label
            form="biography"
            className="block text-sm font-semibold text-gray-600"
          >
            Biyografi
          </label>
          <textarea
            value={props.trainerProps.biography} onChange={e => props.setUserProps({ ...props.trainerProps, biography: e.target.value })}
            className="block w-full px-2 py-2 mt-2 text-blue-700 bg-white border rounded-md 
                            focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>
      </div>
    </>
  )
}

export default UserPersonalInfos
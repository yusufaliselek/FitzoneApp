import React from 'react'

const CustomInput = ({value, type, formType, changeFunction} : {value: any, type: string, formType: string, changeFunction: React.ChangeEventHandler<HTMLInputElement> | undefined}) => {
    return (
        <div className="mb-2 w-full">
            <label
                form={formType}
                className="block text-sm font-semibold text-gray-600"
            >
                Email
            </label>
            <input
                type={type}
                value={value} onChange={changeFunction}
                className="block w-[20rem] px-2 py-2 mt-2 text-blue-700 bg-white border rounded-md 
focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
        </div>
    )
}


export default CustomInput;
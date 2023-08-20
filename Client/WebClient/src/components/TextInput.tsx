import React from 'react'

const TextInput = ({
    label,
    placeholder = "",
    required = false,
    type = "text",
    id,
    disabled = false,
    value,
    onChange
}: {
    label: string;
    placeholder?: string;
    required?: boolean;
    type?: string;
    id: string;
    disabled?: boolean;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
    return (
        <div className='w-full text-[#1976d2]'>
            <label
                htmlFor={id}
                className="block mb-2 text-sm font-medium ">
                {label}
            </label>
            <input type={type} id={id}
                value={value} onChange={onChange}
                placeholder={placeholder} required={required} disabled={disabled}
                className="bg-gray-50 border focus:border-gray-500  text-sm rounded-lg block w-full p-2.5 outline-0" />
        </div>
    )
}

export default TextInput
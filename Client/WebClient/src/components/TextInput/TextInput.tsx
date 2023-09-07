import React from 'react'

const TextInput = ({
    label,
    placeholder = "",
    required = false,
    type = "text",
    id,
    disabled = false,
    value,
    onChange,
}: {
    label?: string;
    placeholder?: string;
    required?: boolean;
    type?: string;
    id?: string;
    disabled?: boolean;
    value: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
    return (
        <div className='w-full text-blue-700'>
            {
                label && <label
                    htmlFor={id}
                    className="block mb-1 text-sm font-medium pl-1">
                    {label}
                </label>
            }
            <input type={type} id={id}
                value={value} onChange={onChange}
                placeholder={placeholder} required={required} disabled={disabled}
                className="bg-gray-50 border focus:border-blue-500  text-sm rounded-lg  w-full p-2.5 outline-0  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" />
        </div>
    )
}

export default TextInput
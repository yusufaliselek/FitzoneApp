import React from 'react'

const SelectInput = ({
    label,
    required = false,
    id,
    disabled = false,
    value,
    onChange,
    options
}: {
    label?: string;
    required?: boolean;
    id?: string;
    disabled?: boolean;
    value: string;
    options: { value: string, text: string }[];
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
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
            <select id={id}
                value={value} onChange={onChange}
                required={required} disabled={disabled}
                className="bg-gray-50 border focus:border-blue-500  text-sm rounded-lg  w-full p-2.5 outline-0  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40">
                <option value='' disabled hidden>Seçiniz</option>
                {
                    options.map((option) => (
                        <option key={option.value} value={option.value}>{option.text}</option>
                    ))
                }
            </select>


        </div>
    )
}

export default SelectInput
import React from 'react'

const themeColorMap: Record<
    "primary" | "secondary" | "danger" | "success" | "warning" | "info" | "light" | "dark" | "link",
    string
> = {
    primary: "text-white bg-blue-500 hover:bg-blue-600 focus:ring-blue-500",
    secondary: "text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-500",
    danger: "text-white bg-red-500 hover:bg-red-600 focus:ring-red-500",
    success: "text-white bg-green-700 hover:bg-green-600 focus:ring-green-500",
    warning: "text-white bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-500",
    info: "text-white bg-indigo-500 hover:bg-indigo-600 focus:ring-indigo-500",
    light: "text-blue-600 bg-white hover:bg-gray-200 focus:ring-gray-500",
    dark: "text-white bg-gray-700 hover:bg-gray-800 focus:ring-gray-500",
    link: "text-blue-600 bg-transparent hover:bg-gray-200 focus:ring-gray-500",
};

const FButton = ({ text, onClick, theme = 'primary', icon, type = 'button', ...props }: {
    text: string, onClick?: React.MouseEventHandler<HTMLButtonElement>,
    theme?: "primary" | "secondary" | "danger" | "success" | "warning" | "info" | "light" | "dark" | "link",
    icon?: JSX.Element,
    type?: "button" | "submit" | "reset"
}) => {
    const themeColor = themeColorMap[theme] || themeColorMap.primary;
    return (
        <button onClick={onClick} {...props}
            type={type}
            className={`w-full h-full max-h-10 flex gap-2 justify-center px-2 py-1 items-center  rounded-md cursor-pointer  transition-all 
            focus:ring-2  focus:ring-opacity-50 ${themeColor} whitespace-nowrap`}
        >{icon}{text}</button>
    )
}

export default FButton
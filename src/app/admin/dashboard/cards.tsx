import React, { ReactNode } from 'react'
import { IconType } from 'react-icons';

interface IconProps {
    size?: number;
    color?: string;
}

interface DataProps {
    title: string,
    value: number,
    extraValue: number,
    icon: IconType,
    bg: string
}

const renderIcon = (IconComponent: React.ElementType<IconProps>, props?: IconProps) => {
    return <IconComponent {...props} />;
};

const DashboardCards = (
    data: DataProps
) => {
    return (
        <div className={`relative w-full flex flex-col p-6 rounded-lg ${data.bg}`}>
            <span className='text-white text-md font-semibold'>{data.title}</span>
            <span className='text-white text-lg font-bold mb-10'>{data.value}</span>
            <span className='text-white text-sm font-semibold'>{data.extraValue}</span>
            <div className='absolute top-6 right-6 text-white text-3xl' >
                {renderIcon(data.icon, { size: 32, color: 'white' })}
            </div>
        </div>
    )
}

export default DashboardCards
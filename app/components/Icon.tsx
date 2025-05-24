import FeatherIcon from 'feather-icons-react'
import React from 'react'

import type { FeatherIconName } from 'feather-icons-react';
import { motion } from 'framer-motion';

type IconProps = {
    icon: FeatherIconName
    size?: number
    onClick?: () => void
    className?: string
    hoverScale?: number
}

const MotionFeatherIcon = motion(FeatherIcon);

const Icon = ({
    icon,
    size = 16,
    onClick,
    className,
    hoverScale = 1.15 }: IconProps) => {
    return (
        <MotionFeatherIcon
            whileHover={{ scale: hoverScale }}
            icon={icon}
            size={size}
            onClick={onClick}
            className={`cursor-pointer ${className}`} />
    )
}

export default Icon
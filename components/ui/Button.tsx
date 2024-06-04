import React, { type PropsWithChildren } from 'react'

interface ButtonProps
    extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    fullWidth?: boolean
    variant?: 'default' | 'outlined' | 'text'
    size?: 'none' | 'small' | 'medium' | 'large'
    className?: string
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
    disabled?: boolean
}

export const Button = ({
    fullWidth = false,
    children,
    variant = 'default',
    size = 'medium',
    className = '',
    onClick,
    disabled,
    ...other
}: PropsWithChildren<ButtonProps>) => {
    const baseClasses = 'font-medium focus:outline-none transition ease-in duration-100 whitespace-nowrap'
    const variantClasses = {
        default: `bg-black text-white hover:bg-black/80 rounded-full `,
        outlined: `rounded-full border border-black hover:bg-black/5`,
        text: `rounded-full text-textPrimary hover:text-black/80`
    }
    const sizeClasses = {
        none: 'text-xs',
        small: 'text-xs px-3 py-1',
        medium: 'text-sm px-3 py-1.5',
        large: 'text-base px-5 py-2'
    }

    const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`

    return (
        <button type='button' className={buttonClasses} onClick={onClick} disabled={disabled} {...other}>
            {children}
        </button>
    )
}

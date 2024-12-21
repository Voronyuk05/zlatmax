import { ReactNode } from 'react'
import styles from './Buttons.module.scss'

export const PrimaryButton = ({children, className, ...props}: {children: ReactNode | string, className?: string, onClick?: () => void}) => {
    return (
        <button className={`${styles.primary_button} ${className}`} {...props}>
            {children}
        </button>
    )
}
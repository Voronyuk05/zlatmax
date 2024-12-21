import { ReactNode } from 'react'
import styles from './Buttons.module.scss'

export const SecondaryButton = ({children, className, ...props}: {children: ReactNode | string, className?: string, onClick?: () => void}) => {
    return (
        <button className={`${styles.secondary_button} ${className}`} {...props}>
            {children}
        </button>
    )
}
import { ReactNode } from 'react'
import styles from './Buttons.module.scss'

export const DarkButton = ({children, className, ...props}: {children: ReactNode | string, className?: string, onClick?: () => void}) => {
    return (
        <button className={`${styles.dark_button} ${className}`} {...props}>
            {children}
        </button>
    )
}
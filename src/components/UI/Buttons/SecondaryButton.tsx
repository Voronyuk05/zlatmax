import { ReactNode } from 'react'
import styles from './Buttons.module.scss'

export const SecondaryButton = ({children, ...props}: {children: ReactNode | string, onClick?: () => void}) => {
    return (
        <button className={styles.secondary_button} {...props}>
            {children}
        </button>
    )
}
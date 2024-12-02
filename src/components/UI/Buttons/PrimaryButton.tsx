import { ReactNode } from 'react'
import styles from './Buttons.module.scss'

export const PrimaryButton = ({children, ...props}: {children: ReactNode | string, onClick?: () => void}) => {
    return (
        <button className={styles.primary_button} {...props}>
            {children}
        </button>
    )
}
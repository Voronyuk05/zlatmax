import { ReactNode } from 'react'
import styles from './Buttons.module.scss'

export const DarkButton = ({children, ...props}: {children: ReactNode | string, onClick?: () => void}) => {
    return (
        <button className={styles.dark_button} {...props}>
            {children}
        </button>
    )
}
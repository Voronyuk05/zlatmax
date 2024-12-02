import { ReactElement } from 'react'
import styles from './Section.module.scss'

export const Section = ({children}: {children: ReactElement | string}) => {
    return (
        <section className={styles.styled_section}>
            <div className={styles.container}>
                {children}
            </div>
        </section>
    )
}
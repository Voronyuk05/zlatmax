import { ReactElement } from "react"
import styles from './Paragraph.module.scss'

export const Paragraph = ({children, color, weight, ...props}: {children: string | ReactElement | ReactElement[], color: string, weight: string, key?: number | string}) => {
    const fontWeight = `weight-${weight}` 
    return (
        <p className={`${color} ${fontWeight} ${styles.paragraph}`} {...props}>{children}</p>
    )
        
}
import { ReactElement } from "react"
import styles from './Headings.module.scss'

export const Headings = ({children, heading, color, weight, ...props}: {children: string | ReactElement | ReactElement[], heading: string, color: string, weight: string, onClick?: () => void}) => {
    const fontWeight = `weight-${weight}` 

    switch (heading) {
        case 'h1': return (
            <h1 className={`${color} ${fontWeight} ${styles.h1}`} {...props}>{children}</h1>
        )
        case 'h2': return (
            <h2 className={`${color} ${fontWeight} ${styles.h2}`} {...props}>{children}</h2>
        ) 
        case 'h3': return (
            <h3 className={`${color} ${fontWeight} ${styles.h3}`} {...props}>{children}</h3>
        )
        case 'h4': return (
            <h4 className={`${color} ${fontWeight} ${styles.h4}`} {...props}>{children}</h4>
        )
        case 'h5': return (
            <h5 className={`${color} ${fontWeight} ${styles.h5}`} {...props}>{children}</h5>
        )
        case 'h6': return (
            <h6 className={`${color} ${fontWeight} ${styles.h6}`} {...props}>{children}</h6>
        )
        case 'h6_small': return (
            <h6 className={`${color} ${fontWeight} ${styles.h6_small}`} {...props}>{children}</h6>
        )
    }
        
}
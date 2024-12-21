import { ReactElement } from 'react';
import styles from './Headings.module.scss'
import { IEventProps } from '@/types/events.types';

interface IHeadingsProps extends IEventProps {
    children: string | ReactElement | ReactElement[]
    className?: string
    heading: string
    color: string
    weight: string
}

export const Headings = ({children, heading, className, color, weight, ...props}: IHeadingsProps) => {
    const fontWeight = `weight-${weight}` 

    switch (heading) {
        case 'h1': return (
            <h1 className={`${color} ${fontWeight} ${styles.h1} ${className}`} {...props}>{children}</h1>
        )
        case 'h2': return (
            <h2 className={`${color} ${fontWeight} ${styles.h2} ${className}`} {...props}>{children}</h2>
        ) 
        case 'h3': return (
            <h3 className={`${color} ${fontWeight} ${styles.h3} ${className}`} {...props}>{children}</h3>
        )
        case 'h4': return (
            <h4 className={`${color} ${fontWeight} ${styles.h4} ${className}`} {...props}>{children}</h4>
        )
        case 'h5': return (
            <h5 className={`${color} ${fontWeight} ${styles.h5} ${className}`} {...props}>{children}</h5>
        )
        case 'h6': return (
            <h6 className={`${color} ${fontWeight} ${styles.h6} ${className}`} {...props}>{children}</h6>
        )
        case 'h6_small': return (
            <h6 className={`${color} ${fontWeight} ${styles.h6_small} ${className}`} {...props}>{children}</h6>
        )
    }
        
}
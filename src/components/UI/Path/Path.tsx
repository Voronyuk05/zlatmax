'use client'
import { MdKeyboardArrowRight } from "react-icons/md";
import { usePathname } from "next/navigation"
import Link from "next/link"
import styles from './Path.module.scss'

export const Path = () => {
    const pathname = usePathname()
    const parsedPath = pathname.replace(/%20/g, " ")
    const pathParts = parsedPath.split('/').filter(part => part);

    
    if (pathname !== '/home') {
        return (
            <div data-testid='path' className={styles.path}>
                <Link href='/home'>Home</Link>
                {pathParts.map((part, index) => {
                    const href = '/' + pathParts.slice(0, index + 1).join('/')
                    return (
                        <div key={index}>
                            <MdKeyboardArrowRight/>
                            <Link key={index} data-testid={part} href={href}>{part}</Link>
                        </div>
                    );
                })}
            </div>
        )
    }
}
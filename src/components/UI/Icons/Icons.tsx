import { RiScales3Line } from "react-icons/ri";
import { IoMdHeart } from "react-icons/io";
import { FaShoppingBasket } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import styles from './Icons.module.scss'

export const ComparisonIcon = ({onClick, className, ...props}: {onClick?: () => void, className?: string}) => {
    return (
        <RiScales3Line className={`${className} ${styles.icon}`} onClick={onClick} {...props}/>
    )
}

export const BasketIcon = ({onClick, className, ...props}: {onClick?: () => void, className?: string}) => {
    return (
        <FaShoppingBasket className={`${className} ${styles.icon}`} onClick={onClick} {...props}/>
    )
}

export const LikeIcon = ({onClick, className, ...props}: {onClick?: () => void, className?: string}) => {
    return (
        <IoMdHeart className={`${className} ${styles.icon}`} onClick={onClick} {...props}/>
    )
}

export const SearchIcon = ({onClick, className, ...props}: {onClick?: () => void, className?: string}) => {
    return (
        <CiSearch className={`${className} ${styles.icon}`} onClick={onClick} {...props}/>
    )
}

export const StarIcon = ({onClick, className, ...props}: {onClick?: () => void, className?: string}) => {
    return (
        <FaStar className={`${className} ${styles.icon}`} onClick={onClick} {...props}/>
    )
}
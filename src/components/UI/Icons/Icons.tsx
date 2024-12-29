import { RiScales3Line } from "react-icons/ri";
import { TbHeart } from "react-icons/tb";
import { TbBasket } from "react-icons/tb";
import { TbBasketCheck } from "react-icons/tb";
import { CiSearch } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { MdOutlineKeyboardArrowDown } from "react-icons/md"
import styles from './Icons.module.scss'

interface IIconProps {
    onClick?: () => void,
    className?: string
}

export const ComparisonIcon = ({onClick, className, ...props}: IIconProps) => {
    return (
        <RiScales3Line className={`${className} ${styles.icon}`} onClick={onClick} {...props}/>
    )
}

export const BasketIcon = ({onClick, className, ...props}: IIconProps) => {
    return (
        <TbBasket className={`${className} ${styles.icon}`} onClick={onClick} {...props}/>
    )
}

export const PlacedBasketIcon = ({onClick, className, ...props}: IIconProps) => {
    return (
        <TbBasketCheck className={`${className} ${styles.icon}`} onClick={onClick} {...props}/>
    )
}

export const LikeIcon = ({onClick, className, ...props}: IIconProps) => {
    return (
        <TbHeart className={`${className} ${styles.icon}`} onClick={onClick} {...props}/>
    )
}

export const SearchIcon = ({onClick, className, ...props}: IIconProps) => {
    return (
        <CiSearch className={`${className} ${styles.icon}`} onClick={onClick} {...props}/>
    )
}

export const StarIcon = ({onClick, className, ...props}: IIconProps) => {
    return (
        <FaStar className={`${className} ${styles.icon}`} onClick={onClick} {...props}/>
    )
}

export const ArrowDownIcon = ({onClick, className, ...props}: IIconProps) => {
    return (
        <MdOutlineKeyboardArrowDown className={`${className} ${styles.icon}`} onClick={onClick} {...props}/>
    )
}
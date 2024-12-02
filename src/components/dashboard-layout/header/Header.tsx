import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useAppSelector } from '@/lib/store';
import { selectBasketItems, selectBasketItemsSum } from '@/lib/features/selectors';
import { SelectEl } from '@/components/UI/Select/Select';
import { Nav } from '../../UI/Nav/Nav';
import { Logo } from '../../UI/Logo/Logo';
import { MenuNav } from '../../UI/MenuNav/MenuNav';
import { Headings } from '../../UI/Headings/Headings';
import { IoArrowBack } from "react-icons/io5";
import { LikeIcon, BasketIcon, SearchIcon } from '../../UI/Icons/Icons';
import Link from 'next/link';
import styles from './Header.module.scss'
import './selectorStyles.scss'

const telsData = [
    {
        label: "8-800-777-49-67",
        value: "8-800-777-49-67"
    },
    {
        label: "8-800-777-50-67",
        value: "8-800-777-50-67"
    },
    {
        label: "8-800-777-49-69",
        value: "8-800-777-49-69"
    },
]

export const Header = () => {
    const [telOptions, setTelOptions] = useState(telsData[0]) 
    const [isShowed, setIsShowed] = useState(false)
    const path = usePathname()
    const searchParams = useSearchParams()
    const basketItems= useAppSelector(selectBasketItems)
    const totalBasketSum = useAppSelector(selectBasketItemsSum)

    useEffect(() => {
        setIsShowed(false)
    }, [path, searchParams])


    const handleMenu = () => {
        setIsShowed(!isShowed)
    }

    return (
        <header className={styles.header}>
            <div className={styles.header_content}>
                <div className={styles.content_container}>
                    <Logo/>
                    <div className={`${isShowed ? styles.showed : ''} ${styles.backdrop}`}>
                        <IoArrowBack className={styles.close_arrow} onClick={handleMenu}/>
                        <div className={`${styles.menu}`}>
                            <div className={styles.wrapper_search_input}>
                                <SearchIcon/>
                                <input type="text" placeholder='Search' />
                            </div>
                            <div className={styles.interactions}>
                                <div className={styles.wrapper_phone_numbers}>
                                    <SelectEl className='react_tel_select_container' options={telsData} selectedOption={telOptions} setSelectedOption={setTelOptions} />
                                    <Link href={`/basket`}>Request a call</Link>
                                </div>
                                <div>
                                    <LikeIcon/>
                                </div>
                                <div className={styles.wrapper_basket}>
                                    <div className={styles.wrapper_basket_icon}>
                                        <BasketIcon/>
                                        <span className={styles.products_amount}>{basketItems ? Object.keys(basketItems).length : '0'}</span>
                                    </div>
                                    <div className={styles.wrapper_basket_info}>
                                        <Headings heading='h6_small' color='black' weight='500'>{`$ ${totalBasketSum}`}</Headings>
                                        <Link href={`/basket`}>Place an order</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <MenuNav />
                    </div>
                    <div className={`${styles.burger} ${isShowed ? styles.checked : ''}`} onClick={handleMenu}>
                        <span></span>
                    </div>
                </div>
            </div>
            <Nav />
        </header>
    )
}
import Link from 'next/link';
import styles from './Nav.module.scss'
import NavProductsTypesList from './NavProductTypesList/NavProductTypesList';

export const Nav = () => {
    return (
        <div className={styles.wrapper_nav}>
            <nav className={styles.nav}>
                <NavProductsTypesList/>
                <div className={styles.nav_item}>
                    <Link href='/producers'>Producers</Link>
                </div>
            </nav>
        </div>
    )
}
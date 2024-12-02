import Image from 'next/image'
import logoImg from '../../../../public/logo.svg'
import styles from './Logo.module.scss'

export const Logo = () => {
    return (
        <Image className={styles.logo} src={logoImg} alt='zlatmax zlatoust knives' width='200' height='42' />
    )
}
'use client'
import { useRouter } from 'next/navigation';
import { Headings } from '../Headings/Headings';
import styles from './NotFoundEl.module.scss'
import { PrimaryButton } from '../Buttons/PrimaryButton';

export default function NotFoundEl() {
    const {push} = useRouter()

    return (
        <div className={styles.not_found_container}>
            <div className={styles.text}>
                <Headings heading='h2' weight='700' color='black'>Page not found</Headings>
            </div>
            <PrimaryButton onClick={() => push('/home')}>
                Go Home
            </PrimaryButton>
        </div>
    )
}
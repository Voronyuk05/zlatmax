import { useRouter } from 'next/navigation';
import { Headings } from '../../UI/Headings/Headings';
import { PrimaryButton } from '../../UI/Buttons/PrimaryButton';
import styles from './ErrorLayout.module.scss'

export default function ErrorLayout({error}: {error: string}) {
    const {refresh} = useRouter()

    return (
        <div className={styles.error_layout}>
            <Headings heading='h2' color='black' weight='600'>{error}</Headings>
            <PrimaryButton onClick={refresh}>
                Refresh Page
            </PrimaryButton>
        </div>
    )
}
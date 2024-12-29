'use client'
import { PropsWithChildren } from 'react';
import { useGetTypesByAvailableCategories } from '@/hooks/typesHooks/useGetTypesByAvailableCategories';
import ErrorLayout from './ErrorLayout/ErrorLayout';
import LoadingCircle from '../UI/LoadingCircle/LoadingCircle';
import { Header } from './header/Header';
import { Footer } from './footer/Footer';
import styles from './DashboardLayout.module.scss';


export const DashboardLayout = ({children}: PropsWithChildren) => {
    const {typesByAvailableCategoriesData, error, isTypesByAvailableCategoriesLoading} = useGetTypesByAvailableCategories()
    
    if (isTypesByAvailableCategoriesLoading) return <LoadingCircle/>

    if (error) return <ErrorLayout error={error.message}/>
    else if (typesByAvailableCategoriesData && typesByAvailableCategoriesData.length === 0) return <ErrorLayout error='Failed to recieve data'/>
    

    return (
        <div className={styles.dashboard}>
            <Header/>
            <main>
                {children}
            </main>
            <Footer/>
        </div>
    )
}
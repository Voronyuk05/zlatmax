'use client'
import { PropsWithChildren } from 'react';
import { Header } from './header/Header';
import { Footer } from './footer/Footer';
import styles from './DashboardLayout.module.scss';

export const DashboardLayout = ({children}: PropsWithChildren) => {
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
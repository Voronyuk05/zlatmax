'use client'
import dynamic from 'next/dynamic'
import { IProductMark } from '@/types/apiTypes/productsMarks.type'
import styles from './ProductsList.module.scss'
const ProductMarkCard = dynamic(() => import('../ProductMarkCard/ProductMarkCard'), {ssr: false})

export const ProductsList = ({data}: {data: IProductMark[]}) => {
    return (
        <div className={styles.products_list}>
            {data.map((productMarkData) => (
                <ProductMarkCard 
                key={productMarkData.product_mark_id}
                productMarkData={productMarkData}/>
            ))}
        </div>
    )
}
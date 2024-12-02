import { IProduct } from '@/types/apiTypes/products.types'
import styles from './ProductsList.module.scss'
import { ProductCard } from '../ProductCard/ProductCard'

export const ProductsList = ({data}: {data: IProduct[]}) => {
    return (
        <div className={styles.products_list}>
            {data.map((data) => (
                <ProductCard 
                key={data.id}
                data={data} />
            ))}
        </div>
    )
}
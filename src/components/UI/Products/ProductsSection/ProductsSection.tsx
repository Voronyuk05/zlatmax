import { useGetProductsBySearchParams } from '@/hooks/productsHooks/useGetProductsBySearchParams'
import { useGetTypeById } from '@/hooks/typesHooks/useGetTypeById';
import { useGetCategoriesById } from '@/hooks/categoriesHooks/useGetCategoryById';
import { ISearchParametrs } from '@/types/searchParameters.types'
import { ProductsPaginatedItems } from '../ProductsPagination/ProductsPagination';
import { Headings } from '../../Headings/Headings';
import { MdKeyboardArrowRight } from "react-icons/md";
import { SortByFilter } from '../../SortByFilter/SortByFilter';
import { sortByFilterArray } from '../../SortByFilter/dataFilters';
import { ProductsFilters } from '../ProductsFilters/ProductsFilters';
import LoadingCircle from '../../LoadingCircle/LoadingCircle';
import Link from 'next/link';
import styles from './ProductsSection.module.scss'

export const ProductsSection = ({searchParams, productsTypeId}: {searchParams: ISearchParametrs, productsTypeId: number}) => {
    const categoryId = searchParams.category_id ? Number(searchParams.category_id) : 0
    const {data: productsData, isLoading} = useGetProductsBySearchParams(searchParams)
    const {data: typeData} = useGetTypeById(productsTypeId)
    const {data: categoryData} = useGetCategoriesById(categoryId)

    if (isLoading) <LoadingCircle/>

    if (productsData && typeData)
    return (
        <section className={styles.products_section}>
            <div className={styles.container}>
                <div className={styles.title}>
                    <Headings heading='h2' color='black' weight='600'>{typeData.type_name}</Headings>
                </div>
                <div className={styles.sub_title}>
                    <div className={styles.products_path}>
                        <Link href='/home'>Home</Link>
                        <MdKeyboardArrowRight/>
                        <Link href={`/products?type_id=${productsTypeId}`}>{typeData.type_name}</Link>
                        {categoryData && (
                            <>
                                <MdKeyboardArrowRight/>
                                <Link href={`/products?type_id=${searchParams.type_id}&category_id=${categoryId}`}>{categoryData.category_name}</Link>
                            </>
                        )}
                    </div>
                    <SortByFilter searchParamName="sortBy" filterParamLabel="Sort By" options={sortByFilterArray} />
                </div>
                <div className={styles.content}>
                    <ProductsFilters productsData={productsData} productsTypeId={productsTypeId} productsType={typeData}/>
                    <ProductsPaginatedItems itemsPerPage={12} data={productsData}/>
                </div>
            </div>
        </section>
    )
}
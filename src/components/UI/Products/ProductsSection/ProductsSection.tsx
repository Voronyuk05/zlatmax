import { useRouter } from 'next/navigation';
import { useGetProductsMarksBySearchParams } from '@/hooks/productsMarksHooks/useGetProductsMarksBySearchParams';
import { useGetTypeById } from '@/hooks/typesHooks/useGetTypeById';
import { useGetCategoriesById } from '@/hooks/categoriesHooks/useGetCategoryById';
import { ISearchParametrs } from '@/types/searchParameters.types'
import { ProductsPaginatedItems } from '../ProductsPagination/ProductsPagination';
import { Headings } from '../../Headings/Headings';
import { MdKeyboardArrowRight } from "react-icons/md";
import { SortByFilter } from '../../SortByFilter/SortByFilter';
import { sortByFilterArray } from '../../SortByFilter/dataFilters';
import { ProductsFilters } from '../ProductsFilters/ProductsFilters';
import { PrimaryButton } from '../../Buttons/PrimaryButton';
import LoadingCircle from '../../LoadingCircle/LoadingCircle';
import Link from 'next/link';
import styles from './ProductsSection.module.scss'

export const ProductsSection = ({searchParams, productsTypeId}: {searchParams: ISearchParametrs, productsTypeId: number}) => {
    const {push} = useRouter()
    const categoryId = searchParams.category_id ? Number(searchParams.category_id) : 0
    const {data: productsMarksData, isLoading} = useGetProductsMarksBySearchParams(searchParams)
    const {data: typeData} = useGetTypeById(productsTypeId)
    const {data: categoryData} = useGetCategoriesById(categoryId)

    if (isLoading) <LoadingCircle/>

    if (productsMarksData && typeData)
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
                    {productsMarksData.length ? <SortByFilter searchParamName="sortBy" filterParamLabel="Sort By" options={sortByFilterArray} /> : null}
                </div>
                {productsMarksData.length ? (<div className={styles.content}>
                    <ProductsFilters searchParams={searchParams}/>
                    <ProductsPaginatedItems itemsPerPage={12} data={productsMarksData} />
                </div>): (<div className={styles.not_found_products}>
                        <Headings heading='h2' color='black' weight='900'>Oops... No products found</Headings>
                        <PrimaryButton onClick={() => push('/products')}>Go Back</PrimaryButton>
                </div>)}
            </div>
        </section>
    )
}
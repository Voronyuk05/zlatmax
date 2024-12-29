import { useRouter } from 'next/navigation';
import { useGetProductsMarksBySearchParams } from '@/hooks/productsMarksHooks/useGetProductsMarksBySearchParams';
import { useGetTypeById } from '@/hooks/typesHooks/useGetTypeById';
import { useGetCategoriesById } from '@/hooks/categoriesHooks/useGetCategoryById';
import { ProductsPaginatedItems } from '@/components/UI/Products/ProductsPagination/ProductsPagination';
import { Headings } from '@/components/UI/Headings/Headings';
import { MdKeyboardArrowRight } from "react-icons/md";
import { SortByFilter } from '@/components/UI/SortByFilter/SortByFilter';
import { sortByFilterArray } from '@/components/UI/SortByFilter/dataFilters';
import { ProductsFilters } from '@/components/UI/Products/ProductsFilters/ProductsFilters';
import { PrimaryButton } from '@/components/UI/Buttons/PrimaryButton';
import LoadingCircle from '@/components/UI/LoadingCircle/LoadingCircle';
import { ISearchParametrs } from '@/types/searchParameters.types'
import Link from 'next/link';
import styles from './ProductsSection.module.scss'

export const ProductsSection = ({searchParams, productsTypeId}: {searchParams: ISearchParametrs, productsTypeId: number}) => {
    const {push} = useRouter()
    const categoryId = searchParams.category_id ? Number(searchParams.category_id) : 0
    const {productsMarksBySearchParamsData, isProductsMarksBySearchParamsLoading} = useGetProductsMarksBySearchParams(searchParams)
    const {typeByIdData} = useGetTypeById(productsTypeId)
    const {categoriesByIdData} = useGetCategoriesById(categoryId)

    if (isProductsMarksBySearchParamsLoading) <LoadingCircle/>

    if (!productsMarksBySearchParamsData || !typeByIdData) {
        return (
            <div className={styles.not_found_products}>
                <Headings heading='h2' color='black' weight='900'>Oops... No products found</Headings>
                <PrimaryButton onClick={() => push('/home')}>Go Home</PrimaryButton>
            </div>
        )
    }
    return (
        <section className={styles.products_section}>
            <div className={styles.container}>
                <div className={styles.title}>
                    <Headings heading='h2' color='black' weight='600'>{typeByIdData.type_name}</Headings>
                </div>
                <div className={styles.sub_title}>
                    <div className={styles.products_path}>
                        <Link href='/home'>Home</Link>
                        <MdKeyboardArrowRight/>
                        <Link href={`/products?type_id=${productsTypeId}`}>{typeByIdData.type_name}</Link>
                        {categoriesByIdData && (
                            <>
                                <MdKeyboardArrowRight/>
                                <Link href={`/products?type_id=${searchParams.type_id}&category_id=${categoryId}`}>{categoriesByIdData.category_name}</Link>
                            </>
                        )}
                    </div>
                    {productsMarksBySearchParamsData.length ? <SortByFilter searchParamName="sortBy" filterParamLabel="Sort By" options={sortByFilterArray} /> : null}
                </div>
                <div className={styles.content}>
                    <ProductsFilters searchParams={searchParams}/>
                    <ProductsPaginatedItems itemsPerPage={12} data={productsMarksBySearchParamsData} />
                </div>
            </div>
        </section>
    ) 
}
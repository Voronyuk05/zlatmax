'use client'
import { PropsWithChildren } from "react"
import { useGetProductById } from "@/hooks/productsHooks/useGetProductById";
import { useGetProductsMarksBySearchParams } from '@/hooks/productsMarksHooks/useGetProductsMarksBySearchParams';
import { ProductArticle } from "./ProductArticle/ProductArticle";
import LoadingCircle from "@/components/UI/LoadingCircle/LoadingCircle";
import { IProductLayoutProps } from "@/types/layout.type";

export default function ProductArticleLayout({children, params, searchParams}: PropsWithChildren & IProductLayoutProps) {
    const {productByIdData, isProductByIdLoading} = useGetProductById(Number(params.productId))
    const {productsMarksBySearchParamsData} = useGetProductsMarksBySearchParams(searchParams)


    if (isProductByIdLoading) <LoadingCircle/>

    if (productByIdData && productsMarksBySearchParamsData?.length)
    return (
        <>
            <ProductArticle productData={productByIdData} productMarkData={productsMarksBySearchParamsData[0]} searchParams={searchParams}/>
            {children}
        </>
    )
}
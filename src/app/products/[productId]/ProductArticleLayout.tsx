'use client'
import { PropsWithChildren, useEffect, useState } from "react"
import { useGetProductById } from "@/hooks/productsHooks/useGetProductById";
import { useGetProductsMarksBySearchParams } from '@/hooks/productsMarksHooks/useGetProductsMarksBySearchParams';
import { useParams, useSearchParams } from "next/navigation";
import { ProductArticle } from "@/components/UI/Products/ProductArticle/ProductArticle";
import LoadingCircle from "@/components/UI/LoadingCircle/LoadingCircle";
import { ISearchParametrs } from "@/types/searchParameters.types";

export default function ProductArticleLayout({children}: PropsWithChildren) {
    const searchParams = useSearchParams()
    const [searchParamsObj, setSearchParamsObj] = useState<ISearchParametrs>({})
    const {productId} = useParams<{productId: string}>()
    const {data: productData, isLoading} = useGetProductById(Number(productId))
    const {data: productMarkData} = useGetProductsMarksBySearchParams(searchParamsObj)
    
    useEffect(() => {
        const paramsObj: ISearchParametrs = {}
        searchParams.forEach((value, key) => {
          paramsObj[key] = value;
        });
        paramsObj.product_id = String(productId)
        
        setSearchParamsObj(paramsObj);
    }, [searchParams, productId])


    if (isLoading) <LoadingCircle/>

    if (productData && productMarkData?.length)
    return (
        <>
            <ProductArticle productData={productData} productMarkData={productMarkData[0]} searchParams={searchParamsObj}/>
            {children}
        </>
    )
}
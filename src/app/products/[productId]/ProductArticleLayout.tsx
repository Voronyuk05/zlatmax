'use client'
import { PropsWithChildren, useEffect, useState } from "react"
import { useGetProductById } from "@/hooks/productsHooks/useGetProductById";
import { useParams, useSearchParams } from "next/navigation";
import { ProductArticle } from "@/components/UI/Products/ProductArticle/ProductArticle";
import LoadingCircle from "@/components/UI/LoadingCircle/LoadingCircle";
import { ISearchParametrs } from "@/types/searchParameters.types";

export default function ProductArticleLayout({children}: PropsWithChildren) {
    const searchParams = useSearchParams()
    const [searchParamsObj, setSearchParamsObj] = useState<ISearchParametrs>({})
    const {productId} = useParams<{productId: string}>()
    const {data: productData, isLoading} = useGetProductById(Number(productId))

    useEffect(() => {
        const paramsObj: ISearchParametrs = {}
        searchParams.forEach((value, key) => {
          paramsObj[key] = value;
        });
        
        setSearchParamsObj(paramsObj);
    }, [searchParams])


    if (isLoading) <LoadingCircle/>

    if (productData)
    return (
        <>
            <ProductArticle productData={productData} searchParamsObj={searchParamsObj}/>
            {children}
        </>
    )
}
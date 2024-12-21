'use client'
import { ProductsSection } from "@/components/UI/Products/ProductsSection/ProductsSection";
import { ISearchParametrs } from "@/types/searchParameters.types";
import { useSearchParams } from "next/navigation";
import { PropsWithChildren, useEffect, useState } from "react";

export default function ProductsLayout({children}: PropsWithChildren) {
    const searchParams = useSearchParams()
    const [searchParamsObj, setSearchParamsObj] = useState<ISearchParametrs>({})
    const currentTypeId = searchParamsObj.type_id ? Number(searchParamsObj.type_id) : 0

    useEffect(() => {
        const paramsObj: ISearchParametrs = {}
        searchParams.forEach((value, key) => {
          paramsObj[key] = value;
        });
        
        setSearchParamsObj(paramsObj);
    }, [searchParams])
    
    return (
        <>
            <ProductsSection searchParams={searchParamsObj} productsTypeId={currentTypeId}/>
            {children}
        </>
    )
}
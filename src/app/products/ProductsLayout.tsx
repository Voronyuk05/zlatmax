'use client'
import { PropsWithChildren, Suspense } from "react";
import LoadingCircle from "@/components/UI/LoadingCircle/LoadingCircle";
import { ProductsSection } from "./ProductsSection/ProductsSection";
import { LayoutProps } from "@/types/layout.type";

export default function ProductsLayout({children, searchParams}: PropsWithChildren & LayoutProps) {
    const currentTypeId = searchParams.type_id ? Number(searchParams.type_id) : 0
    
    return (
        <>
            <Suspense fallback={<LoadingCircle/>}>
                <ProductsSection searchParams={searchParams} productsTypeId={currentTypeId} />
            </Suspense>
            {children}
        </>
    )
}
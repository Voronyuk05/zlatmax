import { PageProps } from "@/types/page.types"
import ProductsLayout from "./ProductsLayout"


export default async function ProductsPage({searchParams}: PageProps) {
    const pageSearchParams = await searchParams

    return (
        <>
            <ProductsLayout searchParams={pageSearchParams}/>
        </>
    )
}
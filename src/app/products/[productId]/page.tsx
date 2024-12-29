import productsServices from "@/services/apiServices/products.service"
import ProductArticleLayout  from "./ProductArticleLayout"
import type { Metadata } from 'next'
import { IProductPageProps } from "@/types/page.types"
 
export async function genereteStaticParams() {
    const products = await productsServices.getAllProducts()

    products.map(({product_id}) => ({
        productId: product_id
    }))
}

export async function generateMetadata({ params }: IProductPageProps): Promise<Metadata> {
    const {productId} = (await params)
          
    const productData = await productsServices.getProductById(productId)
    const productName = `${productData[0].name[0].toUpperCase()}${productData[0].name.slice(1)}`
    return {
        title: {
            default: productName,
            template: productName
        },
    }
}


export default async function ProductArticlePage({ params, searchParams }: IProductPageProps) {
    const articleParams = await params
    const articleSearchParams = {...(await searchParams), product_id: articleParams.productId}

    return (
        <>
            <ProductArticleLayout searchParams={articleSearchParams} params={articleParams}/>
        </>
    )
}
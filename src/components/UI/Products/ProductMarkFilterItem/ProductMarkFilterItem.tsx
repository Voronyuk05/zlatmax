import { useGetProductsMarksByChosenAttributes } from "@/hooks/productsMarksHooks/useGetProductsMarksByChosenAttributes";
import { ISearchParametrs } from "@/types/searchParameters.types";
import LoadingCircle from "../../LoadingCircle/LoadingCircle";
import { IProductMark } from "@/types/apiTypes/productsMarks.type";
import { ProductSpecialFiltersItem } from "../ProductMarkSpecialFiltersItem/ProductMarkSpecialFiltersItem";

export const ProductMarkFilterItem = ({filterName, searchParams}: {filterName: keyof IProductMark, searchParams: ISearchParametrs}) => {
    const {data, isLoading} = useGetProductsMarksByChosenAttributes(filterName, searchParams)
    
    if (isLoading) <LoadingCircle/>

    const filteredProducts = data ? data.sort((a,b) => {
        const AProductAttributeValue = Number(a[filterName])
        const BProductAttributeValue = Number(b[filterName])

        return BProductAttributeValue - AProductAttributeValue
    }) : []
    const attrubuteWithFilterMin = filteredProducts[filteredProducts.length - 1]

    const attributeMax = filteredProducts[0] && filteredProducts[0].attributes ? filteredProducts[0][filterName] : undefined
    const attributeMin = attrubuteWithFilterMin && attrubuteWithFilterMin.attributes ? attrubuteWithFilterMin[filterName] : undefined
    

    if (typeof attributeMax === 'number' && typeof attributeMin === 'number' && attributeMin !== attributeMax) {
        return <ProductSpecialFiltersItem filterName={filterName} productAttributeMax={attributeMax} productAttributeMin={attributeMin} />
    }
}
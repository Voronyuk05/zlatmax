import { useGetProductsMarksByChosenAttributes } from "@/hooks/productsMarksHooks/useGetProductsMarksByChosenAttributes"
import { IAttribute } from "@/types/apiTypes/attributes.types"
import { ProductSpecialFiltersItem } from "../Products/ProductsFilters/ProductMarkSpecialFiltersItem/ProductMarkSpecialFiltersItem"
import LoadingCircle from "../LoadingCircle/LoadingCircle"
import { ISearchParametrs } from "@/types/searchParameters.types"

export const AttributeValueFilter = ({attribute_name, searchParams}: IAttribute & {searchParams: ISearchParametrs}) => {
    const {productsMarksByChosenAttributesData, isProductsMarksByChosenAttributesLoading} = useGetProductsMarksByChosenAttributes(attribute_name, searchParams)
    
    if (isProductsMarksByChosenAttributesLoading) <LoadingCircle/>

    const filteredProducts = productsMarksByChosenAttributesData ? productsMarksByChosenAttributesData.sort((a,b) => {
        const AProductAttributeValue = a.attributes ? Number(a.attributes[attribute_name]) : 0
        const BProductAttributeValue = b.attributes ? Number(b.attributes[attribute_name]) : 0

        return BProductAttributeValue - AProductAttributeValue
    }) : []
    const attrubuteWithAttributeMin = filteredProducts[filteredProducts.length - 1]

    const attributeMax = filteredProducts[0] && filteredProducts[0].attributes ? filteredProducts[0].attributes[attribute_name] : undefined
    const attributeMin = attrubuteWithAttributeMin && attrubuteWithAttributeMin.attributes ? attrubuteWithAttributeMin.attributes[attribute_name] : undefined
    

    if (typeof attributeMax === 'number' && typeof attributeMin === 'number' && attributeMin !== attributeMax) {
        return <ProductSpecialFiltersItem filterName={attribute_name} productAttributeMax={attributeMax} productAttributeMin={attributeMin} />
    }
}
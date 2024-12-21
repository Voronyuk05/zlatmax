import filteredAttributesServices from "@/services/clientServices/filteredAttributes.service";
import { ISearchParametrs } from "@/types/searchParameters.types";
import { useQuery } from "@tanstack/react-query";

export const useGetAttributesByAvailableProductsMarks = (searchParams: ISearchParametrs) => {
    const {data: attributesByAvailableProductsMarksData, isLoading: isAttributesByAvailableProductsMarksLoading} = useQuery({
        queryKey: ['available attributes', searchParams],
        queryFn: () => filteredAttributesServices.getAttributesByAvailableProductsMarks(searchParams),
    })

    return {attributesByAvailableProductsMarksData, isAttributesByAvailableProductsMarksLoading}
}
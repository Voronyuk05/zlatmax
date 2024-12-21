import { useQuery } from "@tanstack/react-query";
import productsMarksServices from "@/services/apiServices/productsMarks.service";
import { ISearchParametrs } from "@/types/searchParameters.types";

export const useGetProductsMarksByChosenAttributes = (attributeExcludeName: string, searchParams: ISearchParametrs) => {
    const {data, isLoading} = useQuery({
        queryKey: ['products marks by choosen attributes', searchParams, attributeExcludeName],
        queryFn: () => productsMarksServices.getProductsMarksByChosenAttributes(attributeExcludeName, searchParams)
    })
    

    return {data, isLoading}
}
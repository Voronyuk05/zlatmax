import { useQuery } from "@tanstack/react-query";
import productsMarksServices from "@/services/apiServices/productsMarks.service";
import { ISearchParametrs } from "@/types/searchParameters.types";

export const useGetProductsMarksBySearchParams = (searchParams: ISearchParametrs) => {
    const {data, isLoading} = useQuery({
        queryKey: ['products marks by search params', searchParams],
        queryFn: () => productsMarksServices.getProductsMarksBySearchParams(searchParams)
    })

    return {data, isLoading}
}
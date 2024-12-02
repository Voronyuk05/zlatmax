import productsServices from "@/services/products.service";
import { ISearchParametrs } from "@/types/searchParameters.types";
import { useQuery } from "@tanstack/react-query";

export const useGetProductsBySearchParams = (searchParams: ISearchParametrs) => {
    const {data, isLoading} = useQuery({
        queryKey: ['searched products', searchParams],
        queryFn: async () => await productsServices.getProductsBySearchParams(searchParams),
        select(data) {
            return data
        }
    })
    

    return {data, isLoading}
}
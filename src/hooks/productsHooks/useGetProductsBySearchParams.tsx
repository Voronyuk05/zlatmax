import productsServices from "@/services/apiServices/products.service";
import { ISearchParametrs } from "@/types/searchParameters.types";
import { useQuery } from "@tanstack/react-query";

export const useGetProductsBySearchParams = (searchParams: ISearchParametrs) => {
    const {data, isLoading} = useQuery({
        queryKey: ['products by search params', searchParams],
        queryFn: async () => await productsServices.getProductsBySearchParams(searchParams),
        select(data) {
            return data
        }
    })
    

    return {data, isLoading}
}
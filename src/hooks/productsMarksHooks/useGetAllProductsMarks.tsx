import productsMarksServices from "@/services/apiServices/productsMarks.service";
import { useQuery } from "@tanstack/react-query";

export const useGetAllProductsMarks = () => {
    const {data, isLoading} = useQuery({
        queryKey: ['all products marks'],
        queryFn: () => productsMarksServices.getAllProductsMarks()
    })

    return {data, isLoading}
}
import productsMarksServices from "@/services/apiServices/productsMarks.service";
import { useQuery } from "@tanstack/react-query";

export const useGetProductMarkById =  (id: number | string) => {
    const {data, isLoading} = useQuery({
        queryKey: ['product mark by id'],
        queryFn: () => productsMarksServices.getProductMarksByProductId(id),
        select: (data) => data[0]
    })

    return {data, isLoading}
}
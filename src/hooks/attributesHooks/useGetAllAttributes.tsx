import attributesServices from "@/services/attributes.service";
import { useQuery } from "@tanstack/react-query";

export const useGetAllAttributes = () => {
    const {data, isLoading} = useQuery({
        queryKey: ['all attributes'],
        queryFn: () => attributesServices.getAllAttributes()
    })

    return {data, isLoading}
}
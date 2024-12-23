import typesServices from "@/services/apiServices/types.service";
import { useQuery } from "@tanstack/react-query";

export const useGetAllTypes = () => {
    const {data, isLoading} = useQuery({
        queryKey: ['all types'],
        queryFn: () => typesServices.getAllTypes()
    })

    return {data, isLoading}
}
import typesServices from "@/services/apiServices/types.service";
import { useQuery } from "@tanstack/react-query";

export const useGetTypeByName = (name: string) => {
    const {data, isLoading} = useQuery({
        queryKey: ['type by name', name],
        queryFn: () => typesServices.getTypeByName(name),
        select: data => data[0]
    })

    return {data, isLoading}
}
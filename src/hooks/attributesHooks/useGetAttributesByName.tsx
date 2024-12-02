import attributesServices from "@/services/attributes.service";
import { useQuery } from "@tanstack/react-query";

export const useGetAttributesByName = (name: string) => {
    const {data, isLoading} = useQuery({
        queryKey: ['attributes by name', name],
        queryFn: () => attributesServices.getAttributesByName(name),
        select: data => data[0]
    })

    return {data, isLoading}
}
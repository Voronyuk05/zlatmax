import { ISearchParametrs } from "./searchParameters.types"

export type PageProps = {
    searchParams: Promise<ISearchParametrs>
}

export interface IProductPageProps extends PageProps {
    params: Promise<{productId: string}>
}

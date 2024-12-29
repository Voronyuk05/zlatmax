import { ISearchParametrs } from "./searchParameters.types";

export type LayoutProps = {
    searchParams: ISearchParametrs
}

export interface IProductLayoutProps extends LayoutProps {
    params: {productId: string}
}
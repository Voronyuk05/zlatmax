import { ISelectOptions } from "@/types/select.types"

export const sortByFilterArray: ISelectOptions[] = [
    {
        label: "Sort By",
        value: ""
    },
    {
        label: "A-z",
        value: "asc"
    },
    {
        label: "Z-a",
        value: "desc"
    },
    {
        label: "Best",
        value: "best"
    },
    {
        label: "Worst",
        value: "worst"
    },
    {
        label: "From expensive to cheap",
        value: "expensive"
    },
    {
        label: "From cheap to expensive",
        value: "cheap"
    },
    {
        label: "Newest",
        value: "newest"
    },
    {
        label: "Latest",
        value: "latest"
    },
]

export const sortByDefaultValue: ISelectOptions = {
    label: "Sort By",
    value: ""
}

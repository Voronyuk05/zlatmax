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
]

export const sortByDefaultValue: ISelectOptions = {
    label: "Sort By",
    value: ""
}

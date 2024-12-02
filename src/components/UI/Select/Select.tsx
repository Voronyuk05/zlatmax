import { ISelectOptions } from "@/types/select.types";
import { ActionMeta, SingleValue, MultiValue } from "react-select";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Select from 'react-select'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SelectEl = ({options, selectedOption, setSelectedOption, className}: {options: ISelectOptions[], setSelectedOption: any | Dispatch<SetStateAction<ISelectOptions>> | Dispatch<SetStateAction<ISelectOptions[]>> | ((newValue: MultiValue<ISelectOptions> | SingleValue<ISelectOptions> | SetStateAction<ISelectOptions> | SetStateAction<ISelectOptions[]>, actionMeta: ActionMeta<ISelectOptions>) => void) | undefined, selectedOption: ISelectOptions, className?: string}) => {
    const id = Date.now().toString();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => setIsMounted(true), []);
    
    return isMounted ? (
        <Select
        id={id}
        className={`${className ? className : 'react-select-container'}`}
        classNamePrefix="react-select"
        value={selectedOption}
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}/>
    ) : null
}
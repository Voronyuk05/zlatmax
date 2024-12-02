import { ChangeEventHandler } from 'react'
import styles from './CheckboxInput.module.scss'

export const CheckboxInput = ({value, checked, handleChange}: {value: string | number, checked: boolean, handleChange: ChangeEventHandler<HTMLInputElement>}) => {
    return (
        <label className={styles.custom_big_checkbox}>
            <input value={value} checked={checked} type="checkbox" onChange={handleChange} className={styles.align_self_center} />
            <span className={styles.custom_big_checkbox__checkbox}></span>
        </label>
    )
}
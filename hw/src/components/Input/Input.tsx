import React from 'react'
import inputStyle from './Input.module.scss'

type InputProps = {
    value: string;
    placeholder: string;
    onChange: (e:React.ChangeEvent<HTMLInputElement>) => void
}

const Input: React.FC<InputProps> = ({value, placeholder, onChange}) => {
    return <input className={inputStyle.input_line} value = {value} type="text" placeholder={placeholder} onChange={onChange}></input>
}

export default React.memo(Input)
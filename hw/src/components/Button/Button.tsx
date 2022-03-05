import buttonStyle from './Button.module.scss'
import { Meta } from '@utils/meta'

type ButtonProps = {
    children: React.ReactNode;
    onClick: (e: string) => void;
    disabled?: Meta;
    value: string;
}

const Button: React.FC<ButtonProps> = ({children, onClick, disabled, value}) => {
    const  _onClick = (e: any) => onClick(value);
    return <button className={buttonStyle.search_button} disabled = {disabled === Meta.loading} onClick = {_onClick}>{children}</button>
}

export default Button
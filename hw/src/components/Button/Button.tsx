import ButtonStyle from './Button.module.scss'
import { Meta } from '@utils/meta'

type ButtonProps = {
    children: React.ReactNode;
    onClick: (e: React.MouseEvent) => void;
    disabled?: Meta
}

const Button: React.FC<ButtonProps> = ({children, onClick, disabled}) => {
    return <button className={ButtonStyle.search_button} disabled = {disabled === Meta.loading} onClick = {onClick}>{children}</button>
}

export default Button
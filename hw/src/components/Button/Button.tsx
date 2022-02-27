import ButtonStyle from './Button.module.scss'

type ButtonProps = {
    children: React.ReactNode;
    onClick: (e: React.MouseEvent) => void;
    disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({children, onClick, disabled}) => {
    return <button className={ButtonStyle.search_button} disabled = {disabled} onClick = {onClick}>{children}</button>
}

export default Button
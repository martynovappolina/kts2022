import './Button.scss'

type ButtonProps = {
    children: React.ReactNode;
    onClick: (e: React.MouseEvent) => void;
    disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({children, onClick, disabled}) => {
    return <button className="search-button" disabled = {disabled} onClick = {onClick}>{children}</button>
}

export default Button
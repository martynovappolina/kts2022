import './Button.css'

type ButtonProps = {
    children: React.ReactNode;
    onClick: (e: React.MouseEvent) => void;
    disabled?: any
}

const Button: React.FC<ButtonProps> = ({children, onClick, disabled}) => {
    return <button className='SearchButton' onClick = {!disabled ? onClick : () => console.log('not clicked')}>{children}</button>
}

export default Button
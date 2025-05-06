import styles  from './Button.module.css'


function Button({ text }) {
    return (
        <div>
            <button>{text}</button>
        </div>
    )
}

export default Button
import styles from "./Button.module.scss";

interface ButtonProps {
    text: string;
    onClick: () => void;
}

const Button = ({ text, onClick }: ButtonProps) => {
    return (
        <button
            onClick={onClick}
            className={styles.glow__button}
        >
            {text}
        </button>
    );
};

export default Button;

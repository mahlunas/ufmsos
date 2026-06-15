import type {ComponentType, MouseEventHandler} from "react";

type ButtonProps = {
    text: string;
    icon?: ComponentType;
    onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function Button({text, icon:Icon, onClick}: ButtonProps){
    return (
        <button onClick={onClick}>
            {Icon && <Icon/>}
            <span>{text}</span>
        </button>
    )
}

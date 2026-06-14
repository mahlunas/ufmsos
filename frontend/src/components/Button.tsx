import {Icon} from "lucide-react";

export default function Button({text, icon:Icon, onClick}){
    return (
        <button onClick={onClick}>
            {Icon && <Icon/>}
            <span>{text}</span>
        </button>
    )
}
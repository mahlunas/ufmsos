import type {ButtonHTMLAttributes, ReactNode} from "react";
import type {LucideIcon} from "lucide-react";
import "./Button.css";

type ButtonVariant = "primary" | "secondary" | "danger" | "success";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    children?: ReactNode;
    text?: string;
    icon?: LucideIcon;
    variant?: ButtonVariant;
};

export default function Button({
    children,
    text,
    icon: Icon,
    variant = "secondary",
    className = "",
    type = "button",
    ...props
}: ButtonProps){
    return (
        <button className={`app-button app-button-${variant} ${className}`.trim()} type={type} {...props}>
            {Icon && <Icon size={18} aria-hidden="true"/>}
            <span>{children ?? text}</span>
        </button>
    )
}

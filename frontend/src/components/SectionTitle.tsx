import type {ReactNode} from "react";
import type {LucideIcon} from "lucide-react";
import "./SectionTitle.css";

type SectionTitleProps = {
    icon?: LucideIcon;
    title: string;
    subtitle?: ReactNode;
};

export default function SectionTitle({icon: Icon, title, subtitle}: SectionTitleProps) {
    return (
        <div className="section-title">
            {Icon && <Icon size={21} aria-hidden="true"/>}
            <div>
                <h2>{title}</h2>
                {subtitle && <p>{subtitle}</p>}
            </div>
        </div>
    );
}

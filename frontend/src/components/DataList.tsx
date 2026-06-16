import type {ReactNode} from "react";
import type {LucideIcon} from "lucide-react";
import "./DataList.css";

type DataListItem = {
    id: string | number;
    title: ReactNode;
    detail?: ReactNode;
    meta?: ReactNode;
    icon?: LucideIcon;
    tone?: "blue" | "green" | "red" | "yellow" | "purple" | "neutral";
};

type DataListProps = {
    items: DataListItem[];
    className?: string;
};

export default function DataList({items, className = ""}: DataListProps) {
    return (
        <div className={`data-list ${className}`.trim()}>
            {items.map(({id, title, detail, meta, icon: Icon, tone = "blue"}) => (
                <article className="data-list-item" key={id}>
                    {Icon && (
                        <span className={`data-list-icon tone-${tone}`}>
                            <Icon size={18} aria-hidden="true"/>
                        </span>
                    )}

                    <div className="data-list-content">
                        <h3>{title}</h3>
                        {detail && <p>{detail}</p>}
                    </div>

                    {meta && <strong className="data-list-meta">{meta}</strong>}
                </article>
            ))}
        </div>
    );
}

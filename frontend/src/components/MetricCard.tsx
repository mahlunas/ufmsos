import type {ReactNode} from "react";
import type {LucideIcon} from "lucide-react";
import "./MetricCard.css";

type MetricCardProps = {
    icon: LucideIcon;
    label: string;
    value: ReactNode;
    detail?: ReactNode;
    tone?: "blue" | "green" | "red" | "yellow" | "purple";
};

export default function MetricCard({icon: Icon, label, value, detail, tone = "blue"}: MetricCardProps) {
    return (
        <article className={`metric-card tone-${tone}`}>
            <span className="metric-card-icon">
                <Icon size={20} aria-hidden="true"/>
            </span>
            <div>
                <p>{label}</p>
                <strong>{value}</strong>
            </div>
            {detail && <span>{detail}</span>}
        </article>
    );
}

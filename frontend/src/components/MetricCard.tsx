import type {ReactNode} from "react";
import type {LucideIcon} from "lucide-react";
import "./MetricCard.css";

type MetricCardProps = {
    icon: LucideIcon;
    label: string;
    value: ReactNode;
    detail?: ReactNode;
};

export default function MetricCard({icon: Icon, label, value, detail}: MetricCardProps) {
    return (
        <article className="metric-card">
            <Icon size={22} aria-hidden="true"/>
            <p>{label}</p>
            <strong>{value}</strong>
            {detail && <span>{detail}</span>}
        </article>
    );
}

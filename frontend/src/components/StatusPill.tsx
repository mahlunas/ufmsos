import type {ReactNode} from "react";
import "./StatusPill.css";

type StatusPillProps = {
    children: ReactNode;
    tone?: "blue" | "green" | "red" | "yellow" | "purple" | "neutral";
};

export default function StatusPill({children, tone = "blue"}: StatusPillProps) {
    return <span className={`status-pill tone-${tone}`}>{children}</span>;
}

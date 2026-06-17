import type {ReactNode} from "react";
import "./AppPanel.css";

type AppPanelProps = {
    children: ReactNode;
    className?: string;
};

export default function AppPanel({children, className = ""}: AppPanelProps) {
    return (
        <section className={`app-panel ${className}`.trim()}>
            {children}
        </section>
    );
}

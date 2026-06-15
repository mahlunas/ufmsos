import type {ReactNode} from "react";
import "./PageHeader.css";

type PageHeaderProps = {
    eyebrow: string;
    title: string;
    actions?: ReactNode;
};

export default function PageHeader({eyebrow, title, actions}: PageHeaderProps) {
    return (
        <header className="page-header">
            <div>
                <p>{eyebrow}</p>
                <h1>{title}</h1>
            </div>

            {actions && <div className="page-header-actions">{actions}</div>}
        </header>
    );
}

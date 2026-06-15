import {Link} from "react-router-dom";
import {BriefcaseBusiness, GraduationCap, HeartPulse, Home, Landmark, Send, User} from "lucide-react";
import "./Sidebar.css";

const links = [
    {to: "/home", label: "Home", icon: Home},
    {to: "/estudos", label: "Estudos", icon: GraduationCap},
    {to: "/financas", label: "Finanças", icon: Landmark},
    {to: "/estagio", label: "Estágio", icon: BriefcaseBusiness},
    {to: "/candidaturas", label: "Candidaturas", icon: Send},
    {to: "/saude", label: "Saúde", icon: HeartPulse},
    {to: "/user", label: "User", icon: User},
];

export default function Sidebar(){
    return(
        <div className="sidebar">
            <div className="sidebar-brand">
                <strong>UFMSOS</strong>
            </div>

            <nav className="sidebar-nav" aria-label="Navegação principal">
                {links.map(({to, label, icon: Icon}) => (
                    <Link to={to} key={to} className="sidebar-link">
                        <Icon size={18} aria-hidden="true"/>
                        <span>{label}</span>
                    </Link>
                ))}
            </nav>
        </div>
    )
}

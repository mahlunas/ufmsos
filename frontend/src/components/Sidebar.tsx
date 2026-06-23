import {NavLink} from "react-router-dom";
import {BriefcaseBusiness, GraduationCap, HeartPulse, Home, Landmark, User} from "lucide-react";
import "./Sidebar.css";

const links = [
    {to: "/home", label: "Home", icon: Home},
    {to: "/estudos", label: "Estudos", icon: GraduationCap},
    {to: "/financas", label: "Finanças", icon: Landmark},
    {to: "/estagio", label: "Estágio", icon: BriefcaseBusiness},
    {to: "/saude", label: "Saúde", icon: HeartPulse},
    {to: "/user", label: "Perfil", icon: User},
];

export default function Sidebar(){
    return(
        <div className="sidebar">
            <div className="sidebar-brand">
                <img className="sidebar-logo" src="/favicon.ico" alt="" aria-hidden="true" />
                <strong>UFMS.O.S</strong>
            </div>

            <nav className="sidebar-nav" aria-label="Navegação principal">
                {links.map(({to, label, icon: Icon}) => (
                    <NavLink to={to} key={to} className={({isActive}) => `sidebar-link ${isActive ? "is-active" : ""}`}>
                        <Icon size={18} aria-hidden="true"/>
                        <span>{label}</span>
                    </NavLink>
                ))}
            </nav>

        </div>
    )
}

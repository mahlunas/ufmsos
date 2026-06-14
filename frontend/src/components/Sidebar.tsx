import {Icon} from "lucide-react";
import {Link} from "react-router-dom";

export default function Sidebar(){
    return(
        <div>
            <nav>
                <div><Link to="/home">Home</Link></div>
                <div><Link to="/estudos">Estudos</Link></div>
                <div><Link to="/financas">Finanças</Link></div>
                <div><Link to="/estagio">Estágio</Link></div>
                <div><Link to="/candidaturas">Candidaturas</Link></div>
                <div><Link to="/saude">Saúde</Link></div>
                <div><Link to="/user">User</Link></div>
            </nav>
        </div>
    )
}
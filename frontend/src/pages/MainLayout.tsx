import Sidebar from "../components/Sidebar.tsx";
import {Outlet} from "react-router-dom";
import "../styles/MainLayout.css";

export default function MainLayout(){
    return (
        <div className="app-layout">
            <aside className="app-sidebar" aria-label="Navegação UFMS.O.S">
                <Sidebar/>
            </aside>

            <main className="app-main">
                <Outlet/>
            </main>
        </div>
    )
}

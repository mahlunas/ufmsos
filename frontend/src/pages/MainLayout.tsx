import Sidebar from "../components/Sidebar.tsx";
import {Outlet} from "react-router-dom";

export default function MainLayout(){
    return (
        <div>
            <aside><Sidebar/></aside>
            
            <main>
                <Outlet/>
            </main>
        </div>
    )
}
import {BrowserRouter, Navigate, Outlet, Routes, Route} from "react-router-dom"
import Home from "../pages/Home.tsx";
import Login from "../pages/Login.tsx";
import User from "../pages/User.tsx";
import Estagio from "../pages/Estagio.tsx";
import Saude from "../pages/Saude.tsx";
import Candidaturas from "../pages/Candidaturas.tsx";
import Financas from "../pages/Financas.tsx";
import Estudos from "../pages/Estudos.tsx";
import MainLayout from "../pages/MainLayout.tsx";
import {LOGIN_BYPASS_ENABLED} from "../auth.ts";

function ProtectedRoute() {
    const token = localStorage.getItem("ufmsos.token");

    if (!LOGIN_BYPASS_ENABLED && !token) {
        return <Navigate to="/" replace/>;
    }

    return <Outlet/>;
}

export default function AppRoutes(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />}/>

                <Route element={<ProtectedRoute/>}>
                    <Route element={<MainLayout/>}>
                        <Route path="/home" element={<Home />}/>
                        <Route path="/user" element={<User/>}/>
                        <Route path="/estagio" element={<Estagio/>}/>
                        <Route path="/saude" element={<Saude/>}/>
                        <Route path="/candidaturas" element={<Candidaturas/>}/>
                        <Route path="/financas" element={<Financas/>}/>
                        <Route path="/estudos" element={<Estudos/>}/>
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

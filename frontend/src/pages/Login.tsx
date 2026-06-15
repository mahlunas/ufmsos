import {useEffect, useState} from "react";
import type {FormEvent} from "react";
import {useNavigate} from "react-router-dom";
import {LOCAL_BYPASS_TOKEN, LOGIN_BYPASS_ENABLED} from "../auth.ts";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8080";

export default function Login(){
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");
    const [carregando, setCarregando] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("ufmsos.token")) {
            navigate("/home");
        }
    }, [navigate]);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setErro("");

        if (LOGIN_BYPASS_ENABLED) {
            localStorage.setItem("ufmsos.token", LOCAL_BYPASS_TOKEN);
            navigate("/home");
            return;
        }

        if (!email.trim() || !senha.trim()) {
            setErro("Informe e-mail e senha.");
            return;
        }

        setCarregando(true);

        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    senha,
                }),
            });

            if (response.status === 401) {
                setErro("E-mail ou senha inválidos.");
                return;
            }

            if (!response.ok) {
                setErro("Não foi possível realizar o login.");
                return;
            }

            const data = await response.json() as { token?: string };

            if (!data.token) {
                setErro("Resposta de login sem token.");
                return;
            }

            localStorage.setItem("ufmsos.token", data.token);
            navigate("/home");
        } catch {
            setErro("Erro ao conectar com o serviço de autenticação.");
        } finally {
            setCarregando(false);
        }
    }

    return(
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">E-mail</label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    autoComplete="email"
                />

                <label htmlFor="password">Senha</label>
                <input
                    id="password"
                    type="password"
                    value={senha}
                    onChange={(event) => setSenha(event.target.value)}
                    autoComplete="current-password"
                />

                {erro && <p>{erro}</p>}

                <button type="submit" disabled={carregando}>
                    {carregando ? "Entrando..." : "Entrar"}
                </button>
            </form>
            <p>Não possui uma conta?</p>
            <button type="button">Cadastrar-se</button>
        </div>
    )
}

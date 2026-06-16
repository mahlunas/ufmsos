import {useEffect, useState} from "react";
import type {FormEvent} from "react";
import {useNavigate} from "react-router-dom";
import {ArrowRight, LockKeyhole, ShieldCheck} from "lucide-react";
import Button from "../components/Button.tsx";
import "../styles/Login.css";

const API_URL = import.meta.env.VITE_API_URL ?? "";

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
        <main className="login-page">
            <section className="login-card" aria-labelledby="login-title">
                <div className="login-brand">
                    <span>U</span>
                    <strong>UFMS.O.S</strong>
                </div>

                <div className="login-copy">
                    <ShieldCheck size={24} aria-hidden="true"/>
                    <p>Acesso seguro</p>
                    <h1 id="login-title">Entrar no painel</h1>
                </div>

                <form className="login-form" onSubmit={handleSubmit}>
                    <label htmlFor="email">E-mail</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        autoComplete="email"
                        placeholder="teste@ufms.br"
                    />

                    <label htmlFor="password">Senha</label>
                    <input
                        id="password"
                        type="password"
                        value={senha}
                        onChange={(event) => setSenha(event.target.value)}
                        autoComplete="current-password"
                        placeholder="Sua senha"
                    />

                    {erro && <p className="login-error">{erro}</p>}

                    <Button icon={carregando ? LockKeyhole : ArrowRight} type="submit" variant="primary" disabled={carregando}>
                        {carregando ? "Entrando..." : "Entrar"}
                    </Button>
                </form>
            </section>
        </main>
    )
}

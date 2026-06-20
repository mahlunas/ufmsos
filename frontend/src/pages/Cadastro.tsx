import {useEffect, useState} from "react";
import type {FormEvent} from "react";
import {Link, useNavigate} from "react-router-dom";
import {ArrowLeft, LockKeyhole, UserPlus} from "lucide-react";
import Button from "../components/Button.tsx";
import {apiRequest} from "../lib/api.ts";
import "../styles/Login.css";

export default function Cadastro(){
    const navigate = useNavigate();
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [erro, setErro] = useState("");
    const [carregando, setCarregando] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("ufmsos.token")) {
            navigate("/home");
        }
    }, [navigate]);

    async function autenticarAposCadastro() {
        const response = await apiRequest("/auth/login", {
            method: "POST",
            json: {
                email,
                senha,
            },
        });

        if (!response.ok) {
            return false;
        }

        const data = await response.json() as { token?: string };

        if (!data.token) {
            return false;
        }

        localStorage.setItem("ufmsos.token", data.token);
        return true;
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setErro("");

        const nomeFormatado = nome.trim();
        const emailFormatado = email.trim();

        if (!nomeFormatado || !emailFormatado || !senha.trim() || !confirmarSenha.trim()) {
            setErro("Preencha todos os campos.");
            return;
        }

        if (senha !== confirmarSenha) {
            setErro("As senhas não conferem.");
            return;
        }

        setCarregando(true);

        try {
            const response = await apiRequest("/auth/registro", {
                method: "POST",
                json: {
                    nome: nomeFormatado,
                    email: emailFormatado,
                    senha,
                },
            });

            if (response.status === 500) {
                const data = await response.json().catch(() => null) as { erro?: string } | null;
                setErro(data?.erro ?? "Não foi possível criar a conta.");
                return;
            }

            if (!response.ok) {
                setErro("Não foi possível criar a conta.");
                return;
            }

            const autenticou = await autenticarAposCadastro();

            if (!autenticou) {
                navigate("/", {
                    replace: true,
                    state: {
                        mensagem: "Conta criada. Entre com seu e-mail e senha.",
                    },
                });
                return;
            }

            navigate("/home");
        } catch {
            setErro("Erro ao conectar com o serviço de autenticação.");
        } finally {
            setCarregando(false);
        }
    }

    return(
        <main className="login-page">
            <section className="login-card" aria-labelledby="cadastro-title">
                <div className="login-brand">
                    <img className="login-brand-logo" src="/favicon.ico" alt="" aria-hidden="true" />
                    <strong>UFMS.O.S</strong>
                </div>

                <div className="login-copy">
                    <h1 id="cadastro-title">Criar conta</h1>
                </div>

                <form className="login-form" onSubmit={handleSubmit}>
                    <label htmlFor="nome">Nome</label>
                    <input
                        id="nome"
                        type="text"
                        value={nome}
                        onChange={(event) => setNome(event.target.value)}
                        autoComplete="name"
                        placeholder="Seu nome"
                    />

                    <label htmlFor="email">E-mail</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        autoComplete="email"
                        placeholder="exemplo@ufmsos.br"
                    />

                    <label htmlFor="password">Senha</label>
                    <input
                        id="password"
                        type="password"
                        value={senha}
                        onChange={(event) => setSenha(event.target.value)}
                        autoComplete="new-password"
                        placeholder="********"
                    />

                    <label htmlFor="confirm-password">Confirmar senha</label>
                    <input
                        id="confirm-password"
                        type="password"
                        value={confirmarSenha}
                        onChange={(event) => setConfirmarSenha(event.target.value)}
                        autoComplete="new-password"
                        placeholder="********"
                    />

                    {erro && <p className="login-error">{erro}</p>}

                    <Button icon={carregando ? LockKeyhole : UserPlus} type="submit" variant="primary" disabled={carregando}>
                        {carregando ? "Criando..." : "Criar conta"}
                    </Button>
                </form>

                <Link className="login-secondary-action" to="/">
                    <ArrowLeft size={17} aria-hidden="true"/>
                    <span>Já tenho conta</span>
                </Link>
            </section>
        </main>
    )
}

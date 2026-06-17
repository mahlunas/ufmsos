import {useEffect, useState} from "react";
import {LogOut, ShieldCheck, UserRound} from "lucide-react";
import Button from "../components/Button.tsx";
import PageHeader from "../components/PageHeader.tsx";
import {getCurrentUsuarioEmail, getCurrentUsuarioId, getCurrentUsuarioNome, normalizarTextoExibicao} from "../lib/auth.ts";
import "../styles/User.css";

type EstudanteApi = {
    id: string;
    email: string;
    nomeCompleto: string;
    matricula?: string | null;
    cursoId?: string | null;
    semestreAtual?: number | null;
};

export default function User(){
    const estudanteId = getCurrentUsuarioId();
    const emailUsuario = getCurrentUsuarioEmail();
    const nomeUsuario = normalizarTextoExibicao(getCurrentUsuarioNome());
    const [estudante] = useState<EstudanteApi | null>(estudanteId ? {
        id: estudanteId,
        email: emailUsuario ?? "Sem e-mail",
        nomeCompleto: nomeUsuario ?? "Sem nome cadastrado",
        matricula: null,
        cursoId: null,
        semestreAtual: null,
    } : null);

    useEffect(() => {
        document.title = "Perfil do estudante";
    }, []);

    function sair() {
        localStorage.removeItem("ufmsos.token");
        window.location.href = "/";
    }

    return (
        <section className="user-page">
            <div className="user-shell">
                <PageHeader
                    eyebrow="Conta"
                    title="Perfil do estudante"
                />
            </div>

            <div className="user-content">
                <section className="user-card user-profile-card">
                    <div className="user-avatar" aria-hidden="true">
                        <UserRound size={30}/>
                    </div>

                    <div>
                        <h2>{estudante?.nomeCompleto ?? "Sem dados"}</h2>
                        <p>{estudante?.email ?? "Sem e-mail"}</p>
                        <span>{estudante?.matricula ?? "Matrícula não informada"}</span>
                    </div>
                </section>

                <section className="user-card">
                    <div className="user-section-title">
                        <ShieldCheck size={20} aria-hidden="true"/>
                        <h2>Dados acadêmicos</h2>
                    </div>

                    <div className="user-security-grid">
                        <div>
                            <ShieldCheck size={18} aria-hidden="true"/>
                            <span>{estudante?.cursoId ?? "Curso não disponível no backend atual"}</span>
                        </div>
                        <div>
                            <ShieldCheck size={18} aria-hidden="true"/>
                            <span>{estudante?.semestreAtual ? `${estudante.semestreAtual}º semestre` : "Sem semestre informado"}</span>
                        </div>
                    </div>

                    <Button className="user-logout-button" icon={LogOut} variant="danger" onClick={sair}>
                        Sair da conta
                    </Button>
                </section>
            </div>
        </section>
    );
}

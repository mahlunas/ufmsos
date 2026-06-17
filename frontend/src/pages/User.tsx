import {useEffect, useState} from "react";
import {LogOut, ShieldCheck, UserRound} from "lucide-react";
import Button from "../components/Button.tsx";
import PageHeader from "../components/PageHeader.tsx";
import {apiRequest} from "../lib/api.ts";
import {getCurrentUsuarioId} from "../lib/auth.ts";
import "../styles/User.css";

type EstudanteApi = {
    id: string;
    nomeCompleto: string;
    matricula: string;
    email: string;
    cursoId?: string | null;
    semestreAtual?: number | null;
};

export default function User(){
    const estudanteId = getCurrentUsuarioId();
    const [estudante, setEstudante] = useState<EstudanteApi | null>(null);
    const [erro, setErro] = useState("");

    useEffect(() => {
        async function carregar() {
            if (!estudanteId) {
                setErro("Usuário autenticado sem identificador de estudante.");
                return;
            }

            try {
                const response = await apiRequest(`/estudantes/${estudanteId}`);

                if (!response.ok) {
                    throw new Error("Falha ao carregar estudante.");
                }

                setEstudante(await response.json() as EstudanteApi);
            } catch {
                setErro("Não foi possível carregar o perfil do estudante.");
            }
        }

        carregar();
    }, [estudanteId]);

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

            {erro && <p className="saude-message">{erro}</p>}

            <div className="user-content">
                <section className="user-card user-profile-card">
                    <div className="user-avatar" aria-hidden="true">
                        <UserRound size={30}/>
                    </div>

                    <div>
                        <h2>{estudante?.nomeCompleto ?? "Sem dados"}</h2>
                        <p>{estudante?.email ?? "Sem e-mail"}</p>
                        <span>{estudante?.matricula ?? "Sem matrícula"}</span>
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
                            <span>{estudante?.cursoId ?? "Curso não identificado"}</span>
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

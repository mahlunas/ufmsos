import {useState} from "react";
import {Bell, LogOut, Mail, Save, ShieldCheck, UserRound} from "lucide-react";
import "./User.css";

type PerfilUsuario = {
    nome: string;
    email: string;
    curso: string;
    semestre: string;
};

type Preferencias = {
    entregas: boolean;
    provas: boolean;
    financas: boolean;
    saude: boolean;
};

const perfilInicial: PerfilUsuario = {
    nome: "Maria Oliveira",
    email: "maria.oliveira@ufms.br",
    curso: "Ciência da Computação",
    semestre: "5º semestre",
};

const preferenciasIniciais: Preferencias = {
    entregas: true,
    provas: true,
    financas: false,
    saude: true,
};

export default function User(){
    const [perfil, setPerfil] = useState(perfilInicial);
    const [preferencias, setPreferencias] = useState(preferenciasIniciais);
    const [mensagem, setMensagem] = useState("");

    function atualizarPerfil(campo: keyof PerfilUsuario, valor: string) {
        setPerfil((atual) => ({...atual, [campo]: valor}));
    }

    function alternarPreferencia(campo: keyof Preferencias) {
        setPreferencias((atual) => ({...atual, [campo]: !atual[campo]}));
    }

    function salvarConfiguracoes() {
        setMensagem("Configurações salvas localmente.");
    }

    function sair() {
        localStorage.removeItem("ufmsos.token");
        window.location.href = "/";
    }

    return (
        <section className="user-page">
            <header className="user-header">
                <div>
                    <p>Conta</p>
                    <h1>Configurações de usuário</h1>
                </div>

                <button className="user-save-button" type="button" onClick={salvarConfiguracoes}>
                    <Save size={18} aria-hidden="true"/>
                    <span>Salvar</span>
                </button>
            </header>

            {mensagem && <p className="user-message">{mensagem}</p>}

            <div className="user-content">
                <section className="user-card user-profile-card">
                    <div className="user-avatar" aria-hidden="true">
                        <UserRound size={30}/>
                    </div>

                    <div>
                        <h2>{perfil.nome}</h2>
                        <p>{perfil.email}</p>
                        <span>{perfil.curso}</span>
                    </div>
                </section>

                <section className="user-card">
                    <div className="user-section-title">
                        <UserRound size={20} aria-hidden="true"/>
                        <h2>Perfil</h2>
                    </div>

                    <div className="user-form-grid">
                        <label>
                            Nome
                            <input value={perfil.nome} onChange={(event) => atualizarPerfil("nome", event.target.value)}/>
                        </label>

                        <label>
                            E-mail
                            <input type="email" value={perfil.email} onChange={(event) => atualizarPerfil("email", event.target.value)}/>
                        </label>

                        <label>
                            Curso
                            <input value={perfil.curso} onChange={(event) => atualizarPerfil("curso", event.target.value)}/>
                        </label>

                        <label>
                            Semestre
                            <input value={perfil.semestre} onChange={(event) => atualizarPerfil("semestre", event.target.value)}/>
                        </label>
                    </div>
                </section>

                <section className="user-card">
                    <div className="user-section-title">
                        <Bell size={20} aria-hidden="true"/>
                        <h2>Notificações</h2>
                    </div>

                    <div className="user-settings-list">
                        <label className="user-toggle-row">
                            <div>
                                <strong>Entregas de trabalhos</strong>
                                <p>Avisos sobre prazos próximos e trabalhos atrasados.</p>
                            </div>
                            <input type="checkbox" checked={preferencias.entregas} onChange={() => alternarPreferencia("entregas")}/>
                        </label>

                        <label className="user-toggle-row">
                            <div>
                                <strong>Provas</strong>
                                <p>Lembretes de avaliações e revisões cadastradas.</p>
                            </div>
                            <input type="checkbox" checked={preferencias.provas} onChange={() => alternarPreferencia("provas")}/>
                        </label>

                        <label className="user-toggle-row">
                            <div>
                                <strong>Finanças</strong>
                                <p>Alertas de vencimentos, auxílios e gastos planejados.</p>
                            </div>
                            <input type="checkbox" checked={preferencias.financas} onChange={() => alternarPreferencia("financas")}/>
                        </label>

                        <label className="user-toggle-row">
                            <div>
                                <strong>Saúde</strong>
                                <p>Lembretes de consultas, medicamentos e hábitos.</p>
                            </div>
                            <input type="checkbox" checked={preferencias.saude} onChange={() => alternarPreferencia("saude")}/>
                        </label>
                    </div>
                </section>

                <section className="user-card">
                    <div className="user-section-title">
                        <ShieldCheck size={20} aria-hidden="true"/>
                        <h2>Segurança</h2>
                    </div>

                    <div className="user-security-grid">
                        <div>
                            <Mail size={18} aria-hidden="true"/>
                            <span>E-mail verificado</span>
                        </div>
                        <div>
                            <ShieldCheck size={18} aria-hidden="true"/>
                            <span>Login local liberado</span>
                        </div>
                    </div>

                    <button className="user-logout-button" type="button" onClick={sair}>
                        <LogOut size={18} aria-hidden="true"/>
                        <span>Sair da conta</span>
                    </button>
                </section>
            </div>
        </section>
    )
}

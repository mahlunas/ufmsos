import {AlertTriangle, BriefcaseBusiness, CalendarClock, HeartPulse, Landmark, Send, WalletCards} from "lucide-react";
import "./Home.css";

const proximasEntregas = [
    {titulo: "Lista 4 - Recursão", disciplina: "Algoritmos e Programação", data: "2026-06-16"},
    {titulo: "Modelo lógico", disciplina: "Banco de Dados", data: "2026-06-21"},
    {titulo: "Prova SQL", disciplina: "Banco de Dados", data: "2026-07-02"},
];

const movimentacoesFinanceiras = [
    {descricao: "Bolsa Permanência", tipo: "receita", valor: 700, data: "2026-06-05"},
    {descricao: "Aluguel", tipo: "despesa", valor: 520, data: "2026-06-07"},
    {descricao: "Mercado", tipo: "despesa", valor: 186.45, data: "2026-06-10"},
];

const registrosHumor = [
    {emoji: "🙂", humor: "Bom", data: "2026-06-15", observacao: "Dia produtivo, mas com cansaço."},
    {emoji: "😔", humor: "Ruim", data: "2026-06-14", observacao: "Ansiedade antes da prova."},
    {emoji: "😐", humor: "Neutro", data: "2026-06-13", observacao: "Rotina normal."},
];

const alertas = [
    "Trabalho vence amanhã",
    "Saldo baixo",
    "Semana de provas",
    "Excesso de carga horária de estágio",
];

function formatarMoeda(valor: number) {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(valor);
}

function formatarData(data: string) {
    return new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "short",
    }).format(new Date(`${data}T12:00:00`));
}

export default function Home(){
    return (
        <section className="home-page">
            <header className="home-header">
                <div>
                    <p>Painel inicial</p>
                    <h1>Bem-vindo ao UFMSOS</h1>
                </div>
            </header>

            <div className="home-cards">
                <article className="home-card">
                    <CalendarClock size={22} aria-hidden="true"/>
                    <p>Próxima atividade a vencer</p>
                    <strong>Lista 4 - Recursão</strong>
                    <span>Amanhã</span>
                </article>

                <article className="home-card">
                    <WalletCards size={22} aria-hidden="true"/>
                    <p>Saldo financeiro atual</p>
                    <strong>{formatarMoeda(-96.35)}</strong>
                    <span>Receitas menos despesas</span>
                </article>

                <article className="home-card">
                    <HeartPulse size={22} aria-hidden="true"/>
                    <p>Humor da semana</p>
                    <strong>3.4 / 5</strong>
                    <span>Média dos últimos registros</span>
                </article>

                <article className="home-card">
                    <BriefcaseBusiness size={22} aria-hidden="true"/>
                    <p>Estágio ativo</p>
                    <strong>Tech Campo Grande</strong>
                    <span>30h/semana</span>
                </article>

                <article className="home-card">
                    <Send size={22} aria-hidden="true"/>
                    <p>Candidaturas abertas</p>
                    <strong>4</strong>
                    <span>Em andamento</span>
                </article>
            </div>

            <section className="home-alerts">
                <div className="home-section-title">
                    <AlertTriangle size={21} aria-hidden="true"/>
                    <h2>Alertas</h2>
                </div>

                <div className="home-alert-list">
                    {alertas.map((alerta) => (
                        <article key={alerta}>
                            <AlertTriangle size={18} aria-hidden="true"/>
                            <span>{alerta}</span>
                        </article>
                    ))}
                </div>
            </section>

            <div className="home-summary-grid">
                <section className="home-panel">
                    <div className="home-section-title">
                        <Landmark size={21} aria-hidden="true"/>
                        <h2>Últimas movimentações financeiras</h2>
                    </div>

                    <div className="home-list">
                        {movimentacoesFinanceiras.map((movimentacao) => (
                            <article key={`${movimentacao.descricao}-${movimentacao.data}`}>
                                <div>
                                    <h3>{movimentacao.descricao}</h3>
                                    <p>{formatarData(movimentacao.data)}</p>
                                </div>
                                <strong className={movimentacao.tipo}>
                                    {movimentacao.tipo === "receita" ? "+" : "-"} {formatarMoeda(movimentacao.valor)}
                                </strong>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="home-panel">
                    <div className="home-section-title">
                        <CalendarClock size={21} aria-hidden="true"/>
                        <h2>Próximas entregas</h2>
                    </div>

                    <div className="home-list">
                        {proximasEntregas.map((entrega) => (
                            <article key={`${entrega.titulo}-${entrega.data}`}>
                                <div>
                                    <h3>{entrega.titulo}</h3>
                                    <p>{entrega.disciplina}</p>
                                </div>
                                <strong>{formatarData(entrega.data)}</strong>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="home-panel">
                    <div className="home-section-title">
                        <HeartPulse size={21} aria-hidden="true"/>
                        <h2>Últimos registros de humor</h2>
                    </div>

                    <div className="home-list">
                        {registrosHumor.map((registro) => (
                            <article key={`${registro.humor}-${registro.data}`}>
                                <span className="home-mood">{registro.emoji}</span>
                                <div>
                                    <h3>{registro.humor}</h3>
                                    <p>{registro.observacao}</p>
                                </div>
                                <strong>{formatarData(registro.data)}</strong>
                            </article>
                        ))}
                    </div>
                </section>
            </div>
        </section>
    )
}

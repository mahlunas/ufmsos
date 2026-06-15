import {AlertTriangle, BriefcaseBusiness, CalendarClock, HeartPulse, Landmark, Send, WalletCards} from "lucide-react";
import MetricCard from "../components/MetricCard.tsx";
import PageHeader from "../components/PageHeader.tsx";
import SectionTitle from "../components/SectionTitle.tsx";
import "../styles/Home.css";

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
            <div className="home-shell">
                <PageHeader eyebrow="Painel inicial" title="Bem-vindo ao UFMSOS"/>
            </div>

            <div className="home-cards">
                <MetricCard icon={CalendarClock} label="Próxima atividade a vencer" value="Lista 4 - Recursão" detail="Amanhã"/>
                <MetricCard icon={WalletCards} label="Saldo financeiro atual" value={formatarMoeda(-96.35)} detail="Receitas menos despesas"/>
                <MetricCard icon={HeartPulse} label="Humor da semana" value="3.4 / 5" detail="Média dos últimos registros"/>
                <MetricCard icon={BriefcaseBusiness} label="Estágio ativo" value="Tech Campo Grande" detail="30h/semana"/>
                <MetricCard icon={Send} label="Candidaturas abertas" value="4" detail="Em andamento"/>
            </div>

            <section className="home-alerts">
                <SectionTitle icon={AlertTriangle} title="Alertas"/>

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
                    <SectionTitle icon={Landmark} title="Últimas movimentações financeiras"/>

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
                    <SectionTitle icon={CalendarClock} title="Próximas entregas"/>

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
                    <SectionTitle icon={HeartPulse} title="Últimos registros de humor"/>

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

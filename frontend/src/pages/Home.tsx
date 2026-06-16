import {AlertTriangle, BriefcaseBusiness, CalendarClock, FileText, GraduationCap, HeartPulse, Landmark, Send, WalletCards} from "lucide-react";
import AppPanel from "../components/AppPanel.tsx";
import DataList from "../components/DataList.tsx";
import MetricCard from "../components/MetricCard.tsx";
import PageHeader from "../components/PageHeader.tsx";
import SectionTitle from "../components/SectionTitle.tsx";
import StatusPill from "../components/StatusPill.tsx";
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
            <PageHeader eyebrow="Painel inicial" title="My UFMS.O.S"/>

            <AppPanel className="home-quick-access app-panel-pad">
                <SectionTitle title="Acesso rápido"/>

                <div className="home-quick-grid">
                    <article className="home-quick-card is-featured">
                        <div className="home-quick-icon"><GraduationCap size={20} aria-hidden="true"/></div>
                        <strong>Estudos</strong>
                        <p>{proximasEntregas.length} entregas próximas</p>
                        <div className="home-avatar-row">
                            <span>A</span><span>B</span><span>C</span>
                        </div>
                    </article>

                    <article className="home-quick-card">
                        <div className="home-quick-icon"><WalletCards size={20} aria-hidden="true"/></div>
                        <strong>Finanças</strong>
                        <p>{formatarMoeda(-96.35)} de saldo</p>
                        <StatusPill tone="red">Atenção</StatusPill>
                    </article>

                    <article className="home-quick-card">
                        <div className="home-quick-icon"><HeartPulse size={20} aria-hidden="true"/></div>
                        <strong>Saúde</strong>
                        <p>3 registros na semana</p>
                        <StatusPill tone="green">Estável</StatusPill>
                    </article>

                    <article className="home-quick-card">
                        <div className="home-quick-icon"><BriefcaseBusiness size={20} aria-hidden="true"/></div>
                        <strong>Estágio</strong>
                        <p>30h semanais</p>
                        <StatusPill tone="blue">Regular</StatusPill>
                    </article>
                </div>
            </AppPanel>

            <div className="home-cards">
                <MetricCard icon={CalendarClock} label="Próxima atividade" value="Lista 4" detail="Amanhã" tone="blue"/>
                <MetricCard icon={WalletCards} label="Saldo atual" value={formatarMoeda(-96.35)} detail="Receitas menos despesas" tone="red"/>
                <MetricCard icon={HeartPulse} label="Humor da semana" value="3.4 / 5" detail="Últimos registros" tone="green"/>
                <MetricCard icon={BriefcaseBusiness} label="Estágio ativo" value="Tech Campo Grande" detail="30h/semana" tone="purple"/>
                <MetricCard icon={Send} label="Candidaturas" value="4" detail="Em andamento" tone="yellow"/>
            </div>

            <AppPanel className="home-alerts app-panel-pad">
                <SectionTitle icon={AlertTriangle} title="Alertas"/>

                <div className="home-alert-list">
                    {alertas.map((alerta) => (
                        <article key={alerta}>
                            <AlertTriangle size={18} aria-hidden="true"/>
                            <span>{alerta}</span>
                        </article>
                    ))}
                </div>
            </AppPanel>

            <div className="home-summary-grid">
                <AppPanel className="home-panel app-panel-pad">
                    <SectionTitle icon={Landmark} title="Últimas movimentações financeiras"/>

                    <DataList
                        items={movimentacoesFinanceiras.map((movimentacao) => ({
                            id: `${movimentacao.descricao}-${movimentacao.data}`,
                            title: movimentacao.descricao,
                            detail: formatarData(movimentacao.data),
                            meta: `${movimentacao.tipo === "receita" ? "+" : "-"} ${formatarMoeda(movimentacao.valor)}`,
                            icon: Landmark,
                            tone: movimentacao.tipo === "receita" ? "green" : "red",
                        }))}
                    />
                </AppPanel>

                <AppPanel className="home-panel app-panel-pad">
                    <SectionTitle icon={CalendarClock} title="Próximas entregas"/>

                    <DataList
                        items={proximasEntregas.map((entrega) => ({
                            id: `${entrega.titulo}-${entrega.data}`,
                            title: entrega.titulo,
                            detail: entrega.disciplina,
                            meta: formatarData(entrega.data),
                            icon: FileText,
                            tone: "blue",
                        }))}
                    />
                </AppPanel>

                <AppPanel className="home-panel app-panel-pad">
                    <SectionTitle icon={HeartPulse} title="Últimos registros de humor"/>

                    <DataList
                        items={registrosHumor.map((registro) => ({
                            id: `${registro.humor}-${registro.data}`,
                            title: `${registro.emoji} ${registro.humor}`,
                            detail: registro.observacao,
                            meta: formatarData(registro.data),
                            icon: HeartPulse,
                            tone: registro.humor === "Ruim" ? "red" : registro.humor === "Bom" ? "green" : "neutral",
                        }))}
                    />
                </AppPanel>
            </div>
        </section>
    )
}

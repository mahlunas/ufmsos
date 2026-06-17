import {useEffect, useMemo, useState} from "react";
import {AlertTriangle, BriefcaseBusiness, CalendarClock, FileText, GraduationCap, HeartPulse, Landmark, WalletCards} from "lucide-react";
import AppPanel from "../components/AppPanel.tsx";
import DataList from "../components/DataList.tsx";
import MetricCard from "../components/MetricCard.tsx";
import PageHeader from "../components/PageHeader.tsx";
import SectionTitle from "../components/SectionTitle.tsx";
import StatusPill from "../components/StatusPill.tsx";
import {apiRequest} from "../lib/api.ts";
import {getCurrentUsuarioId} from "../lib/auth.ts";
import "../styles/Home.css";

type ResumoFinanceiroApi = {
    saldoTotal: number;
    totalReceitas: number;
    totalDespesas: number;
    gastosPorCategoria: Record<string, number>;
};

type DisciplinaApi = {
    id: string;
    nome: string;
    codigo?: string | null;
    cargaHoraria?: number | null;
};

type AvaliacaoApi = {
    id: string;
    nome: string;
    dataPrevista: string;
    notaObtida?: number | null;
};

type RegistroBemEstarApi = {
    id: string;
    nivelHumor: number;
    nivelExaustao: number;
    observacao?: string | null;
    dataRegistro: string;
};

type ContratoEstagioApi = {
    id: string;
    empresaNome: string;
    dataInicio: string;
    dataFim?: string | null;
    cargaHorariaSemanal: number;
    ativo: boolean;
};

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
    }).format(new Date(data));
}

function mediaHumor(registros: RegistroBemEstarApi[]) {
    if (!registros.length) {
        return 0;
    }

    return registros.reduce((total, registro) => total + registro.nivelHumor, 0) / registros.length;
}

export default function Home(){
    const estudanteId = getCurrentUsuarioId();
    const [resumoFinanceiro, setResumoFinanceiro] = useState<ResumoFinanceiroApi | null>(null);
    const [disciplinas, setDisciplinas] = useState<DisciplinaApi[]>([]);
    const [avaliacoes, setAvaliacoes] = useState<AvaliacaoApi[]>([]);
    const [registrosSaude, setRegistrosSaude] = useState<RegistroBemEstarApi[]>([]);
    const [contratos, setContratos] = useState<ContratoEstagioApi[]>([]);
    const [erro, setErro] = useState("");

    useEffect(() => {
        async function carregar() {
            if (!estudanteId) {
                setErro("Usuário autenticado sem identificador de estudante.");
                return;
            }

            try {
                const [financeiroResponse, disciplinasResponse, avaliacoesResponse, saudeResponse, contratosResponse] = await Promise.all([
                    apiRequest(`/financeiro/resumo/${estudanteId}`),
                    apiRequest("/disciplinas"),
                    apiRequest("/avaliacoes"),
                    apiRequest(`/saude/registros/${estudanteId}`),
                    apiRequest(`/estagios/contratos?estudanteId=${estudanteId}`),
                ]);

                if (financeiroResponse.ok) {
                    setResumoFinanceiro(await financeiroResponse.json() as ResumoFinanceiroApi);
                }
                if (disciplinasResponse.ok) {
                    setDisciplinas(await disciplinasResponse.json() as DisciplinaApi[]);
                }
                if (avaliacoesResponse.ok) {
                    setAvaliacoes(await avaliacoesResponse.json() as AvaliacaoApi[]);
                }
                if (saudeResponse.ok) {
                    setRegistrosSaude(await saudeResponse.json() as RegistroBemEstarApi[]);
                }
                if (contratosResponse.ok) {
                    setContratos(await contratosResponse.json() as ContratoEstagioApi[]);
                }
            } catch {
                setErro("Não foi possível carregar o painel inicial.");
            }
        }

        carregar();
    }, [estudanteId]);

    const proximaAvaliacao = useMemo(() => (
        [...avaliacoes]
            .sort((a, b) => a.dataPrevista.localeCompare(b.dataPrevista))
            .find((avaliacao) => avaliacao.notaObtida == null) ?? avaliacoes[0]
    ), [avaliacoes]);

    const contratoAtivo = useMemo(() => contratos.find((contrato) => contrato.ativo) ?? contratos[0], [contratos]);
    const ultimosRegistros = useMemo(() => [...registrosSaude].sort((a, b) => b.dataRegistro.localeCompare(a.dataRegistro)).slice(0, 3), [registrosSaude]);
    const categoriasFinanceiras = useMemo(() => Object.entries(resumoFinanceiro?.gastosPorCategoria ?? {}).sort((a, b) => b[1] - a[1]).slice(0, 3), [resumoFinanceiro]);

    return (
        <section className="home-page">
            <PageHeader eyebrow="Painel inicial" title="UFMS.O.S"/>

            {erro && <p className="saude-message">{erro}</p>}

            <AppPanel className="home-quick-access app-panel-pad">
                <SectionTitle title="Acesso rápido"/>

                <div className="home-quick-grid">
                    <article className="home-quick-card is-featured">
                        <div className="home-quick-icon"><GraduationCap size={20} aria-hidden="true"/></div>
                        <strong>Estudos</strong>
                        <p>{disciplinas.length} disciplinas e {avaliacoes.length} avaliações</p>
                        <StatusPill tone="blue">{proximaAvaliacao ? `Próxima: ${formatarData(proximaAvaliacao.dataPrevista)}` : "Sem avaliações"}</StatusPill>
                    </article>

                    <article className="home-quick-card">
                        <div className="home-quick-icon"><WalletCards size={20} aria-hidden="true"/></div>
                        <strong>Finanças</strong>
                        <p>{formatarMoeda(resumoFinanceiro?.saldoTotal ?? 0)} de saldo</p>
                        <StatusPill tone={(resumoFinanceiro?.saldoTotal ?? 0) >= 0 ? "green" : "red"}>{(resumoFinanceiro?.saldoTotal ?? 0) >= 0 ? "Positivo" : "Atenção"}</StatusPill>
                    </article>

                    <article className="home-quick-card">
                        <div className="home-quick-icon"><HeartPulse size={20} aria-hidden="true"/></div>
                        <strong>Saúde</strong>
                        <p>{registrosSaude.length} registros salvos</p>
                        <StatusPill tone="green">Média {mediaHumor(registrosSaude).toFixed(1)}</StatusPill>
                    </article>

                    <article className="home-quick-card">
                        <div className="home-quick-icon"><BriefcaseBusiness size={20} aria-hidden="true"/></div>
                        <strong>Estágio</strong>
                        <p>{contratoAtivo ? `${contratoAtivo.cargaHorariaSemanal}h semanais` : "Sem contrato"}</p>
                        <StatusPill tone={contratoAtivo?.ativo ? "blue" : "neutral"}>{contratoAtivo?.ativo ? "Ativo" : "Inativo"}</StatusPill>
                    </article>
                </div>
            </AppPanel>

            <div className="home-cards">
                <MetricCard icon={CalendarClock} label="Próxima atividade" value={proximaAvaliacao?.nome ?? "Sem avaliação"} detail={proximaAvaliacao ? formatarData(proximaAvaliacao.dataPrevista) : "Sem dados"} tone="blue"/>
                <MetricCard icon={WalletCards} label="Saldo atual" value={formatarMoeda(resumoFinanceiro?.saldoTotal ?? 0)} detail="Resumo financeiro real" tone={(resumoFinanceiro?.saldoTotal ?? 0) >= 0 ? "green" : "red"}/>
                <MetricCard icon={HeartPulse} label="Humor médio" value={mediaHumor(registrosSaude).toFixed(1)} detail="Últimos registros" tone="green"/>
                <MetricCard icon={BriefcaseBusiness} label="Estágio ativo" value={contratoAtivo?.empresaNome ?? "Sem contrato"} detail={contratoAtivo ? `${contratoAtivo.cargaHorariaSemanal}h/semana` : "Sem dados"} tone="purple"/>
            </div>

            <AppPanel className="home-alerts app-panel-pad">
                <SectionTitle icon={AlertTriangle} title="Alertas"/>

                <div className="home-alert-list">
                    {[
                        proximaAvaliacao ? `Próxima avaliação: ${proximaAvaliacao.nome}` : "Nenhuma avaliação pendente",
                        contratoAtivo ? `Contrato ativo: ${contratoAtivo.empresaNome}` : "Nenhum estágio ativo",
                        categoriasFinanceiras[0] ? `Maior gasto: ${categoriasFinanceiras[0][0]}` : "Sem gastos por categoria",
                    ].map((alerta) => (
                        <article key={alerta}>
                            <AlertTriangle size={18} aria-hidden="true"/>
                            <span>{alerta}</span>
                        </article>
                    ))}
                </div>
            </AppPanel>

            <div className="home-summary-grid">
                <AppPanel className="home-panel app-panel-pad">
                    <SectionTitle icon={Landmark} title="Categorias financeiras"/>

                    <DataList
                        items={categoriasFinanceiras.map(([categoria, valor]) => ({
                            id: categoria,
                            title: categoria,
                            detail: "Despesa por categoria",
                            meta: formatarMoeda(valor as number),
                            icon: Landmark,
                            tone: "red",
                        }))}
                    />
                </AppPanel>

                <AppPanel className="home-panel app-panel-pad">
                    <SectionTitle icon={CalendarClock} title="Próximas avaliações"/>

                    <DataList
                        items={[...avaliacoes]
                            .sort((a, b) => a.dataPrevista.localeCompare(b.dataPrevista))
                            .slice(0, 3)
                            .map((avaliacao) => ({
                                id: avaliacao.id,
                                title: avaliacao.nome,
                                detail: avaliacao.notaObtida == null ? "Sem nota lançada" : `Nota ${avaliacao.notaObtida.toFixed(1)}`,
                                meta: formatarData(avaliacao.dataPrevista),
                                icon: FileText,
                                tone: avaliacao.notaObtida == null ? "yellow" : "green",
                            }))}
                    />
                </AppPanel>

                <AppPanel className="home-panel app-panel-pad">
                    <SectionTitle icon={HeartPulse} title="Últimos registros de humor"/>

                    <DataList
                        items={ultimosRegistros.map((registro) => ({
                            id: registro.id,
                            title: `Humor ${registro.nivelHumor}/5`,
                            detail: registro.observacao ?? "Sem observações.",
                            meta: formatarData(registro.dataRegistro),
                            icon: HeartPulse,
                            tone: registro.nivelHumor <= 2 ? "red" : registro.nivelHumor >= 4 ? "green" : "neutral",
                        }))}
                    />
                </AppPanel>
            </div>
        </section>
    );
}

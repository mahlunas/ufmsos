import {useMemo, useState} from "react";
import {AlertTriangle, BriefcaseBusiness, CalendarCheck, CheckCircle2, Clock, Coins, FileText} from "lucide-react";
import AppPanel from "../components/AppPanel.tsx";
import DataList from "../components/DataList.tsx";
import MetricCard from "../components/MetricCard.tsx";
import PageHeader from "../components/PageHeader.tsx";
import SectionTitle from "../components/SectionTitle.tsx";
import StatusPill from "../components/StatusPill.tsx";
import "../styles/Estagio.css";

type StatusContrato = "Ativo" | "Finalizado";

type ContratoEstagio = {
    id: number;
    empresa: string;
    cargo: string;
    inicio: string;
    fim: string;
    cargaHorariaSemanal: number;
    bolsa: number;
    diasRecesso: number;
    status: StatusContrato;
};

const LIMITE_CARGA_HORARIA = 30;

const contratosIniciais: ContratoEstagio[] = [
    {
        id: 1,
        empresa: "Tech Campo Grande",
        cargo: "Estagiário Front-end",
        inicio: "2026-03-01",
        fim: "2026-12-31",
        cargaHorariaSemanal: 30,
        bolsa: 1200,
        diasRecesso: 12,
        status: "Ativo",
    },
    {
        id: 2,
        empresa: "Dados MS",
        cargo: "Estagiário de Dados",
        inicio: "2025-08-01",
        fim: "2026-02-28",
        cargaHorariaSemanal: 20,
        bolsa: 950,
        diasRecesso: 8,
        status: "Finalizado",
    },
    {
        id: 3,
        empresa: "UFMS Lab",
        cargo: "Monitor de Sistemas",
        inicio: "2025-02-10",
        fim: "2025-07-20",
        cargaHorariaSemanal: 16,
        bolsa: 700,
        diasRecesso: 5,
        status: "Finalizado",
    },
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
        year: "numeric",
    }).format(new Date(`${data}T12:00:00`));
}

export default function Estagio(){
    const [filtro, setFiltro] = useState<StatusContrato | "Todos">("Ativo");
    const contratos = contratosIniciais;
    const contratoAtual = contratos.find((contrato) => contrato.status === "Ativo") ?? contratos[0];

    const contratosFiltrados = useMemo(() => (
        filtro === "Todos" ? contratos : contratos.filter((contrato) => contrato.status === filtro)
    ), [contratos, filtro]);

    const cargaRegular = contratoAtual.cargaHorariaSemanal <= LIMITE_CARGA_HORARIA;

    return (
        <section className="estagio-page">
            <PageHeader eyebrow="Vida profissional" title="Estágio"/>

            <div className="estagio-cards">
                <MetricCard icon={BriefcaseBusiness} label="Empresa Atual" value={contratoAtual.empresa} tone="blue"/>
                <MetricCard icon={Clock} label="Carga Horária" value={`${contratoAtual.cargaHorariaSemanal}h/semana`} tone={cargaRegular ? "green" : "red"}/>
                <MetricCard icon={Coins} label="Bolsa" value={formatarMoeda(contratoAtual.bolsa)} tone="yellow"/>
                <MetricCard icon={CalendarCheck} label="Recesso" value={`${contratoAtual.diasRecesso} dias`} tone="purple"/>
            </div>

            <div className="estagio-content">
                <AppPanel className="estagio-contracts-panel app-panel-pad">
                    <div className="estagio-section-title">
                        <SectionTitle title="Lista de contratos" subtitle={`${contratosFiltrados.length} contratos exibidos`}/>

                        <div className="estagio-filters" aria-label="Filtrar contratos">
                            <button type="button" className={filtro === "Ativo" ? "is-active" : ""} onClick={() => setFiltro("Ativo")}>Ativos</button>
                            <button type="button" className={filtro === "Finalizado" ? "is-active" : ""} onClick={() => setFiltro("Finalizado")}>Finalizados</button>
                            <button type="button" className={filtro === "Todos" ? "is-active" : ""} onClick={() => setFiltro("Todos")}>Todos</button>
                        </div>
                    </div>

                    <DataList
                        items={contratosFiltrados.map((contrato) => ({
                            id: contrato.id,
                            title: contrato.empresa,
                            detail: `${contrato.cargo} · ${formatarData(contrato.inicio)} até ${formatarData(contrato.fim)}`,
                            meta: <StatusPill tone={contrato.status === "Ativo" ? "green" : "neutral"}>{contrato.status}</StatusPill>,
                            icon: FileText,
                            tone: contrato.status === "Ativo" ? "green" : "neutral",
                        }))}
                    />
                </AppPanel>

                <AppPanel className={`estagio-compliance app-panel-pad ${cargaRegular ? "regular" : "warning"}`}>
                    <div className="estagio-compliance-icon">
                        {cargaRegular ? <CheckCircle2 size={28} aria-hidden="true"/> : <AlertTriangle size={28} aria-hidden="true"/>}
                    </div>

                    <p>Compliance</p>
                    <h2>{cargaRegular ? "Contrato regular" : "Carga horária acima do permitido"}</h2>

                    <div className="estagio-compliance-details">
                        <span>Limite permitido</span>
                        <strong>{LIMITE_CARGA_HORARIA}h/semana</strong>
                    </div>

                    <div className="estagio-compliance-details">
                        <span>Carga atual</span>
                        <strong>{contratoAtual.cargaHorariaSemanal}h/semana</strong>
                    </div>
                </AppPanel>
            </div>
        </section>
    )
}

import {useMemo, useState} from "react";
import {AlertTriangle, BriefcaseBusiness, CalendarCheck, CheckCircle2, Clock, Coins, FileText} from "lucide-react";
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
            <header className="estagio-header">
                <div>
                    <p>Vida profissional</p>
                    <h1>Estágio</h1>
                </div>
            </header>

            <div className="estagio-cards">
                <article className="estagio-card">
                    <BriefcaseBusiness size={22} aria-hidden="true"/>
                    <p>Empresa Atual</p>
                    <strong>{contratoAtual.empresa}</strong>
                </article>

                <article className="estagio-card">
                    <Clock size={22} aria-hidden="true"/>
                    <p>Carga Horária</p>
                    <strong>{contratoAtual.cargaHorariaSemanal}h/semana</strong>
                </article>

                <article className="estagio-card">
                    <Coins size={22} aria-hidden="true"/>
                    <p>Bolsa</p>
                    <strong>{formatarMoeda(contratoAtual.bolsa)}</strong>
                </article>

                <article className="estagio-card">
                    <CalendarCheck size={22} aria-hidden="true"/>
                    <p>Dias de Recesso</p>
                    <strong>{contratoAtual.diasRecesso} dias</strong>
                </article>
            </div>

            <div className="estagio-content">
                <section className="estagio-contracts-panel">
                    <div className="estagio-section-title">
                        <div>
                            <h2>Lista de contratos</h2>
                            <p>{contratosFiltrados.length} contratos exibidos</p>
                        </div>

                        <div className="estagio-filters" aria-label="Filtrar contratos">
                            <button type="button" className={filtro === "Ativo" ? "is-active" : ""} onClick={() => setFiltro("Ativo")}>Ativos</button>
                            <button type="button" className={filtro === "Finalizado" ? "is-active" : ""} onClick={() => setFiltro("Finalizado")}>Finalizados</button>
                            <button type="button" className={filtro === "Todos" ? "is-active" : ""} onClick={() => setFiltro("Todos")}>Todos</button>
                        </div>
                    </div>

                    <div className="estagio-contracts">
                        {contratosFiltrados.map((contrato) => (
                            <article className="estagio-contract" key={contrato.id}>
                                <div className="estagio-contract-icon">
                                    <FileText size={19} aria-hidden="true"/>
                                </div>

                                <div>
                                    <h3>{contrato.empresa}</h3>
                                    <p>{contrato.cargo}</p>
                                    <span>{formatarData(contrato.inicio)} até {formatarData(contrato.fim)}</span>
                                </div>

                                <strong className={contrato.status === "Ativo" ? "active" : "finished"}>
                                    {contrato.status}
                                </strong>
                            </article>
                        ))}
                    </div>
                </section>

                <aside className={`estagio-compliance ${cargaRegular ? "regular" : "warning"}`}>
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
                </aside>
            </div>
        </section>
    )
}

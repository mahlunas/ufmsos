import {useEffect, useMemo, useState} from "react";
import {AlertTriangle, BriefcaseBusiness, CalendarCheck, CheckCircle2, Clock, FileText} from "lucide-react";
import AppPanel from "../components/AppPanel.tsx";
import DataList from "../components/DataList.tsx";
import MetricCard from "../components/MetricCard.tsx";
import PageHeader from "../components/PageHeader.tsx";
import SectionTitle from "../components/SectionTitle.tsx";
import StatusPill from "../components/StatusPill.tsx";
import {apiRequest} from "../lib/api.ts";
import {getCurrentUsuarioId} from "../lib/auth.ts";
import "../styles/Estagio.css";

type ContratoEstagioApi = {
    id: string;
    empresaNome: string;
    dataInicio: string;
    dataFim?: string | null;
    cargaHorariaSemanal: number;
    estudanteId: string;
    ativo: boolean;
};

type ProjecaoRecessoApi = {
    dataSugestao: string;
    diasAcumulados: number;
    observacao: string;
};

const LIMITE_CARGA_HORARIA = 30;

function formatarData(data?: string | null) {
    if (!data) {
        return "Sem data";
    }

    return new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    }).format(new Date(data));
}

export default function Estagio(){
    const estudanteId = getCurrentUsuarioId();
    const [contratos, setContratos] = useState<ContratoEstagioApi[]>([]);
    const [projecaoRecesso, setProjecaoRecesso] = useState<ProjecaoRecessoApi | null>(null);
    const [filtro, setFiltro] = useState<"Ativo" | "Finalizado" | "Todos">("Ativo");
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");

    useEffect(() => {
        async function carregar() {
            if (!estudanteId) {
                setErro("Usuário autenticado sem identificador de estudante.");
                setCarregando(false);
                return;
            }

            setCarregando(true);
            setErro("");

            try {
                const response = await apiRequest(`/estagios/contratos?estudanteId=${estudanteId}`);

                if (!response.ok) {
                    throw new Error("Falha ao carregar contratos.");
                }

                const data = await response.json() as ContratoEstagioApi[];
                setContratos(data);
            } catch {
                setErro("Não foi possível carregar os contratos de estágio.");
            } finally {
                setCarregando(false);
            }
        }

        carregar();
    }, [estudanteId]);

    const contratosFiltrados = useMemo(() => (
        filtro === "Todos" ? contratos : contratos.filter((contrato) => (filtro === "Ativo" ? contrato.ativo : !contrato.ativo))
    ), [contratos, filtro]);

    const contratoAtual = contratos.find((contrato) => contrato.ativo) ?? contratos[0];
    const cargaRegular = (contratoAtual?.cargaHorariaSemanal ?? 0) <= LIMITE_CARGA_HORARIA;

    useEffect(() => {
        async function carregarRecesso() {
            if (!contratoAtual?.id) {
                setProjecaoRecesso(null);
                return;
            }

            try {
                const response = await apiRequest(`/estagios/contratos/${contratoAtual.id}/recesso`);
                if (response.ok) {
                    setProjecaoRecesso(await response.json() as ProjecaoRecessoApi);
                }
            } catch {
                setProjecaoRecesso(null);
            }
        }

        carregarRecesso();
    }, [contratoAtual?.id]);

    return (
        <section className="estagio-page">
            <PageHeader eyebrow="Vida profissional" title="Estágio"/>

            {erro && <p className="saude-message">{erro}</p>}

            <div className="estagio-cards">
                <MetricCard icon={BriefcaseBusiness} label="Empresa Atual" value={contratoAtual?.empresaNome ?? "Sem contrato"} tone="blue"/>
                <MetricCard icon={Clock} label="Carga Horária" value={contratoAtual ? `${contratoAtual.cargaHorariaSemanal}h/semana` : "--"} tone={cargaRegular ? "green" : "red"}/>
                <MetricCard icon={CalendarCheck} label="Recesso" value={projecaoRecesso ? `${projecaoRecesso.diasAcumulados} dias` : "--"} tone="yellow"/>
                <MetricCard icon={FileText} label="Contratos" value={contratos.length} tone="purple"/>
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

                    {carregando && <p>Carregando contratos...</p>}

                    {!carregando && (
                        <DataList
                            items={contratosFiltrados.map((contrato) => ({
                                id: contrato.id,
                                title: contrato.empresaNome,
                                detail: `${formatarData(contrato.dataInicio)}${contrato.dataFim ? ` até ${formatarData(contrato.dataFim)}` : ""}`,
                                meta: <StatusPill tone={contrato.ativo ? "green" : "neutral"}>{contrato.ativo ? "Ativo" : "Finalizado"}</StatusPill>,
                                icon: FileText,
                                tone: contrato.ativo ? "green" : "neutral",
                            }))}
                        />
                    )}
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
                        <strong>{contratoAtual ? `${contratoAtual.cargaHorariaSemanal}h/semana` : "--"}</strong>
                    </div>

                    <div className="estagio-compliance-details">
                        <span>Recesso sugerido</span>
                        <strong>{projecaoRecesso ? formatarData(projecaoRecesso.dataSugestao) : "--"}</strong>
                    </div>
                </AppPanel>
            </div>
        </section>
    );
}

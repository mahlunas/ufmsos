import {useMemo, useState} from "react";
import {ArrowRight, Building2, CalendarDays, CheckCircle2, Plus, Send, XCircle} from "lucide-react";
import Button from "../components/Button.tsx";
import "./Candidaturas.css";

type EtapaCandidatura = "Aplicando" | "Triagem" | "Entrevista" | "Teste Técnico" | "Aprovado" | "Rejeitado";

type Candidatura = {
    id: number;
    empresa: string;
    cargo: string;
    data: string;
    observacoes: string;
    etapa: EtapaCandidatura;
};

type CandidaturaForm = {
    empresa: string;
    cargo: string;
    data: string;
    observacoes: string;
};

const etapas: EtapaCandidatura[] = [
    "Aplicando",
    "Triagem",
    "Entrevista",
    "Teste Técnico",
    "Aprovado",
    "Rejeitado",
];

const candidaturasIniciais: Candidatura[] = [
    {
        id: 1,
        empresa: "Tech Campo Grande",
        cargo: "Estágio Front-end",
        data: "2026-06-03",
        observacoes: "Currículo enviado com portfólio atualizado.",
        etapa: "Aplicando",
    },
    {
        id: 2,
        empresa: "Dados MS",
        cargo: "Analista de Dados Jr.",
        data: "2026-05-28",
        observacoes: "Aguardando retorno do RH após análise inicial.",
        etapa: "Triagem",
    },
    {
        id: 3,
        empresa: "SoftLab",
        cargo: "Desenvolvedor React Jr.",
        data: "2026-05-22",
        observacoes: "Entrevista marcada com líder técnico.",
        etapa: "Entrevista",
    },
    {
        id: 4,
        empresa: "Núcleo Digital",
        cargo: "Estágio Full Stack",
        data: "2026-05-18",
        observacoes: "Teste técnico entregue, aguardando avaliação.",
        etapa: "Teste Técnico",
    },
    {
        id: 5,
        empresa: "Campus Jobs",
        cargo: "Suporte de Sistemas",
        data: "2026-05-10",
        observacoes: "Proposta recebida para início em julho.",
        etapa: "Aprovado",
    },
    {
        id: 6,
        empresa: "App Escola",
        cargo: "QA Jr.",
        data: "2026-04-30",
        observacoes: "Vaga pausada pela empresa.",
        etapa: "Rejeitado",
    },
];

const formVazio: CandidaturaForm = {
    empresa: "",
    cargo: "",
    data: "",
    observacoes: "",
};

function formatarData(data: string) {
    return new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    }).format(new Date(`${data}T12:00:00`));
}

function proximaEtapa(etapa: EtapaCandidatura) {
    const indice = etapas.indexOf(etapa);
    return etapas[Math.min(indice + 1, etapas.indexOf("Teste Técnico"))];
}

export default function Candidaturas(){
    const [candidaturas, setCandidaturas] = useState(candidaturasIniciais);
    const [formAberto, setFormAberto] = useState(false);
    const [form, setForm] = useState(formVazio);

    const candidaturasPorEtapa = useMemo(() => (
        etapas.map((etapa) => ({
            etapa,
            itens: candidaturas.filter((candidatura) => candidatura.etapa === etapa),
        }))
    ), [candidaturas]);

    function salvarCandidatura() {
        if (!form.empresa.trim() || !form.cargo.trim() || !form.data) {
            return;
        }

        const novaCandidatura: Candidatura = {
            id: Date.now(),
            ...form,
            etapa: "Aplicando",
        };

        setCandidaturas((atuais) => [novaCandidatura, ...atuais]);
        setForm(formVazio);
        setFormAberto(false);
    }

    function moverCandidatura(id: number, etapa: EtapaCandidatura) {
        setCandidaturas((atuais) => atuais.map((candidatura) => (
            candidatura.id === id
                ? {...candidatura, etapa}
                : candidatura
        )));
    }

    function avancarCandidatura(id: number, etapaAtual: EtapaCandidatura) {
        moverCandidatura(id, proximaEtapa(etapaAtual));
    }

    return (
        <section className="candidaturas-page">
            <header className="candidaturas-header">
                <div>
                    <p>Processos seletivos</p>
                    <h1>Candidaturas</h1>
                </div>

                <Button className="candidaturas-primary-button" icon={Plus} variant="primary" onClick={() => setFormAberto(true)}>
                    Nova candidatura
                </Button>
            </header>

            {formAberto && (
                <div className="candidaturas-form">
                    <label>
                        Empresa
                        <input
                            value={form.empresa}
                            onChange={(event) => setForm((atual) => ({...atual, empresa: event.target.value}))}
                            placeholder="Ex.: Empresa Jr."
                        />
                    </label>

                    <label>
                        Cargo
                        <input
                            value={form.cargo}
                            onChange={(event) => setForm((atual) => ({...atual, cargo: event.target.value}))}
                            placeholder="Ex.: Estágio Back-end"
                        />
                    </label>

                    <label>
                        Data da candidatura
                        <input
                            type="date"
                            value={form.data}
                            onChange={(event) => setForm((atual) => ({...atual, data: event.target.value}))}
                        />
                    </label>

                    <label>
                        Observações
                        <input
                            value={form.observacoes}
                            onChange={(event) => setForm((atual) => ({...atual, observacoes: event.target.value}))}
                            placeholder="Ex.: Enviar portfólio até sexta"
                        />
                    </label>

                    <div className="candidaturas-form-actions">
                        <Button variant="primary" onClick={salvarCandidatura}>Salvar</Button>
                        <Button onClick={() => setFormAberto(false)}>Cancelar</Button>
                    </div>
                </div>
            )}

            <div className="candidaturas-board" aria-label="Kanban de candidaturas">
                {candidaturasPorEtapa.map(({etapa, itens}) => (
                    <section className={`candidaturas-column etapa-${etapa.toLowerCase().replace(" ", "-").replace("é", "e")}`} key={etapa}>
                        <div className="candidaturas-column-header">
                            <h2>{etapa}</h2>
                            <span>{itens.length}</span>
                        </div>

                        <div className="candidaturas-cards">
                            {itens.map((candidatura) => (
                                <article className="candidaturas-card" key={candidatura.id}>
                                    <div className="candidaturas-card-main">
                                        <Building2 size={18} aria-hidden="true"/>
                                        <div>
                                            <h3>{candidatura.empresa}</h3>
                                            <p>{candidatura.cargo}</p>
                                        </div>
                                    </div>

                                    <div className="candidaturas-card-date">
                                        <CalendarDays size={16} aria-hidden="true"/>
                                        <span>{formatarData(candidatura.data)}</span>
                                    </div>

                                    <p className="candidaturas-notes">{candidatura.observacoes}</p>

                                    {!["Aprovado", "Rejeitado"].includes(candidatura.etapa) && (
                                        <div className="candidaturas-decision-actions">
                                            {candidatura.etapa === "Teste Técnico" ? (
                                                <Button className="candidaturas-approve-button" icon={CheckCircle2} variant="success" onClick={() => moverCandidatura(candidatura.id, "Aprovado")}>
                                                    Aprovado
                                                </Button>
                                            ) : (
                                                <Button className="candidaturas-next-button" icon={Send} onClick={() => avancarCandidatura(candidatura.id, candidatura.etapa)}>
                                                    Avançar
                                                    <ArrowRight size={15} aria-hidden="true"/>
                                                </Button>
                                            )}

                                            <Button className="candidaturas-reject-button" icon={XCircle} variant="danger" onClick={() => moverCandidatura(candidatura.id, "Rejeitado")}>
                                                Rejeitado
                                            </Button>
                                        </div>
                                    )}
                                </article>
                            ))}

                            {!itens.length && <p className="candidaturas-empty">Nenhuma candidatura nesta etapa.</p>}
                        </div>
                    </section>
                ))}
            </div>
        </section>
    )
}

import {useEffect, useMemo, useState} from "react";
import {BookOpen, CalendarDays, FilePenLine, Plus, Save, X} from "lucide-react";
import Button from "../components/Button.tsx";
import MetricCard from "../components/MetricCard.tsx";
import PageHeader from "../components/PageHeader.tsx";
import {apiRequest} from "../lib/api.ts";
import {getCurrentUsuarioId} from "../lib/auth.ts";
import "../styles/Estudos.css";

type DisciplinaApi = {
    id: string;
    nome: string;
    codigo?: string | null;
    cargaHoraria?: number | null;
    cursoId?: string | null;
    semestre?: number | null;
    preRequisito?: string | null;
};

type AvaliacaoApi = {
    id: string;
    nome: string;
    dataPrevista: string;
    notaObtida?: number | null;
    estudanteId?: string | null;
    disciplinaId?: string | null;
};

type DisciplinaForm = {
    nome: string;
    codigo: string;
    cargaHoraria: string;
};

const formVazio: DisciplinaForm = {
    nome: "",
    codigo: "",
    cargaHoraria: "",
};

function formatarData(data: string) {
    return new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    }).format(new Date(data));
}

export default function Estudos(){
    const estudanteId = getCurrentUsuarioId();
    const [disciplinas, setDisciplinas] = useState<DisciplinaApi[]>([]);
    const [avaliacoes, setAvaliacoes] = useState<AvaliacaoApi[]>([]);
    const [formAberto, setFormAberto] = useState(false);
    const [form, setForm] = useState<DisciplinaForm>(formVazio);
    const [erro, setErro] = useState("");
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        async function carregar() {
            setCarregando(true);
            setErro("");

            try {
                const [disciplinasResponse, avaliacoesResponse] = await Promise.all([
                    apiRequest("/disciplinas"),
                    apiRequest("/avaliacoes"),
                ]);

                if (!disciplinasResponse.ok || !avaliacoesResponse.ok) {
                    throw new Error("Falha ao carregar estudos.");
                }

                setDisciplinas(await disciplinasResponse.json() as DisciplinaApi[]);
                setAvaliacoes(await avaliacoesResponse.json() as AvaliacaoApi[]);
            } catch {
                setErro("Não foi possível carregar os dados de estudos.");
            } finally {
                setCarregando(false);
            }
        }

        carregar();
    }, [estudanteId]);

    const avaliacoesPendentes = useMemo(() => avaliacoes.filter((avaliacao) => avaliacao.notaObtida == null), [avaliacoes]);

    async function salvarDisciplina() {
        setErro("");

        if (!form.nome.trim() || !form.cargaHoraria.trim()) {
            setErro("Informe nome e carga horária.");
            return;
        }

        try {
            const response = await apiRequest("/disciplinas", {
                method: "POST",
                json: {
                    nome: form.nome,
                    codigo: form.codigo || null,
                    cargaHoraria: Number(form.cargaHoraria),
                    cursoId: null,
                },
            });

            if (!response.ok) {
                throw new Error("Falha ao salvar disciplina.");
            }

            const novaDisciplina = await response.json() as DisciplinaApi;
            setDisciplinas((atuais) => [novaDisciplina, ...atuais]);
            setForm(formVazio);
            setFormAberto(false);
        } catch {
            setErro("Não foi possível salvar a disciplina.");
        }
    }

    return (
        <section className="estudos-page">
            <PageHeader eyebrow="Área acadêmica" title="Estudos"/>

            {erro && <p className="saude-message">{erro}</p>}

            <div className="estudos-summary">
                <MetricCard icon={BookOpen} label="Disciplinas" value={disciplinas.length} tone="blue"/>
                <MetricCard icon={CalendarDays} label="Avaliações" value={avaliacoes.length} tone="green"/>
                <MetricCard icon={FilePenLine} label="Pendentes" value={avaliacoesPendentes.length} tone="red"/>
                <MetricCard icon={BookOpen} label="Semestre" value="--" tone="purple"/>
            </div>

            <div className="estudos-toolbar">
                <Button className="estudos-primary-button" icon={Plus} variant="primary" onClick={() => setFormAberto((atual) => !atual)}>
                    Nova disciplina
                </Button>
            </div>

            {formAberto && (
                <div className="estudos-form" aria-label="Formulário de disciplina">
                    <label>
                        Nome
                        <input
                            value={form.nome}
                            onChange={(event) => setForm((atual) => ({...atual, nome: event.target.value}))}
                            placeholder="Ex.: Engenharia de Software"
                        />
                    </label>

                    <label>
                        Código
                        <input
                            value={form.codigo}
                            onChange={(event) => setForm((atual) => ({...atual, codigo: event.target.value}))}
                            placeholder="Ex.: ESW001"
                        />
                    </label>

                    <label>
                        Carga horária
                        <input
                            inputMode="numeric"
                            value={form.cargaHoraria}
                            onChange={(event) => setForm((atual) => ({...atual, cargaHoraria: event.target.value}))}
                            placeholder="Ex.: 60"
                        />
                    </label>

                    <div className="estudos-form-actions">
                        <button type="button" className="estudos-icon-button" onClick={salvarDisciplina} title="Salvar">
                            <Save size={18} aria-hidden="true"/>
                        </button>
                        <button type="button" className="estudos-icon-button" onClick={() => setFormAberto(false)} title="Cancelar">
                            <X size={18} aria-hidden="true"/>
                        </button>
                    </div>
                </div>
            )}

            <div className="estudos-content">
                <section className="estudos-panel">
                    <div className="estudos-panel-header">
                        <h2>Disciplinas</h2>
                        <span>{carregando ? "Carregando..." : `${disciplinas.length} itens`}</span>
                    </div>

                    <div className="estudos-list">
                        {disciplinas.map((disciplina) => (
                            <article className="estudos-disciplina" key={disciplina.id}>
                                <div className="estudos-disciplina-main">
                                    <div className="estudos-disciplina-icon">
                                        <BookOpen size={20} aria-hidden="true"/>
                                    </div>
                                    <div>
                                        <h3>{disciplina.nome}</h3>
                                        <p>{disciplina.codigo ?? "Sem código"}</p>
                                    </div>
                                </div>

                                <div className="estudos-disciplina-meta">
                                    <span>{disciplina.cargaHoraria ?? "--"}h</span>
                                    <strong>{disciplina.semestre ? `${disciplina.semestre}º semestre` : "Sem semestre"}</strong>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="estudos-panel">
                    <div className="estudos-panel-header">
                        <h2>Avaliações</h2>
                        <span>{avaliacoesPendentes.length} pendentes</span>
                    </div>

                    <div className="estudos-list">
                        {avaliacoes.map((avaliacao) => (
                            <article className="estudos-disciplina" key={avaliacao.id}>
                                <div className="estudos-disciplina-main">
                                    <div className="estudos-disciplina-icon">
                                        <CalendarDays size={20} aria-hidden="true"/>
                                    </div>
                                    <div>
                                        <h3>{avaliacao.nome}</h3>
                                        <p>{avaliacao.notaObtida == null ? "Sem nota lançada" : `Nota: ${avaliacao.notaObtida.toFixed(1)}`}</p>
                                    </div>
                                </div>

                                <div className="estudos-disciplina-meta">
                                    <span>{formatarData(avaliacao.dataPrevista)}</span>
                                    <strong>{avaliacao.disciplinaId ?? "Sem disciplina"}</strong>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>
            </div>
        </section>
    );
}

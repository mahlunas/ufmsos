import {useMemo, useState} from "react";
import {BookOpen, CalendarDays, Check, ClipboardList, FilePenLine, Plus, Save, Trash2, X} from "lucide-react";
import Button from "../components/Button.tsx";
import "./Estudos.css";

type StatusDisciplina = "Em dia" | "Atenção" | "Atrasada";

type Trabalho = {
    id: number;
    titulo: string;
    entrega: string;
    status: "Pendente" | "Entregue" | "Atrasado";
};

type Prova = {
    id: number;
    titulo: string;
    data: string;
    peso: number;
};

type Nota = {
    id: number;
    avaliacao: string;
    valor: number;
    maximo: number;
};

type DataImportante = {
    id: number;
    titulo: string;
    data: string;
};

type Disciplina = {
    id: number;
    nome: string;
    professor: string;
    proximaEntrega: string;
    status: StatusDisciplina;
    trabalhos: Trabalho[];
    provas: Prova[];
    notas: Nota[];
    datasImportantes: DataImportante[];
};

type DisciplinaForm = Pick<Disciplina, "nome" | "professor" | "proximaEntrega" | "status">;

const disciplinasIniciais: Disciplina[] = [
    {
        id: 1,
        nome: "Algoritmos e Programação",
        professor: "Prof. Marina Costa",
        proximaEntrega: "2026-06-18",
        status: "Atenção",
        trabalhos: [
            {id: 1, titulo: "Lista 4 - Recursão", entrega: "2026-06-18", status: "Pendente"},
            {id: 2, titulo: "Projeto prático", entrega: "2026-06-30", status: "Pendente"},
        ],
        provas: [
            {id: 1, titulo: "P2", data: "2026-06-24", peso: 4},
            {id: 2, titulo: "Substitutiva", data: "2026-07-08", peso: 6},
        ],
        notas: [
            {id: 1, avaliacao: "P1", valor: 7.5, maximo: 10},
            {id: 2, avaliacao: "Lista 3", valor: 9, maximo: 10},
        ],
        datasImportantes: [
            {id: 1, titulo: "Aula de revisão", data: "2026-06-20"},
            {id: 2, titulo: "Fechamento de notas", data: "2026-07-12"},
        ],
    },
    {
        id: 2,
        nome: "Banco de Dados",
        professor: "Prof. Roberto Lima",
        proximaEntrega: "2026-06-21",
        status: "Em dia",
        trabalhos: [
            {id: 1, titulo: "Modelo lógico", entrega: "2026-06-21", status: "Entregue"},
            {id: 2, titulo: "Normalização", entrega: "2026-06-27", status: "Pendente"},
        ],
        provas: [
            {id: 1, titulo: "Prova SQL", data: "2026-07-02", peso: 5},
        ],
        notas: [
            {id: 1, avaliacao: "Modelo conceitual", valor: 8.7, maximo: 10},
        ],
        datasImportantes: [
            {id: 1, titulo: "Entrega do DER final", data: "2026-06-27"},
        ],
    },
    {
        id: 3,
        nome: "Cálculo I",
        professor: "Prof. Helena Azevedo",
        proximaEntrega: "2026-06-14",
        status: "Atrasada",
        trabalhos: [
            {id: 1, titulo: "Exercícios de derivadas", entrega: "2026-06-14", status: "Atrasado"},
        ],
        provas: [
            {id: 1, titulo: "P3", data: "2026-06-29", peso: 5},
        ],
        notas: [
            {id: 1, avaliacao: "P1", valor: 6.2, maximo: 10},
            {id: 2, avaliacao: "P2", valor: 5.8, maximo: 10},
        ],
        datasImportantes: [
            {id: 1, titulo: "Monitoria", data: "2026-06-17"},
        ],
    },
];

const formVazio: DisciplinaForm = {
    nome: "",
    professor: "",
    proximaEntrega: "",
    status: "Em dia",
};

function formatarData(data: string) {
    if (!data) {
        return "Sem data";
    }

    return new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    }).format(new Date(`${data}T12:00:00`));
}

function calcularMedia(notas: Nota[]) {
    if (!notas.length) {
        return 0;
    }

    const total = notas.reduce((soma, nota) => soma + (nota.valor / nota.maximo) * 10, 0);
    return total / notas.length;
}

export default function Estudos(){
    const [disciplinas, setDisciplinas] = useState(disciplinasIniciais);
    const [disciplinaSelecionadaId, setDisciplinaSelecionadaId] = useState(disciplinasIniciais[0]?.id);
    const [formAberto, setFormAberto] = useState(false);
    const [editandoId, setEditandoId] = useState<number | null>(null);
    const [form, setForm] = useState<DisciplinaForm>(formVazio);
    const [abaAtiva, setAbaAtiva] = useState<"trabalhos" | "provas" | "notas" | "datas">("trabalhos");

    const disciplinaSelecionada = useMemo(
        () => disciplinas.find((disciplina) => disciplina.id === disciplinaSelecionadaId) ?? disciplinas[0],
        [disciplinas, disciplinaSelecionadaId],
    );

    const totalPendencias = useMemo(
        () => disciplinas.reduce((total, disciplina) => (
            total + disciplina.trabalhos.filter((trabalho) => trabalho.status !== "Entregue").length
        ), 0),
        [disciplinas],
    );

    function abrirNovoCadastro() {
        setForm(formVazio);
        setEditandoId(null);
        setFormAberto(true);
    }

    function abrirEdicao(disciplina: Disciplina) {
        setForm({
            nome: disciplina.nome,
            professor: disciplina.professor,
            proximaEntrega: disciplina.proximaEntrega,
            status: disciplina.status,
        });
        setEditandoId(disciplina.id);
        setFormAberto(true);
    }

    function fecharFormulario() {
        setFormAberto(false);
        setEditandoId(null);
        setForm(formVazio);
    }

    function salvarDisciplina() {
        if (!form.nome.trim() || !form.professor.trim()) {
            return;
        }

        if (editandoId) {
            setDisciplinas((atuais) => atuais.map((disciplina) => (
                disciplina.id === editandoId ? {...disciplina, ...form} : disciplina
            )));
            fecharFormulario();
            return;
        }

        const novaDisciplina: Disciplina = {
            id: Date.now(),
            ...form,
            trabalhos: [],
            provas: [],
            notas: [],
            datasImportantes: [],
        };

        setDisciplinas((atuais) => [novaDisciplina, ...atuais]);
        setDisciplinaSelecionadaId(novaDisciplina.id);
        fecharFormulario();
    }

    function excluirDisciplina(id: number) {
        setDisciplinas((atuais) => {
            const restantes = atuais.filter((disciplina) => disciplina.id !== id);
            if (disciplinaSelecionadaId === id) {
                setDisciplinaSelecionadaId(restantes[0]?.id);
            }
            return restantes;
        });
    }

    return (
        <section className="estudos-page">
            <header className="estudos-header">
                <div>
                    <p className="estudos-kicker">Área acadêmica</p>
                    <h1>Estudos</h1>
                </div>

                <Button className="estudos-primary-button" icon={Plus} variant="primary" onClick={abrirNovoCadastro}>
                    Adicionar disciplina
                </Button>
            </header>

            <div className="estudos-summary">
                <div>
                    <span>{disciplinas.length}</span>
                    <p>Disciplinas</p>
                </div>
                <div>
                    <span>{totalPendencias}</span>
                    <p>Pendências</p>
                </div>
                <div>
                    <span>{disciplinas.filter((disciplina) => disciplina.status === "Atrasada").length}</span>
                    <p>Atrasadas</p>
                </div>
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
                        Professor
                        <input
                            value={form.professor}
                            onChange={(event) => setForm((atual) => ({...atual, professor: event.target.value}))}
                            placeholder="Ex.: Prof. Ana Souza"
                        />
                    </label>

                    <label>
                        Próxima entrega
                        <input
                            type="date"
                            value={form.proximaEntrega}
                            onChange={(event) => setForm((atual) => ({...atual, proximaEntrega: event.target.value}))}
                        />
                    </label>

                    <label>
                        Status
                        <select
                            value={form.status}
                            onChange={(event) => setForm((atual) => ({
                                ...atual,
                                status: event.target.value as StatusDisciplina,
                            }))}
                        >
                            <option>Em dia</option>
                            <option>Atenção</option>
                            <option>Atrasada</option>
                        </select>
                    </label>

                    <div className="estudos-form-actions">
                        <button type="button" className="estudos-icon-button" onClick={salvarDisciplina} title="Salvar">
                            <Save size={18} aria-hidden="true"/>
                        </button>
                        <button type="button" className="estudos-icon-button" onClick={fecharFormulario} title="Cancelar">
                            <X size={18} aria-hidden="true"/>
                        </button>
                    </div>
                </div>
            )}

            <div className="estudos-content">
                <div className="estudos-list" aria-label="Lista de disciplinas">
                    {disciplinas.map((disciplina) => (
                        <article
                            className={`estudos-disciplina ${disciplina.id === disciplinaSelecionada?.id ? "is-active" : ""}`}
                            key={disciplina.id}
                            onClick={() => setDisciplinaSelecionadaId(disciplina.id)}
                        >
                            <div className="estudos-disciplina-main">
                                <div className="estudos-disciplina-icon">
                                    <BookOpen size={20} aria-hidden="true"/>
                                </div>
                                <div>
                                    <h2>{disciplina.nome}</h2>
                                    <p>{disciplina.professor}</p>
                                </div>
                            </div>

                            <div className="estudos-disciplina-meta">
                                <span>
                                    <CalendarDays size={16} aria-hidden="true"/>
                                    {formatarData(disciplina.proximaEntrega)}
                                </span>
                                <strong className={`estudos-status status-${disciplina.status.toLowerCase().replace("ç", "c").replace(" ", "-")}`}>
                                    {disciplina.status}
                                </strong>
                            </div>

                            <div className="estudos-card-actions">
                                <button type="button" onClick={(event) => {
                                    event.stopPropagation();
                                    abrirEdicao(disciplina);
                                }} title="Editar disciplina">
                                    <FilePenLine size={17} aria-hidden="true"/>
                                </button>
                                <button type="button" onClick={(event) => {
                                    event.stopPropagation();
                                    excluirDisciplina(disciplina.id);
                                }} title="Excluir disciplina">
                                    <Trash2 size={17} aria-hidden="true"/>
                                </button>
                            </div>
                        </article>
                    ))}
                </div>

                <aside className="estudos-details">
                    {disciplinaSelecionada ? (
                        <>
                            <div className="estudos-details-header">
                                <div>
                                    <p>Detalhes da disciplina</p>
                                    <h2>{disciplinaSelecionada.nome}</h2>
                                    <span>{disciplinaSelecionada.professor}</span>
                                </div>
                                <strong>{calcularMedia(disciplinaSelecionada.notas).toFixed(1)}</strong>
                            </div>

                            <div className="estudos-tabs" role="tablist" aria-label="Detalhes">
                                <button type="button" className={abaAtiva === "trabalhos" ? "is-active" : ""} onClick={() => setAbaAtiva("trabalhos")}>Trabalhos</button>
                                <button type="button" className={abaAtiva === "provas" ? "is-active" : ""} onClick={() => setAbaAtiva("provas")}>Provas</button>
                                <button type="button" className={abaAtiva === "notas" ? "is-active" : ""} onClick={() => setAbaAtiva("notas")}>Notas</button>
                                <button type="button" className={abaAtiva === "datas" ? "is-active" : ""} onClick={() => setAbaAtiva("datas")}>Datas</button>
                            </div>

                            <div className="estudos-detail-list">
                                {abaAtiva === "trabalhos" && disciplinaSelecionada.trabalhos.map((trabalho) => (
                                    <div className="estudos-detail-row" key={trabalho.id}>
                                        <ClipboardList size={18} aria-hidden="true"/>
                                        <div>
                                            <h3>{trabalho.titulo}</h3>
                                            <p>{formatarData(trabalho.entrega)}</p>
                                        </div>
                                        <span>{trabalho.status}</span>
                                    </div>
                                ))}

                                {abaAtiva === "provas" && disciplinaSelecionada.provas.map((prova) => (
                                    <div className="estudos-detail-row" key={prova.id}>
                                        <CalendarDays size={18} aria-hidden="true"/>
                                        <div>
                                            <h3>{prova.titulo}</h3>
                                            <p>{formatarData(prova.data)}</p>
                                        </div>
                                        <span>Peso {prova.peso}</span>
                                    </div>
                                ))}

                                {abaAtiva === "notas" && disciplinaSelecionada.notas.map((nota) => (
                                    <div className="estudos-detail-row" key={nota.id}>
                                        <Check size={18} aria-hidden="true"/>
                                        <div>
                                            <h3>{nota.avaliacao}</h3>
                                            <p>{nota.maximo.toFixed(1)} pontos</p>
                                        </div>
                                        <span>{nota.valor.toFixed(1)}</span>
                                    </div>
                                ))}

                                {abaAtiva === "datas" && disciplinaSelecionada.datasImportantes.map((data) => (
                                    <div className="estudos-detail-row" key={data.id}>
                                        <CalendarDays size={18} aria-hidden="true"/>
                                        <div>
                                            <h3>{data.titulo}</h3>
                                            <p>{formatarData(data.data)}</p>
                                        </div>
                                    </div>
                                ))}

                                {abaAtiva === "trabalhos" && !disciplinaSelecionada.trabalhos.length && <p className="estudos-empty">Nenhum trabalho cadastrado.</p>}
                                {abaAtiva === "provas" && !disciplinaSelecionada.provas.length && <p className="estudos-empty">Nenhuma prova cadastrada.</p>}
                                {abaAtiva === "notas" && !disciplinaSelecionada.notas.length && <p className="estudos-empty">Nenhuma nota cadastrada.</p>}
                                {abaAtiva === "datas" && !disciplinaSelecionada.datasImportantes.length && <p className="estudos-empty">Nenhuma data cadastrada.</p>}
                            </div>
                        </>
                    ) : (
                        <p className="estudos-empty">Nenhuma disciplina cadastrada.</p>
                    )}
                </aside>
            </div>
        </section>
    )
}

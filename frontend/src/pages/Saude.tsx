import {useEffect, useMemo, useState} from "react";
import {BarChart3, CalendarDays, HeartPulse, Save} from "lucide-react";
import Button from "../components/Button.tsx";
import {apiRequest} from "../lib/api.ts";
import {getCurrentUsuarioId} from "../lib/auth.ts";
import "../styles/Saude.css";

type Humor = {
    id: number;
    emoji: string;
    label: string;
    valor: number;
};

type RegistroHumorApi = {
    id: string;
    nivelHumor: number;
    nivelExaustao: number;
    observacao?: string | null;
    dataRegistro: string;
    estudanteId: string;
};

type RiscoBurnout = "BAIXO" | "MODERADO" | "ALTO" | "CRITICO";

const humores: Humor[] = [
    {id: 5, emoji: "😄", label: "Ótimo", valor: 5},
    {id: 4, emoji: "🙂", label: "Bom", valor: 4},
    {id: 3, emoji: "😐", label: "Neutro", valor: 3},
    {id: 2, emoji: "😔", label: "Ruim", valor: 2},
    {id: 1, emoji: "😫", label: "Péssimo", valor: 1},
];

function hojeIso() {
    return new Date().toISOString().slice(0, 10);
}

function formatarData(data: string) {
    return new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    }).format(new Date(data));
}

function buscarHumor(id: number) {
    return humores.find((humor) => humor.id === id) ?? humores[2];
}

function media(registros: RegistroHumorApi[]) {
    if (!registros.length) {
        return 0;
    }

    const total = registros.reduce((soma, registro) => soma + buscarHumor(registro.nivelHumor).valor, 0);
    return total / registros.length;
}

function inicioPeriodo(dias: number) {
    const data = new Date();
    data.setDate(data.getDate() - dias);
    return data.toISOString().slice(0, 10);
}

export default function Saude(){
    const estudanteId = getCurrentUsuarioId();
    const [registros, setRegistros] = useState<RegistroHumorApi[]>([]);
    const [humorSelecionadoId, setHumorSelecionadoId] = useState(4);
    const [observacao, setObservacao] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [erro, setErro] = useState("");
    const [carregando, setCarregando] = useState(true);
    const [salvando, setSalvando] = useState(false);
    const [risco, setRisco] = useState<RiscoBurnout | null>(null);
    const dataHoje = hojeIso();

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
                const [registrosResponse, riscoResponse] = await Promise.all([
                    apiRequest(`/saude/registros/${estudanteId}`),
                    apiRequest(`/saude/analise/${estudanteId}`),
                ]);

                if (!registrosResponse.ok) {
                    throw new Error("Falha ao carregar registros de saúde.");
                }

                const registrosData = await registrosResponse.json() as RegistroHumorApi[];
                setRegistros(registrosData);

                if (riscoResponse.ok) {
                    const riscoData = await riscoResponse.json() as { riscoBurnout?: RiscoBurnout } | RiscoBurnout;
                    setRisco(typeof riscoData === "string" ? riscoData : riscoData.riscoBurnout ?? null);
                }
            } catch {
                setErro("Não foi possível carregar os dados de saúde.");
            } finally {
                setCarregando(false);
            }
        }

        carregar();
    }, [estudanteId]);

    const registrosOrdenados = useMemo(
        () => [...registros].sort((a, b) => b.dataRegistro.localeCompare(a.dataRegistro)),
        [registros],
    );

    const estatisticas = useMemo(() => {
        const inicioSemana = inicioPeriodo(7);
        const inicioMes = inicioPeriodo(30);
        const semana = registros.filter((registro) => registro.dataRegistro >= inicioSemana);
        const mes = registros.filter((registro) => registro.dataRegistro >= inicioMes);
        const criticos = registros
            .filter((registro) => registro.nivelHumor <= 2 || registro.nivelExaustao >= 4)
            .sort((a, b) => b.dataRegistro.localeCompare(a.dataRegistro));

        return {
            mediaSemanal: media(semana),
            mediaMensal: media(mes),
            diasCriticos: criticos,
        };
    }, [registros]);

    const diasCalendario = useMemo(() => {
        const hoje = new Date(`${dataHoje}T12:00:00`);

        return Array.from({length: 30}, (_, indice) => {
            const data = new Date(hoje);
            data.setDate(hoje.getDate() - (29 - indice));
            const iso = data.toISOString().slice(0, 10);
            const registro = registros.find((item) => item.dataRegistro.slice(0, 10) === iso);
            return {data: iso, registro};
        });
    }, [dataHoje, registros]);

    async function salvarRegistro() {
        if (!estudanteId) {
            setErro("Usuário autenticado sem identificador de estudante.");
            return;
        }

        setSalvando(true);
        setErro("");

        try {
            const response = await apiRequest("/saude/registros", {
                method: "POST",
                json: {
                    nivelHumor: humorSelecionadoId,
                    nivelExaustao: humores.find((humor) => humor.id === humorSelecionadoId)?.valor ?? 3,
                    observacao: observacao.trim() || "Sem observações.",
                    dataRegistro: new Date().toISOString(),
                    estudanteId,
                },
            });

            if (!response.ok) {
                throw new Error("Falha ao salvar registro.");
            }

            const novoRegistro = await response.json() as RegistroHumorApi;
            setRegistros((atuais) => [novoRegistro, ...atuais.filter((registro) => registro.dataRegistro.slice(0, 10) !== dataHoje)]);
            setObservacao("");
            setMensagem("Registro diário salvo.");
        } catch {
            setErro("Não foi possível salvar o registro.");
        } finally {
            setSalvando(false);
        }
    }

    return (
        <section className="saude-page">
            <header className="saude-header">
                <div>
                    <p>Bem-estar</p>
                    <h1>Saúde</h1>
                </div>
            </header>

            {mensagem && <p className="saude-message">{mensagem}</p>}
            {erro && <p className="saude-message">{erro}</p>}

            <div className="saude-content">
                <section className="saude-daily-panel">
                    <div className="saude-section-title">
                        <HeartPulse size={21} aria-hidden="true"/>
                        <div>
                            <h2>Registro diário</h2>
                            <p>{formatarData(dataHoje)}</p>
                        </div>
                    </div>

                    <div className="saude-mood-grid" aria-label="Humor do dia">
                        {humores.map((humor) => (
                            <button
                                className={humorSelecionadoId === humor.id ? "is-active" : ""}
                                type="button"
                                key={humor.id}
                                onClick={() => setHumorSelecionadoId(humor.id)}
                            >
                                <span>{humor.emoji}</span>
                                <strong>{humor.label}</strong>
                            </button>
                        ))}
                    </div>

                    <label className="saude-observation">
                        Observações
                        <textarea
                            value={observacao}
                            onChange={(event) => setObservacao(event.target.value)}
                            placeholder="Como foi seu dia?"
                        />
                    </label>

                    <Button className="saude-save-button" icon={Save} variant="primary" onClick={salvarRegistro} disabled={salvando || carregando}>
                        {salvando ? "Salvando..." : "Salvar registro"}
                    </Button>
                </section>

                <section className="saude-stats-panel">
                    <div className="saude-section-title">
                        <BarChart3 size={21} aria-hidden="true"/>
                        <div>
                            <h2>Estatísticas</h2>
                            <p>Média de humor por período</p>
                        </div>
                    </div>

                    <div className="saude-stats-grid">
                        <article>
                            <p>Média semanal</p>
                            <strong>{estatisticas.mediaSemanal.toFixed(1)}</strong>
                        </article>
                        <article>
                            <p>Média mensal</p>
                            <strong>{estatisticas.mediaMensal.toFixed(1)}</strong>
                        </article>
                        <article>
                            <p>Risco</p>
                            <strong>{risco ?? "N/D"}</strong>
                        </article>
                    </div>

                    <div className="saude-critical-list">
                        {estatisticas.diasCriticos.slice(0, 3).map((registro) => {
                            const humor = buscarHumor(registro.nivelHumor);

                            return (
                                <div key={registro.id}>
                                    <span>{humor.emoji}</span>
                                    <p>{formatarData(registro.dataRegistro)}</p>
                                    <strong>{humor.label}</strong>
                                </div>
                            );
                        })}
                    </div>
                </section>

                <section className="saude-calendar-panel">
                    <div className="saude-section-title">
                        <CalendarDays size={21} aria-hidden="true"/>
                        <div>
                            <h2>Calendário</h2>
                            <p>Últimos 30 dias</p>
                        </div>
                    </div>

                    <div className="saude-calendar">
                        {diasCalendario.map(({data, registro}) => {
                            const humor = registro ? buscarHumor(registro.nivelHumor) : null;

                            return (
                                <div className={registro ? "has-record" : ""} key={data} title={formatarData(data)}>
                                    <span>{new Date(`${data}T12:00:00`).getDate()}</span>
                                    <strong>{humor?.emoji ?? ""}</strong>
                                </div>
                            );
                        })}
                    </div>
                </section>

                <section className="saude-history-panel">
                    <div className="saude-section-title">
                        <CalendarDays size={21} aria-hidden="true"/>
                        <div>
                            <h2>Linha do tempo</h2>
                            <p>Histórico de registros</p>
                        </div>
                    </div>

                    <div className="saude-timeline">
                        {registrosOrdenados.map((registro) => {
                            const humor = buscarHumor(registro.nivelHumor);

                            return (
                                <article key={registro.id}>
                                    <div className="saude-timeline-emoji">{humor.emoji}</div>
                                    <div>
                                        <h3>{humor.label}</h3>
                                        <p>{registro.observacao ?? "Sem observações."}</p>
                                    </div>
                                    <time>{formatarData(registro.dataRegistro)}</time>
                                </article>
                            );
                        })}
                    </div>
                </section>
            </div>
        </section>
    );
}

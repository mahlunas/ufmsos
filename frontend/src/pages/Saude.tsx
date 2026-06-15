import {useMemo, useState} from "react";
import {BarChart3, CalendarDays, HeartPulse, Save} from "lucide-react";
import Button from "../components/Button.tsx";
import "./Saude.css";

type Humor = {
    id: number;
    emoji: string;
    label: string;
    valor: number;
};

type RegistroHumor = {
    id: number;
    data: string;
    humorId: number;
    observacao: string;
};

const humores: Humor[] = [
    {id: 5, emoji: "😄", label: "Ótimo", valor: 5},
    {id: 4, emoji: "🙂", label: "Bom", valor: 4},
    {id: 3, emoji: "😐", label: "Neutro", valor: 3},
    {id: 2, emoji: "😔", label: "Ruim", valor: 2},
    {id: 1, emoji: "😫", label: "Péssimo", valor: 1},
];

const registrosIniciais: RegistroHumor[] = [
    {id: 1, data: "2026-06-15", humorId: 4, observacao: "Dia produtivo, mas com um pouco de cansaço."},
    {id: 2, data: "2026-06-14", humorId: 2, observacao: "Ansiedade antes da prova."},
    {id: 3, data: "2026-06-13", humorId: 3, observacao: "Rotina normal."},
    {id: 4, data: "2026-06-12", humorId: 5, observacao: "Consegui finalizar uma entrega importante."},
    {id: 5, data: "2026-06-11", humorId: 4, observacao: "Bom descanso depois das aulas."},
    {id: 6, data: "2026-06-10", humorId: 1, observacao: "Sono ruim e muitas pendências acumuladas."},
    {id: 7, data: "2026-06-09", humorId: 3, observacao: "Dia estável."},
    {id: 8, data: "2026-06-05", humorId: 2, observacao: "Semana pesada."},
    {id: 9, data: "2026-05-29", humorId: 4, observacao: "Boa evolução nos estudos."},
];

function hojeIso() {
    return new Date().toISOString().slice(0, 10);
}

function formatarData(data: string) {
    return new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    }).format(new Date(`${data}T12:00:00`));
}

function buscarHumor(id: number) {
    return humores.find((humor) => humor.id === id) ?? humores[2];
}

function media(registros: RegistroHumor[]) {
    if (!registros.length) {
        return 0;
    }

    const total = registros.reduce((soma, registro) => soma + buscarHumor(registro.humorId).valor, 0);
    return total / registros.length;
}

function inicioPeriodo(dias: number) {
    const data = new Date();
    data.setDate(data.getDate() - dias);
    return data.toISOString().slice(0, 10);
}

export default function Saude(){
    const [registros, setRegistros] = useState(registrosIniciais);
    const [humorSelecionadoId, setHumorSelecionadoId] = useState(4);
    const [observacao, setObservacao] = useState("");
    const [mensagem, setMensagem] = useState("");
    const dataHoje = hojeIso();

    const registrosOrdenados = useMemo(
        () => [...registros].sort((a, b) => b.data.localeCompare(a.data)),
        [registros],
    );

    const estatisticas = useMemo(() => {
        const inicioSemana = inicioPeriodo(7);
        const inicioMes = inicioPeriodo(30);
        const semana = registros.filter((registro) => registro.data >= inicioSemana);
        const mes = registros.filter((registro) => registro.data >= inicioMes);
        const criticos = registros
            .filter((registro) => buscarHumor(registro.humorId).valor <= 2)
            .sort((a, b) => b.data.localeCompare(a.data));

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
            const registro = registros.find((item) => item.data === iso);
            return {data: iso, registro};
        });
    }, [dataHoje, registros]);

    function salvarRegistro() {
        const novoRegistro: RegistroHumor = {
            id: Date.now(),
            data: dataHoje,
            humorId: humorSelecionadoId,
            observacao: observacao.trim() || "Sem observações.",
        };

        setRegistros((atuais) => [novoRegistro, ...atuais.filter((registro) => registro.data !== dataHoje)]);
        setObservacao("");
        setMensagem("Registro diário salvo.");
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

                    <Button className="saude-save-button" icon={Save} variant="primary" onClick={salvarRegistro}>
                        Salvar registro
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
                            <p>Dias mais críticos</p>
                            <strong>{estatisticas.diasCriticos.length}</strong>
                        </article>
                    </div>

                    <div className="saude-critical-list">
                        {estatisticas.diasCriticos.slice(0, 3).map((registro) => {
                            const humor = buscarHumor(registro.humorId);

                            return (
                                <div key={registro.id}>
                                    <span>{humor.emoji}</span>
                                    <p>{formatarData(registro.data)}</p>
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
                            const humor = registro ? buscarHumor(registro.humorId) : null;

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
                            const humor = buscarHumor(registro.humorId);

                            return (
                                <article key={registro.id}>
                                    <div className="saude-timeline-emoji">{humor.emoji}</div>
                                    <div>
                                        <h3>{humor.label}</h3>
                                        <p>{registro.observacao}</p>
                                    </div>
                                    <time>{formatarData(registro.data)}</time>
                                </article>
                            );
                        })}
                    </div>
                </section>
            </div>
        </section>
    )
}

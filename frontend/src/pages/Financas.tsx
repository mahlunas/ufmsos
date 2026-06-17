import {useMemo, useState} from "react";
import {ArrowDownCircle, ArrowUpCircle, Landmark, Plus, ReceiptText, WalletCards} from "lucide-react";
import {Chart} from "@highcharts/react";
import {ColumnSeries} from "@highcharts/react/series/Column";
import AppPanel from "../components/AppPanel.tsx";
import Button from "../components/Button.tsx";
import CategoryPieChart from "../components/CategoryPieChart.tsx";
import DataList from "../components/DataList.tsx";
import MetricCard from "../components/MetricCard.tsx";
import PageHeader from "../components/PageHeader.tsx";
import SectionTitle from "../components/SectionTitle.tsx";
import "../styles/Financas.css";

type TipoTransacao = "receita" | "despesa";

type Transacao = {
    id: number;
    descricao: string;
    categoria: string;
    data: string;
    valor: number;
    tipo: TipoTransacao;
};

type TransacaoForm = {
    descricao: string;
    categoria: string;
    data: string;
    valor: string;
};

const transacoesIniciais: Transacao[] = [
    {
        id: 1,
        descricao: "Bolsa Permanência",
        categoria: "Auxílio estudantil",
        data: "2026-06-05",
        valor: 700,
        tipo: "receita",
    },
    {
        id: 2,
        descricao: "Aluguel",
        categoria: "Moradia",
        data: "2026-06-07",
        valor: 520,
        tipo: "despesa",
    },
    {
        id: 3,
        descricao: "Mercado",
        categoria: "Alimentação",
        data: "2026-06-10",
        valor: 186.45,
        tipo: "despesa",
    },
    {
        id: 4,
        descricao: "Internet",
        categoria: "Serviços",
        data: "2026-06-12",
        valor: 89.9,
        tipo: "despesa",
    },
];

const formVazio: TransacaoForm = {
    descricao: "",
    categoria: "",
    data: "",
    valor: "",
};

const coresCategorias = ["#176b5d", "#2456a6", "#8a5b00", "#6042a6", "#a51f24", "#41516a"];

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

export default function Financas(){
    const [transacoes, setTransacoes] = useState(transacoesIniciais);
    const [formAberto, setFormAberto] = useState<TipoTransacao | null>(null);
    const [form, setForm] = useState<TransacaoForm>(formVazio);

    const resumo = useMemo(() => {
        const receitas = transacoes
            .filter((transacao) => transacao.tipo === "receita")
            .reduce((total, transacao) => total + transacao.valor, 0);

        const despesas = transacoes
            .filter((transacao) => transacao.tipo === "despesa")
            .reduce((total, transacao) => total + transacao.valor, 0);

        return {
            receitas,
            despesas,
            saldo: receitas - despesas,
            economia: receitas * 0.2 - despesas * 0.05,
        };
    }, [transacoes]);

    const gastosPorCategoria = useMemo(() => {
        const categorias = transacoes
            .filter((transacao) => transacao.tipo === "despesa")
            .reduce<Record<string, number>>((acc, transacao) => {
                acc[transacao.categoria] = (acc[transacao.categoria] ?? 0) + transacao.valor;
                return acc;
            }, {});

        return Object.entries(categorias)
            .map(([label, value], index) => ({
                label,
                value,
                color: coresCategorias[index % coresCategorias.length],
            }))
            .sort((a, b) => b.value - a.value);
    }, [transacoes]);

    function abrirFormulario(tipo: TipoTransacao) {
        setForm(formVazio);
        setFormAberto(tipo);
    }

    function salvarTransacao() {
        const valor = Number(form.valor.replace(",", "."));

        if (!formAberto || !form.descricao.trim() || !form.categoria.trim() || !form.data || !valor) {
            return;
        }

        const novaTransacao: Transacao = {
            id: Date.now(),
            descricao: form.descricao,
            categoria: form.categoria,
            data: form.data,
            valor,
            tipo: formAberto,
        };

        setTransacoes((atuais) => [novaTransacao, ...atuais]);
        setForm(formVazio);
        setFormAberto(null);
    }

    return (
        <section className="financas-page">
            <PageHeader
                eyebrow="Controle financeiro"
                title="Finanças"
                actions={(
                    <>
                        <Button icon={Plus} variant="primary" onClick={() => abrirFormulario("receita")}>Nova receita</Button>
                        <Button icon={Plus} variant="danger" onClick={() => abrirFormulario("despesa")}>Nova despesa</Button>
                    </>
                )}
            />

            <div className="financas-cards">
                <MetricCard icon={WalletCards} label="Saldo Atual" value={formatarMoeda(resumo.saldo)} tone={resumo.saldo >= 0 ? "green" : "red"}/>
                <MetricCard icon={ArrowUpCircle} label="Receitas do Mês" value={formatarMoeda(resumo.receitas)} tone="green"/>
                <MetricCard icon={ArrowDownCircle} label="Despesas do Mês" value={formatarMoeda(resumo.despesas)} tone="red"/>
                <MetricCard icon={Landmark} label="Economia Prevista" value={formatarMoeda(resumo.economia)} tone="yellow"/>
            </div>

            {formAberto && (
                <AppPanel className="financas-form app-panel-pad">
                    <label>
                        Descrição
                        <input
                            value={form.descricao}
                            onChange={(event) => setForm((atual) => ({...atual, descricao: event.target.value}))}
                            placeholder={formAberto === "receita" ? "Ex.: Bolsa Permanência" : "Ex.: Mercado"}
                        />
                    </label>

                    <label>
                        Categoria
                        <input
                            value={form.categoria}
                            onChange={(event) => setForm((atual) => ({...atual, categoria: event.target.value}))}
                            placeholder={formAberto === "receita" ? "Ex.: Auxílio" : "Ex.: Alimentação"}
                        />
                    </label>

                    <label>
                        Data
                        <input
                            type="date"
                            value={form.data}
                            onChange={(event) => setForm((atual) => ({...atual, data: event.target.value}))}
                        />
                    </label>

                    <label>
                        Valor
                        <input
                            inputMode="decimal"
                            value={form.valor}
                            onChange={(event) => setForm((atual) => ({...atual, valor: event.target.value}))}
                            placeholder="0,00"
                        />
                    </label>

                    <div className="financas-form-actions">
                        <Button variant="primary" onClick={salvarTransacao}>Salvar</Button>
                        <Button onClick={() => setFormAberto(null)}>Cancelar</Button>
                    </div>
                </AppPanel>
            )}

            <div className="financas-content">
                <AppPanel className="financas-chart-panel app-panel-pad">
                    <SectionTitle title="Entradas x Saídas" subtitle="Comparativo do mês atual"/>

                    <div className="financas-chart-shell">
                        <Chart
                            containerProps={{className: "financas-chart-canvas"}}
                            height={260}
                            options={{
                                chart: {
                                    type: "column",
                                    backgroundColor: "transparent",
                                    spacing: [0, 0, 0, 0],
                                },
                                credits: {
                                    enabled: false,
                                },
                                title: {
                                    text: "",
                                },
                                legend: {
                                    enabled: false,
                                },
                                tooltip: {
                                    enabled: true,
                                },
                                xAxis: {
                                    categories: ["Entradas", "Saídas"],
                                    lineWidth: 0,
                                    tickLength: 0,
                                    labels: {
                                        style: {
                                            color: "#66758a",
                                            fontSize: "12px",
                                            fontWeight: "800",
                                        },
                                    },
                                },
                                yAxis: {
                                    visible: false,
                                    title: {
                                        text: "",
                                    },
                                },
                                plotOptions: {
                                    column: {
                                        borderWidth: 0,
                                        borderRadius: 8,
                                        groupPadding: 0.28,
                                        pointPadding: 0.08,
                                        maxPointWidth: 52,
                                    },
                                },
                            }}
                        >
                            <ColumnSeries
                                name="Fluxo financeiro"
                                data={[
                                    {y: resumo.receitas, color: "#176b5d"},
                                    {y: resumo.despesas, color: "#a51f24"},
                                ]}
                            />
                        </Chart>

                        <div className="financas-chart-summary" aria-label="Resumo do gráfico">
                            <div className="financas-chart-summary-row">
                                <span className="financas-chart-key income"/>
                                <span>Entradas</span>
                                <strong>{formatarMoeda(resumo.receitas)}</strong>
                            </div>

                            <div className="financas-chart-summary-row">
                                <span className="financas-chart-key expense"/>
                                <span>Saídas</span>
                                <strong>{formatarMoeda(resumo.despesas)}</strong>
                            </div>
                        </div>
                    </div>
                </AppPanel>

                <AppPanel className="financas-category-panel app-panel-pad">
                    <SectionTitle title="Gastos por categoria" subtitle="Distribuição das despesas"/>
                    <CategoryPieChart items={gastosPorCategoria} totalLabel={formatarMoeda(resumo.despesas)}/>
                </AppPanel>

                <AppPanel className="financas-transactions-panel app-panel-pad">
                    <SectionTitle title="Últimas transações" subtitle={`${transacoes.length} lançamentos cadastrados`}/>

                    <DataList
                        items={transacoes.map((transacao) => ({
                            id: transacao.id,
                            title: transacao.descricao,
                            detail: `${transacao.categoria} · ${formatarData(transacao.data)}`,
                            meta: `${transacao.tipo === "receita" ? "+" : "-"} ${formatarMoeda(transacao.valor)}`,
                            icon: ReceiptText,
                            tone: transacao.tipo === "receita" ? "green" : "red",
                        }))}
                    />
                </AppPanel>
            </div>
        </section>
    )
}

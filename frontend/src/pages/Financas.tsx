import {useEffect, useMemo, useState} from "react";
import {ArrowDownCircle, ArrowUpCircle, Landmark, WalletCards} from "lucide-react";
import {Chart} from "@highcharts/react";
import {ColumnSeries} from "@highcharts/react/series/Column";
import AppPanel from "../components/AppPanel.tsx";
import CategoryPieChart from "../components/CategoryPieChart.tsx";
import MetricCard from "../components/MetricCard.tsx";
import PageHeader from "../components/PageHeader.tsx";
import SectionTitle from "../components/SectionTitle.tsx";
import {apiRequest} from "../lib/api.ts";
import {getCurrentUsuarioId} from "../lib/auth.ts";
import "../styles/Financas.css";

type ResumoFinanceiroApi = {
    estudanteId: string;
    saldoTotal: number;
    totalReceitas: number;
    totalDespesas: number;
    gastosPorCategoria: Record<string, number>;
};

type CategoriaFinanceiraApi = {
    id: string;
    nome: string;
    corIcone?: string | null;
};

const coresCategorias = ["#176b5d", "#2456a6", "#8a5b00", "#6042a6", "#a51f24", "#41516a"];

function formatarMoeda(valor: number) {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(valor);
}

export default function Financas(){
    const estudanteId = getCurrentUsuarioId();
    const [resumo, setResumo] = useState<ResumoFinanceiroApi | null>(null);
    const [categorias, setCategorias] = useState<CategoriaFinanceiraApi[]>([]);
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
                const [resumoResponse, categoriasResponse] = await Promise.all([
                    apiRequest(`/financeiro/resumo/${estudanteId}`),
                    apiRequest("/financeiro/categorias"),
                ]);

                if (!resumoResponse.ok || !categoriasResponse.ok) {
                    throw new Error("Falha ao carregar finanças.");
                }

                setResumo(await resumoResponse.json() as ResumoFinanceiroApi);
                setCategorias(await categoriasResponse.json() as CategoriaFinanceiraApi[]);
            } catch {
                setErro("Não foi possível carregar os dados financeiros.");
            } finally {
                setCarregando(false);
            }
        }

        carregar();
    }, [estudanteId]);

    const gastosPorCategoria = useMemo(() => {
        if (!resumo) {
            return [];
        }

        return Object.entries(resumo.gastosPorCategoria)
            .map(([label, value], index) => ({
                label,
                value: Number(value),
                color: categorias.find((categoria) => categoria.nome === label)?.corIcone ?? coresCategorias[index % coresCategorias.length],
            }))
            .sort((a, b) => b.value - a.value);
    }, [categorias, resumo]);

    return (
        <section className="financas-page">
            <PageHeader
                eyebrow="Controle financeiro"
                title="Finanças"
            />

            {erro && <p className="saude-message">{erro}</p>}

            <div className="financas-cards">
                <MetricCard icon={WalletCards} label="Saldo Atual" value={formatarMoeda(resumo?.saldoTotal ?? 0)} tone={(resumo?.saldoTotal ?? 0) >= 0 ? "green" : "red"}/>
                <MetricCard icon={ArrowUpCircle} label="Receitas do Mês" value={formatarMoeda(resumo?.totalReceitas ?? 0)} tone="green"/>
                <MetricCard icon={ArrowDownCircle} label="Despesas do Mês" value={formatarMoeda(resumo?.totalDespesas ?? 0)} tone="red"/>
                <MetricCard icon={Landmark} label="Categorias" value={gastosPorCategoria.length} tone="yellow"/>
            </div>

            <div className="financas-content">
                <AppPanel className="financas-chart-panel app-panel-pad">
                    <SectionTitle title="Entradas x Saídas" subtitle="Resumo real do banco"/>

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
                            <ColumnSeries data={[{y: resumo?.totalReceitas ?? 0, color: "#176b5d"}, {y: resumo?.totalDespesas ?? 0, color: "#a51f24"}]}/>
                        </Chart>

                        <div className="financas-chart-summary" aria-label="Resumo do gráfico">
                            <div className="financas-chart-summary-row">
                                <span className="financas-chart-key income"/>
                                <span>Entradas</span>
                                <strong>{formatarMoeda(resumo?.totalReceitas ?? 0)}</strong>
                            </div>

                            <div className="financas-chart-summary-row">
                                <span className="financas-chart-key expense"/>
                                <span>Saídas</span>
                                <strong>{formatarMoeda(resumo?.totalDespesas ?? 0)}</strong>
                            </div>
                        </div>
                    </div>
                </AppPanel>

                <AppPanel className="financas-category-panel app-panel-pad">
                    <SectionTitle title="Gastos por categoria" subtitle="Distribuição real das despesas"/>
                    {carregando ? <p>Carregando categorias...</p> : <CategoryPieChart items={gastosPorCategoria} totalLabel={formatarMoeda(resumo?.totalDespesas ?? 0)}/>}
                </AppPanel>
            </div>
        </section>
    );
}

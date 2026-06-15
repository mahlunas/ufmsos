import {useMemo, useState} from "react";
import {ArrowDownCircle, ArrowUpCircle, Landmark, Plus, ReceiptText, WalletCards} from "lucide-react";
import "./Financas.css";

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

    const maiorValorGrafico = Math.max(resumo.receitas, resumo.despesas, 1);

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
            <header className="financas-header">
                <div>
                    <p>Controle financeiro</p>
                    <h1>Finanças</h1>
                </div>

                <div className="financas-actions">
                    <button type="button" className="financas-income-button" onClick={() => abrirFormulario("receita")}>
                        <Plus size={18} aria-hidden="true"/>
                        <span>Nova receita</span>
                    </button>
                    <button type="button" className="financas-expense-button" onClick={() => abrirFormulario("despesa")}>
                        <Plus size={18} aria-hidden="true"/>
                        <span>Nova despesa</span>
                    </button>
                </div>
            </header>

            <div className="financas-cards">
                <article className="financas-card">
                    <WalletCards size={22} aria-hidden="true"/>
                    <p>Saldo Atual</p>
                    <strong>{formatarMoeda(resumo.saldo)}</strong>
                </article>

                <article className="financas-card">
                    <ArrowUpCircle size={22} aria-hidden="true"/>
                    <p>Receitas do Mês</p>
                    <strong>{formatarMoeda(resumo.receitas)}</strong>
                </article>

                <article className="financas-card">
                    <ArrowDownCircle size={22} aria-hidden="true"/>
                    <p>Despesas do Mês</p>
                    <strong>{formatarMoeda(resumo.despesas)}</strong>
                </article>

                <article className="financas-card">
                    <Landmark size={22} aria-hidden="true"/>
                    <p>Economia Prevista</p>
                    <strong>{formatarMoeda(resumo.economia)}</strong>
                </article>
            </div>

            {formAberto && (
                <div className="financas-form">
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
                        <button type="button" onClick={salvarTransacao}>Salvar</button>
                        <button type="button" onClick={() => setFormAberto(null)}>Cancelar</button>
                    </div>
                </div>
            )}

            <div className="financas-content">
                <section className="financas-chart-panel">
                    <div className="financas-section-title">
                        <h2>Entradas x Saídas</h2>
                        <p>Comparativo do mês atual</p>
                    </div>

                    <div className="financas-chart">
                        <div className="financas-chart-row">
                            <span>Entradas</span>
                            <div className="financas-chart-track">
                                <div
                                    className="financas-chart-bar income"
                                    style={{width: `${(resumo.receitas / maiorValorGrafico) * 100}%`}}
                                />
                            </div>
                            <strong>{formatarMoeda(resumo.receitas)}</strong>
                        </div>

                        <div className="financas-chart-row">
                            <span>Saídas</span>
                            <div className="financas-chart-track">
                                <div
                                    className="financas-chart-bar expense"
                                    style={{width: `${(resumo.despesas / maiorValorGrafico) * 100}%`}}
                                />
                            </div>
                            <strong>{formatarMoeda(resumo.despesas)}</strong>
                        </div>
                    </div>
                </section>

                <section className="financas-transactions-panel">
                    <div className="financas-section-title">
                        <h2>Últimas transações</h2>
                        <p>{transacoes.length} lançamentos cadastrados</p>
                    </div>

                    <div className="financas-transactions">
                        {transacoes.map((transacao) => (
                            <article className="financas-transaction" key={transacao.id}>
                                <div className={`financas-transaction-icon ${transacao.tipo}`}>
                                    <ReceiptText size={18} aria-hidden="true"/>
                                </div>

                                <div>
                                    <h3>{transacao.descricao}</h3>
                                    <p>{transacao.categoria} · {formatarData(transacao.data)}</p>
                                </div>

                                <strong className={transacao.tipo}>
                                    {transacao.tipo === "receita" ? "+" : "-"} {formatarMoeda(transacao.valor)}
                                </strong>
                            </article>
                        ))}
                    </div>
                </section>
            </div>
        </section>
    )
}

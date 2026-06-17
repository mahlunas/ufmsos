import {Chart} from "@highcharts/react";
import {PieSeries} from "@highcharts/react/series/Pie";
import type {ChartOptions} from "@highcharts/react";
import "./CategoryPieChart.css";

type CategoryPieChartItem = {
    label: string;
    value: number;
    color: string;
};

type CategoryPieChartProps = {
    items: CategoryPieChartItem[];
    totalLabel: string;
};

export default function CategoryPieChart({items, totalLabel}: CategoryPieChartProps) {
    const total = items.reduce((sum, item) => sum + item.value, 0);

    if (!items.length || total <= 0) {
        return <p className="category-pie-empty">Nenhuma despesa por categoria.</p>;
    }

    const options: ChartOptions = {
        chart: {
            type: "pie",
            backgroundColor: "transparent",
            spacing: [0, 0, 0, 0],
        },
        credits: {
            enabled: false,
        },
        title: {
            text: "",
        },
        tooltip: {
            enabled: true,
        },
        legend: {
            enabled: false,
        },
        plotOptions: {
            pie: {
                borderWidth: 0,
                innerSize: "68%",
                dataLabels: {
                    enabled: false,
                },
            },
        },
    };

    const pieData = items.map((item) => ({
        name: item.label,
        y: item.value,
        color: item.color,
    }));

    return (
        <div className="category-pie">
            <div className="category-pie-chart" aria-label="Gastos por categoria">
                <Chart containerProps={{className: "category-pie-chart-canvas"}} options={options} height={260}>
                    <PieSeries data={pieData}/>
                </Chart>
                <div className="category-pie-center">
                    <span>Total</span>
                    <strong>{totalLabel}</strong>
                </div>
            </div>

            <div className="category-pie-legend">
                {items.map((item) => (
                    <div key={item.label}>
                        <span style={{background: item.color}}/>
                        <p>{item.label}</p>
                        <strong>{Math.round((item.value / total) * 100)}%</strong>
                    </div>
                ))}
            </div>
        </div>
    );
}

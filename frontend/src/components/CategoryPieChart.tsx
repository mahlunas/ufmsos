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

function buildSlicePath(startPercent: number, endPercent: number) {
    const startAngle = startPercent * Math.PI * 2 - Math.PI / 2;
    const endAngle = endPercent * Math.PI * 2 - Math.PI / 2;
    const largeArc = endPercent - startPercent > 0.5 ? 1 : 0;
    const startX = 50 + 42 * Math.cos(startAngle);
    const startY = 50 + 42 * Math.sin(startAngle);
    const endX = 50 + 42 * Math.cos(endAngle);
    const endY = 50 + 42 * Math.sin(endAngle);

    return `M 50 50 L ${startX} ${startY} A 42 42 0 ${largeArc} 1 ${endX} ${endY} Z`;
}

export default function CategoryPieChart({items, totalLabel}: CategoryPieChartProps) {
    const total = items.reduce((sum, item) => sum + item.value, 0);

    if (!items.length || total <= 0) {
        return <p className="category-pie-empty">Nenhuma despesa por categoria.</p>;
    }

    const slices = items.reduce<Array<CategoryPieChartItem & {start: number; end: number}>>((acc, item) => {
        const previousEnd = acc.at(-1)?.end ?? 0;
        const end = previousEnd + item.value / total;
        return [...acc, {...item, start: previousEnd, end}];
    }, []);

    return (
        <div className="category-pie">
            <div className="category-pie-chart" aria-label="Gastos por categoria">
                <svg viewBox="0 0 100 100" role="img">
                    {slices.map((item) => (
                        <path d={buildSlicePath(item.start, item.end)} fill={item.color} key={item.label}/>
                    ))}
                    <circle cx="50" cy="50" r="22" fill="#ffffff"/>
                </svg>
                <div>
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

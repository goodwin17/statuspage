import { Chart as ChartJS } from "chart.js/auto";
import { Line } from "react-chartjs-2";

export default function ResponseTimeChart({ data, height = 240, width = '100%' }) {

    const chartData = {
        datasets: [
            {
                data: data,
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
        maintainAspectRatio: false
    };

    return (
        <div>
            <Line
                data={chartData}
                options={options}
                width={width}
                height={height}
            />
        </div>
    );
}

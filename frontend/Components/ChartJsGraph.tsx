'use client'

import { useEffect, useRef } from 'react';
import { Chart, LinearScale, CategoryScale, LineElement, LineController, PointElement } from 'chart.js';

Chart.register(LineController, LinearScale, CategoryScale, PointElement, LineElement)

const ChartJsGraph = () => {
    const chartRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        if (chartRef && chartRef.current) {
            const chartInstance = new Chart(chartRef.current, {
                type: 'line',
                data: {
                    labels: [],
                    datasets: [{
                        label: 'Dynamic Sine Wave',
                        data: [],
                        borderColor: 'rgba(75, 192, 192, 1)',
                        fill: false
                    }]
                },
                options: {
                    scales: {
                        x: {
                            type: 'linear',
                            position: 'bottom'
                        }
                    }
                }
            }as any);

            let x = 0;
            setInterval(() => {
                x += 0.1;

                const labels = chartInstance.data.labels as string[];
                const datasetData = chartInstance.data.datasets?.[0].data as number[];

                labels.push(x.toFixed(2));
                datasetData?.push(Math.sin(x));

                if (labels.length > 100) {
                    labels.shift();
                    datasetData?.shift()
                }
                    
                    chartInstance.update();
                }, 100);
        }
    }, []);

    return <canvas ref={chartRef} />;
}

export default ChartJsGraph;

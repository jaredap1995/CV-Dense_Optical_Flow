'use client'
import Plotly from 'plotly.js';
import createPlotlyComponent from 'react-plotly.js/factory';
import styles from './graph.module.scss'
const Plot = createPlotlyComponent(Plotly);

import { useState, useEffect } from 'react';
import { error } from 'console';

const PlotlyGraph = ()=> {
    const [ xData, setxData ] = useState <Number[]> ([]);
    const [yData, setyData] = useState<Number[]>([]);

    useEffect(() => {

        const eventSource = new EventSource('http://127.0.0.1:8000/sse/');
        eventSource.onmessage = (event) => {
                const data = JSON.parse(event.data)

                setxData(prevXData => [...prevXData, data.x]);
                setyData(prevYData => [...prevYData, data.y]);

                const maxDataPoints = 100;
                if (xData.length > maxDataPoints) {
                    setxData(prevXData => prevXData.slice(-maxDataPoints));
                    setyData(prevYData => prevYData.slice(-maxDataPoints))
                }
        }

        eventSource.onerror = (event) => {
            console.error('EventSource failed: ', event);
            eventSource.close();
        }


        return () => {
            eventSource.close();
        }
    }, [xData]);

    return (
        <Plot
            data = {[
                {
                    x: xData as Plotly.Datum[],
                    y: yData as Plotly.Datum[],
                    type: 'scatter',
                    mode: 'lines',
                    line: {color: 'blue'}
                }
            ]}
            layout = {{width: 680, height: 540, title: 'Signal'}}
            className={styles.graph}
        />
    )
}

export default PlotlyGraph
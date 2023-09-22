'use client'
import Plotly from 'plotly.js';
import createPlotlyComponent from 'react-plotly.js/factory';
import styles from './graph.module.scss'
const Plot = createPlotlyComponent(Plotly);

import { useState, useEffect } from 'react';

const PlotlyGraph = ()=> {
    const [ xData, setxData ] = useState <Number[]> ([]);
    const [yData, setyData] = useState<Number[]>([]);

    useEffect(() => {
        let x = 0;
        setInterval(()=> {
            x+=0.1;
            setxData(prev => [...prev, x])
            setyData(prev => [...prev, Math.sin(x)])

            if(xData.length > 100) {
                setxData(prev => prev.slice(1));
                setyData(prev => prev.slice(1));
            }
        }, 100)
    }, [])

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
            layout = {{width: 680, height: 540, title: 'Dynamic Sine Wave'}}
            className={styles.graph}
        />
    )
}

export default PlotlyGraph
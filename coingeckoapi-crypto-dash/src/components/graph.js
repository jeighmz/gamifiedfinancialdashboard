// graphtest.js
import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const GraphTest = (id) => {
    id = id.id;
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        fetch("https://api.coingecko.com/api/v3/coins/"+id+"/market_chart?vs_currency=usd&days=14&interval=daily")
            .then(response => response.json())
            .then(data => {
                const mappedData = data.prices.map(item => ({
                    name: new Date(item[0]).toLocaleDateString(),
                    value: item[1]
                }));
                setChartData(mappedData);
            })
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    const dataMin = Math.min(...chartData.map(item => item.value));
    const dataMax = Math.max(...chartData.map(item => item.value));
    return (
        <div style={{ position: 'relative', width: '100%', top:'0px', boxShadow: 'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset' }}>
            <div style={{ position: 'relative', width: '100%'}}>
                <LineChart
                    width={window.innerWidth*0.7}
                    height={150}
                    data={chartData}
                    margin={{ top: 25, right: 0, left: 0, bottom: 5 }}
                >
                    <XAxis dataKey="name" hide={true}/>
                    <YAxis domain={[dataMin-0.01*dataMin, dataMax+0.01*dataMax]} hide={true}/>
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
            </div>
        </div>
    );
};

export default GraphTest;

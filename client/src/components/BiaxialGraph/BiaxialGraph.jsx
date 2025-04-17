import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import { raw } from '../../TestData/rawData'
import { convertToChartData } from '../../utils/convertToChartData'
function BiaxialGraph() {
    const sampleData = [
        { date: '3/30/2024', price: 69702, marketCap: 1370247487960, volume: 16408802301 },
        { date: '3/31/2024', price: 71246, marketCap: 1401370211582, volume: 19723005998 },
        { date: '4/1/2024', price: 68887, marketCap: 1355701979725, volume: 30137418199 }
      ];
      const data = [
        {
          name: 'Page A',
          uv: 4000,
          pv: 2400,
          amt: 2400,
        },
        {
          name: 'Page B',
          uv: 3000,
          pv: 1398,
          amt: 2210,
        },
        {
          name: 'Page C',
          uv: 2000,
          pv: 9800,
          amt: 2290,
        },
        {
          name: 'Page D',
          uv: 2780,
          pv: 3908,
          amt: 2000,
        },
        {
          name: 'Page E',
          uv: 1890,
          pv: 4800,
          amt: 2181,
        },
        {
          name: 'Page F',
          uv: 2390,
          pv: 3800,
          amt: 2500,
        },
        {
          name: 'Page G',
          uv: 3490,
          pv: 4300,
          amt: 2100,
        },
      ];
        
      
    const formattedData = convertToChartData(raw)
  return (
    <ResponsiveContainer width="100%" height="100%">
    <LineChart
      width={500}
      height={300}
      data={formattedData}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis yAxisId="price" />
      <YAxis yAxisId="marketCap" orientation="right" />
      <Tooltip />
      <Legend />
      <Line yAxisId="price" type="monotone" dataKey="price" stroke="#8884d8" activeDot={{ r: 8 }} />
      <Line yAxisId="marketCap" type="monotone" dataKey="marketCap" stroke="#82ca9d" />
    </LineChart>
  </ResponsiveContainer>
  )
}

export default BiaxialGraph

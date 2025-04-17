import React from 'react';
import {
  LineChart,ComposedChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar
} from 'recharts';

import { raw } from '../../TestData/rawData';
import { convertToChartData } from '../../utils/convertToChartData';

function BiaxialGraph() {
  const formattedData = convertToChartData(raw);

  return (
    <div style={{ width: '100%', height: '800px' }}>
      {/* <div style={{ height: '50%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={formattedData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="price" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Volume Chart */}
      {/* <div style={{ height: '50%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={formattedData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="volume" fill="#ffc658" />
          </LineChart>
        </ResponsiveContainer>
      </div> */}
      <div>
      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart data={formattedData}>
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="date" />
          <YAxis yAxisId="left" orientation="left" stroke="#ff7300" />
          <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
          <Tooltip />
          <Legend />
          <Bar yAxisId="right" dataKey="volume" barSize={20} fill="#82ca9d" />
          <Line yAxisId="left" type="monotone" dataKey="marketCap" stroke="#ff7300" dot={false} />
        </ComposedChart>
      </ResponsiveContainer>

      </div>
      
    </div>
  );
}

export default BiaxialGraph;

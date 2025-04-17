import { ResponsiveContainer, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ComposedChart } from 'recharts';

const VolumeMarketCapChart = ({ data }) => {
  return (
    <div style={{ width: '100%', height: 400 }}>
      <ResponsiveContainer>
        <ComposedChart data={data}>
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="date" tickFormatter={(str) => str.split('T')[0]} />
          <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
          <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
          <Tooltip />
          <Legend />
          <Bar yAxisId="left" dataKey="volume" fill="#8884d8" name="Volume" />
          <Line yAxisId="right" type="monotone" dataKey="marketCap" stroke="#82ca9d" name="Market Cap" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VolumeMarketCapChart;

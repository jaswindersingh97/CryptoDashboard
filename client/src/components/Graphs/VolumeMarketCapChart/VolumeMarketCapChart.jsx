import { ResponsiveContainer, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ComposedChart } from 'recharts';

const VolumeMarketCapChart = ({ data }) => {
  return (
    <div style={{ 
      width: '100%', 
      height: '400px',
      position: 'relative', // Added for better positioning
      margin: '0 auto', // Center the chart
    }}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }} // Added margins
        >
          <CartesianGrid stroke="#f5f5f5" strokeDasharray="3 3" />
          <XAxis 
            dataKey="date" 
            tickFormatter={(str) => str.split('T')[0]}
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            yAxisId="left" 
            orientation="left" 
            stroke="#8884d8"
            tick={{ fontSize: 12 }}
            width={80}
          />
          <YAxis 
            yAxisId="right" 
            orientation="right" 
            stroke="#82ca9d"
            tick={{ fontSize: 12 }}
            width={80} // Fixed width for right axis
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #ddd',
              borderRadius: '4px',
            }}
          />
          <Legend 
            wrapperStyle={{
              paddingTop: '20px'
            }}
          />
          <Bar 
            yAxisId="left" 
            dataKey="volume" 
            fill="#8884d8" 
            name="Volume" 
            barSize={20}
          />
          <Line 
            yAxisId="right" 
            type="monotone" 
            dataKey="marketCap" 
            stroke="#82ca9d" 
            name="Market Cap"
            strokeWidth={2}
            dot={false}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VolumeMarketCapChart;
import React , {useMemo, useState} from 'react';
import { useParams } from 'react-router-dom';
import { useMarketChartData } from '../../hooks/useMarketChartData';
import {convertToChartData} from './../../utils/convertToChartData2';
import VolumeMarketCapChart from '../../components/Graphs/VolumeMarketCapChart/VolumeMarketCapChart';
import CandleChart from '../../components/Graphs/CandleChart/CandleChart';
const Dashboard = () => {
  const { id } = useParams(); // Grab the coin's id from the URL
  const [period, setPeriod] = useState(1)
  const { data, isLoading, error } = useMarketChartData(id, 'usd', period);
  const transformedData = useMemo(() => {
    return data ? convertToChartData(data, period) : [];
  }, [data, period]);
  
  return (
    <div>
      <h1>Coin Detail: {id}</h1>
      <VolumeMarketCapChart data={transformedData}/>
      {/* <CandleChart /> */}
      <CandleChart data={transformedData} />

      {/* Render the coin details based on the id */}
    </div>
  );
};

export default Dashboard;

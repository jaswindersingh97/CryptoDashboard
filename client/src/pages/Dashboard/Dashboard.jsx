import React , {useMemo, useState} from 'react';
import { Link, useParams } from 'react-router-dom';
import { useMarketChartData } from '../../hooks/useMarketChartData';
import { useCoinById } from '../../hooks/useCoinById';
import {convertToChartData} from './../../utils/convertToChartData2';
import VolumeMarketCapChart from '../../components/Graphs/VolumeMarketCapChart/VolumeMarketCapChart';
import CandleChart from '../../components/Graphs/CandleChart/CandleChart';
import './Dashboard.css'
import TopLAndG from '../../components/TopLAndG/TopLAndG';
import DescriptionCard from '../../components/DescriptionCard/DescriptionCard';
const Dashboard = () => {
  const { id } = useParams(); // Grab the coin's id from the URL
  const [days, setdays] = useState(1)
  const { data, isLoading, error } = useMarketChartData(id, 'usd', days);
  const { data:coinData, isLoading:coinLoading, error:coinError } = useCoinById(id);
  
  const transformedData = useMemo(() => {
    return data ? convertToChartData(data, days) : [];
  }, [data, days]);
  const daysList = [
    {value:1,Label:"24hrs"},
    {value:7,Label:"7 days"},
    {value:14,Label:"14 days"},
    {value:30,Label:"30 days"}
  ]
  return (
    <div className="container">
      <div className="heading">
        <Link to={"/"}><h1>Bitcoins</h1></Link>
      </div>
      <TopLAndG/>

      <div className='body'>
      
        <div className='left'>
        <h2>{id}</h2>

          <div className="dropdown-container">
            <select onChange={(e) => setdays(e.target.value)} className="dropdown">
              {daysList.map((item) => (
                <option key={item.Label} value={item.value}>
                  {item.Label}
                </option>
              ))}
            </select>
          </div>
      <div className="charts-wrapper">
        <div className="chart-card">
          <CandleChart data={transformedData} isLoading={isLoading} />
        </div>
        <div className="chart-card">
          <VolumeMarketCapChart data={transformedData} isLoading={isLoading} />
        </div>
      </div>
      </div>
      <div className='right'>
      {console.log(coinData)}
        <DescriptionCard data={coinData} loading={coinLoading} />

      </div>
      </div>

    </div>
  );
  
};

export default Dashboard;

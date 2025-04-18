import React from 'react';
import { useCoinList } from '../../hooks/useCoinList';
import { Link } from 'react-router-dom';
// import CoinCard from './CoinCard';
// import React from 'react';

function CoinCard({ title, data, bgColor, textColor }) {
  return (
    <Link to={`/${data.id}`}><div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '1rem', width: '250px', backgroundColor: bgColor }}>
      <h3 style={{ color: textColor }}>{title}</h3>
      <p style={{ color: textColor }}><strong>{data.name}</strong> ({data.symbol.toUpperCase()})</p>
      <p style={{ color: textColor }}>Price: ${data.current_price}</p>
      <p style={{ color: textColor }}>
        {data.price_change_percentage_24h > 0 ? '+' : ''}
        {data.price_change_percentage_24h.toFixed(2)}%
      </p>
    </div></Link>
  );
}

// export default CoinCard;

function TopLAndG() {
  const { data: topGainer, isLoading: loadingGainer } = useCoinList(
    'usd',
    'market_cap_desc',
    1,
    1
  );

  const { data: topLoser, isLoading: loadingLoser } = useCoinList(
    'usd',
    'market_cap_asc',
    1,
    1
  );

  if (loadingGainer || loadingLoser) return <div>Loading...</div>;

  return (
    <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', padding: '1rem' }}>
      <CoinCard 
        title="Top Gainer" 
        data={topGainer[0]} 
        bgColor="#e8f5e9" 
        textColor="green" 
      />
      <CoinCard 
        title="Top Loser" 
        data={topLoser[0]} 
        bgColor="#ffebee" 
        textColor="red" 
      />
    </div>
  );
}

export default TopLAndG;

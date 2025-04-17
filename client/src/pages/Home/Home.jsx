import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCoinList } from './../../hooks/useCoinList.js';
import CoinsList from '../../components/CoinsList/CoinsList.jsx';

// Hardcoded total coin count
const TOTAL_COINS = 17100;

function Home() {
  const location = useLocation(); // Get current URL
  const navigate = useNavigate();

  // Function to parse query parameters
  const getQueryParam = (param, defaultValue) => {
    const urlParams = new URLSearchParams(location.search);
    return parseInt(urlParams.get(param)) || defaultValue;
  };

  const [page, setPage] = useState(getQueryParam('page', 1) - 1); // Default to page 1
  const [rowsPerPage, setRowsPerPage] = useState(getQueryParam('size', 50)); // Default to 50

  // Fetch coins data based on current page and rows per page
  const { data: coins, isLoading } = useCoinList(
    "usd",
    "price_change_percentage_24h_asc",
    rowsPerPage,
    page + 1 // API is 1-indexed
  );

  // Columns definition for CoinsList
  const columns = [
    { id: 'market_cap_rank', label: '#', minWidth: 50 },
    { id: 'name', label: 'Name', minWidth: 150 },
    { id: 'symbol', label: 'Symbol', minWidth: 80 },
    {
      id: 'current_price',
      label: 'Price (USD)',
      minWidth: 120,
      align: 'right',
      format: (value) => `$${value.toLocaleString('en-US')}`,
    },
    {
      id: 'price_change_percentage_24h',
      label: '24h %',
      minWidth: 100,
      align: 'right',
      format: (value) => `${value.toFixed(2)}%`,
    },
    {
      id: 'market_cap',
      label: 'Market Cap',
      minWidth: 150,
      align: 'right',
      format: (value) => `$${(value / 1e9).toFixed(2)}B`,
    },
    {
      id: 'total_volume',
      label: 'Volume (24h)',
      minWidth: 150,
      align: 'right',
      format: (value) => `$${(value / 1e9).toFixed(2)}B`,
    },
    {
      id: 'circulating_supply',
      label: 'Circulating Supply',
      minWidth: 180,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
  ];

  // Handle page changes and update query parameters
  const handlePageChange = (newPage) => {
    setPage(newPage);
    navigate(`?page=${newPage + 1}&size=${rowsPerPage}`);
  };

  // Handle rows per page change and update query parameters
  const handleRowsPerPageChange = (event) => {
    const newSize = +event.target.value;
    setRowsPerPage(newSize);
    setPage(0); // Reset to first page when rows per page changes
    navigate(`?page=1&size=${newSize}`);
  };

  return (
    <div>
      <CoinsList
        rows={coins}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        totalCount={TOTAL_COINS}
        columns={columns}
        isLoading={isLoading}
      />
    </div>
  );
}

export default Home;

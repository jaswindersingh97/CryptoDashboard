import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const fetchMarketChart = async (coinId, vsCurrency, days) => {
  const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/${coinId}/market-chart`, {
    params: { vs_currency: vsCurrency, days }
  });
  return data;
};

export const useMarketChartData = (coinId, vsCurrency, days) => {
  return useQuery({
    queryKey: ['market-chart', coinId, vsCurrency, days],
    queryFn: () => fetchMarketChart(coinId, vsCurrency, days),
    staleTime: 60 * 1000, // 1 minute
    refetchInterval: 60 * 1000, // auto refetch every 1 minute
    refetchOnWindowFocus: false,
  });
};

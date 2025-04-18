import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const CoinById = async (coinId) => {
  const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/${coinId}`, {
  });
  return data;
};

export const useCoinById = (coinId) => {
  return useQuery({
    queryKey: ['market-chart', coinId],
    queryFn: () => CoinById(coinId),
    staleTime: Infinity, // 1 minute
    refetchInterval: Infinity, // auto refetch every 1 minute
    refetchOnWindowFocus: false,
  });
};

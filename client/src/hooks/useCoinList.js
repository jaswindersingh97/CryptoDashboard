import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const fetchCoinList = async (vs_currency,order,per_page,page) => {
  const { data } = await axios.get(`${import.meta.env.VITE_API_URL}?vs_currency=${vs_currency}&order=${order}&per_page=${per_page}&page=${page}`) // Your backend route
  return data
}

export const useCoinList = (vs_currency,order,per_page,page) => {
  return useQuery({
    queryKey: ['coin',vs_currency,order,per_page,page],
    queryFn: () => fetchCoinList(vs_currency, order, per_page, page),
    staleTime: Infinity,
    cacheTime: Infinity,
    keepPreviousData: true

  })
}

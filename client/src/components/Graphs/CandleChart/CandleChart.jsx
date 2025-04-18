import React, { useEffect, useRef } from 'react';
import { createChart, CrosshairMode ,CandlestickSeries,HistogramSeries } from 'lightweight-charts';

const CandleChart = ({ data }) => {
  const chartContainerRef = useRef();
  const chart = useRef(null);
  const candleSeries = useRef(null);
  const volumeSeries = useRef(null);

  useEffect(() => {
    // Initialize chart
    chart.current = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
      layout: {
        backgroundColor: '#253248',
        textColor: 'rgba(255, 255, 255, 0.9)',
      },
      grid: {
        vertLines: { color: '#334158' },
        horzLines: { color: '#334158' },
      },
      crosshair: { 
        mode: CrosshairMode.Normal,
        vertLine: {
          width: 4,
          color: '#C3BCDB44',
          style: 0,
          labelBackgroundColor: '#9B7DFF',
        },
        horzLine: {
          color: '#C3BCDB',
          labelBackgroundColor: '#9B7DFF',
        },
      },
      priceScale: {
        borderColor: '#485c7b',
      },
      timeScale: {
        borderColor: '#485c7b',
        timeVisible: true,
        secondsVisible: false,
      },
    });

    // Correctly create candlestick series using addSeries()
    candleSeries.current = chart.current.addSeries(CandlestickSeries , {
      upColor: '#4bffb5',
      downColor: '#ff4976',
      borderDownColor: '#ff4976',
      borderUpColor: '#4bffb5',
      wickDownColor: '#838ca1',
      wickUpColor: '#838ca1',
    });

    // Create volume series
    volumeSeries.current = chart.current.addSeries(HistogramSeries, {
      color: '#182233',
      lineWidth: 2,
      priceFormat: { type: 'volume' },
      overlay: true,
      scaleMargins: { top: 0.8, bottom: 0 },
    });

    return () => {
      if (chart.current) {
        chart.current.remove();
        chart.current = null;
      }
    };
  }, []);

  // Update chart data
  useEffect(() => {
    if (!chart.current || !data || data.length === 0) return;

    try {
      // Format candle data
      const formattedData = data.map(item => {
        const timeValue = item.time || (item.date ? new Date(item.date).getTime() / 1000 : null);
        if (!timeValue) return null;
        
        return {
          time: timeValue,
          open: item.open,
          high: item.high,
          low: item.low,
          close: item.close,
          volume: item.volume
        };
      }).filter(Boolean);

      if (formattedData.length > 0) {
        candleSeries.current.setData(formattedData);
        
        // Format volume data
        const volumeData = formattedData.map(item => ({
          time: item.time,
          value: item.volume,
          color: item.close >= item.open ? 'rgba(75, 255, 181, 0.8)' : 'rgba(255, 73, 118, 0.8)',
        }));
        
        volumeSeries.current.setData(volumeData);
        chart.current.timeScale().fitContent();
      }
    } catch (error) {
      console.error('Error updating chart data:', error);
    }
  }, [data]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (chart.current && chartContainerRef.current) {
        chart.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
          height: chartContainerRef.current.clientHeight,
        });
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);
    if (chartContainerRef.current) {
      resizeObserver.observe(chartContainerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div
      ref={chartContainerRef}
      style={{
        width: '100%',
        height: '500px', // Fixed height or use 100% in a container with defined height
        position: 'relative',
      }}
    />
  );
};

export default CandleChart;
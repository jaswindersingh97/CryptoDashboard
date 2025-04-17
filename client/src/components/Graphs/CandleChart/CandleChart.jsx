import React, { useEffect, useRef } from 'react';
import { createChart, CrosshairMode } from 'lightweight-charts';

const CandleChart = ({ data }) => {
  const chartContainerRef = useRef();
  const chart = useRef(null);

  useEffect(() => {
    if (chartContainerRef.current && !chart.current) {
      chart.current = createChart(chartContainerRef.current, {
        width: chartContainerRef.current.clientWidth,
        height: chartContainerRef.current.clientHeight,
        layout: {
          backgroundColor: '#253248',
          textColor: 'rgba(0, 0, 0, 0.9)',
        },
        grid: {
          vertLines: { color: '#334158' },
          horzLines: { color: '#334158' },
        },
        crosshair: { mode: CrosshairMode.Normal },
        priceScale: { borderColor: '#485c7b' },
        timeScale: { borderColor: '#485c7b' },
      });
      console.log('Chart initialized:', chart.current); // Debugging
    }
  }, []);

  // Update chart data once the data is available
  useEffect(() => {
    if (data.length>0 && chart.current) {
        console.log(data)
      console.log('Transformed Data:', data);

      // Add the candlestick series to the chart only if it hasn't been added yet
      if (!chart.current.candleSeries) {
        chart.current.candleSeries = chart.current.addCandlestickSeries({
          upColor: '#4bffb5',
          downColor: '#ff4976',
          borderDownColor: '#ff4976',
          borderUpColor: '#4bffb5',
          wickDownColor: '#838ca1',
          wickUpColor: '#838ca1',
        });
      }

      // Set the candlestick data
      chart.current.candleSeries.setData(data);

      // Add the volume series
      if (!chart.current.volumeSeries) {
        chart.current.volumeSeries = chart.current.addHistogramSeries({
          color: '#182233',
          lineWidth: 2,
          priceFormat: { type: 'volume' },
          overlay: true,
          scaleMargins: { top: 0.8, bottom: 0 },
        });
      }

      // Set volume data (for the bar chart)
      chart.current.volumeSeries.setData(
        data.map(item => ({
          time: new Date(item.date).getTime() / 1000,  // Convert to Unix timestamp
          value: item.volume,
        }))
      );
    }
  }, [data]);

  // Resize chart on container resizes
  useEffect(() => {
    const resizeObserver = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect;
      chart.current.applyOptions({ width, height });
      setTimeout(() => {
        chart.current.timeScale().fitContent();
      }, 0);
    });

    if (chartContainerRef.current) {
      resizeObserver.observe(chartContainerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div
      ref={chartContainerRef}
      style={{ position: 'relative', height: '500px', width: '100%' }}
    />
  );
};

export default CandleChart;

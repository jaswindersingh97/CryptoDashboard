import React, { useEffect, useRef } from 'react';
import { createChart, CrosshairMode,CandlestickSeries } from 'lightweight-charts';

const CandleChart = ({ data ,isLoading }) => {
  const chartContainerRef = useRef();
  const chart = useRef(null);
  const candleSeries = useRef(null);
  const tooltipRef = useRef(null);

  useEffect(() => {
    // Initialize chart
    chart.current = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
      layout: {
        backgroundColor: '#253248',
        textColor: '#FFFFFF',
      },
      grid: {
        vertLines: { color: '#334158', visible: true },
        horzLines: { color: '#334158', visible: true },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
        vertLine: {
          width: 1,
          color: '#C3BCDB',
          style: 0,
          labelBackgroundColor: '#9B7DFF',
          labelVisible: true,
        },
        horzLine: {
          color: '#C3BCDB',
          labelBackgroundColor: '#9B7DFF',
          labelVisible: true,
        },
      },
      rightPriceScale: {
        borderColor: '#485c7b',
        visible: true,
        entireTextOnly: true,
        scaleMargins: {
          top: 0.1,
          bottom: 0.1,
        },
      },
      leftPriceScale: {
        borderColor: '#485c7b',
        visible: true,
        entireTextOnly: true,
        scaleMargins: {
          top: 0.1,
          bottom: 0.1,
        },
      },
      timeScale: {
        borderColor: 'black',
        timeVisible: true,
        secondsVisible: true,
        visible: true

      },
    });

    // Create candlestick series
    candleSeries.current = chart.current.addSeries(CandlestickSeries, {
      upColor: '#4bffb5',
      downColor: '#ff4976',
      borderDownColor: '#ff4976',
      borderUpColor: '#4bffb5',
      wickDownColor: '#838ca1',
      wickUpColor: '#838ca1',
      priceScaleId: 'right',
    });

    // Create tooltip element
    tooltipRef.current = document.createElement('div');
    tooltipRef.current.className = 'three-line-legend';
    chartContainerRef.current.appendChild(tooltipRef.current);

    // Crosshair move event for tooltip
    chart.current.subscribeCrosshairMove(param => {
      if (!param.time || !candleSeries.current || !param.seriesPrices) {
        tooltipRef.current.style.display = 'none';
        return;
      }

      const price = param.seriesPrices.get(candleSeries.current);
      if (!price) {
        tooltipRef.current.style.display = 'none';
        return;
      }

      const dateStr = new Date(param.time * 1000).toLocaleString();
      tooltipRef.current.innerHTML = `
        <div class="tooltip-header">${dateStr}</div>
        <div class="tooltip-body">
          <div>Open: ${price.open.toFixed(2)}</div>
          <div>High: ${price.high.toFixed(2)}</div>
          <div>Low: ${price.low.toFixed(2)}</div>
          <div>Close: ${price.close.toFixed(2)}</div>
        </div>
      `;

      tooltipRef.current.style.display = 'block';
      const y = param.point.y || 0;
      const left = param.point.x + 20;
      tooltipRef.current.style.left = `${left}px`;
      tooltipRef.current.style.top = `${y}px`;
    });

    return () => {
      if (chart.current) {
        chart.current.unsubscribeCrosshairMove();
        chart.current.remove();
        chart.current = null;
      }
      if (tooltipRef.current && chartContainerRef.current) {
        chartContainerRef.current.removeChild(tooltipRef.current);
      }
    };
  }, []);

  // Update chart data
  useEffect(() => {
    if (!chart.current || !data || data.length === 0) return;

    try {
      const formattedData = data.map(item => {
        const timeValue = item.time || (item.date ? new Date(item.date).getTime() / 1000 : null);
        if (!timeValue) return null;
        
        return {
          time: timeValue,
          open: item.open,
          high: item.high,
          low: item.low,
          close: item.close,
        };
      }).filter(Boolean);

      if (formattedData.length > 0) {
        candleSeries.current.setData(formattedData);
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
        height: '300px',
        position: 'relative',
      }}
    />
  );
};

// Add styles
const styleElement = document.createElement('style');
styleElement.innerHTML = `
  .three-line-legend {
    position: absolute;
    display: none;
    padding: 8px;
    background: rgba(30, 33, 40, 0.9);
    border: 1px solid #485c7b;
    border-radius: 4px;
    pointer-events: none;
    z-index: 100;
    font-size: 12px;
    color: white;
  }
  .tooltip-header {
    font-weight: bold;
    margin-bottom: 4px;
  }
  .tooltip-body div {
    margin: 2px 0;
  }
`;
document.head.appendChild(styleElement);

export default CandleChart;
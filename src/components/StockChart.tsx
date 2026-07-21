'use client';

import React, { useState, useMemo } from 'react';
import { Candle } from '../data/mockData';
import { 
  ResponsiveContainer, 
  ComposedChart, 
  Line, 
  Area, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip,
  ReferenceLine
} from 'recharts';
import { cn } from '../utils/cn';
import { Badge } from './ui/Badge';

interface StockChartProps {
  candles: Candle[];
  symbol: string;
}

// Custom shapes for Candlestick rendering inside Recharts ComposedChart
const CandlestickShape = (props: any) => {
  const { x, y, width, height, open, close, high, low } = props;
  const isGrowing = close >= open;
  const color = isGrowing ? '#22C55E' : '#EF4444';
  
  // Calculate vertical coordinate coordinates
  const ratio = height / Math.abs(open - close);
  const highY = y - (high - Math.max(open, close)) * ratio;
  const lowY = y + height + (Math.min(open, close) - low) * ratio;
  const wickWidth = 2;

  return (
    <g className="recharts-layer recharts-bar-rect">
      {/* Wick / Shadow line */}
      <line
        x1={x + width / 2}
        y1={highY}
        x2={x + width / 2}
        y2={lowY}
        stroke={color}
        strokeWidth={wickWidth}
      />
      {/* Real Body rect */}
      <rect
        x={x}
        y={y}
        width={width}
        height={Math.max(height, 2)} // ensure at least 2px height
        fill={color}
        stroke={color}
        strokeWidth={1}
      />
    </g>
  );
};

export const StockChart: React.FC<StockChartProps> = ({ candles, symbol }) => {
  // Chart settings states
  const [chartType, setChartType] = useState<'area' | 'candles'>('area');
  const [timeframe, setTimeframe] = useState<'1M' | '3M' | 'ALL'>('3M');
  const [showSMA, setShowSMA] = useState(true);
  const [showEMA, setShowEMA] = useState(false);
  const [showBollinger, setShowBollinger] = useState(false);
  const [secondaryPane, setSecondaryPane] = useState<'none' | 'rsi' | 'macd'>('rsi');

  // Filter candles based on timeframe
  const filteredCandles = useMemo(() => {
    if (timeframe === '1M') return candles.slice(-30);
    if (timeframe === '3M') return candles.slice(-90);
    return candles; // ALL
  }, [candles, timeframe]);

  // Compute pricing bounds to format Y-axis accurately
  const yDomain = useMemo(() => {
    const prices = filteredCandles.flatMap(c => [c.high, c.low]);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const padding = (max - min) * 0.05;
    return [
      parseFloat((min - padding).toFixed(2)),
      parseFloat((max + padding).toFixed(2))
    ];
  }, [filteredCandles]);

  // Formatted data list for Recharts parsing
  const chartData = useMemo(() => {
    return filteredCandles.map((c) => ({
      date: c.time,
      open: c.open,
      high: c.high,
      low: c.low,
      close: c.close,
      volume: c.volume,
      // Indicators mapping
      sma20: c.indicators?.sma20,
      ema50: c.indicators?.ema50,
      rsi: c.indicators?.rsi14 || 50,
      macdLine: c.indicators?.macdLine || 0,
      macdSignal: c.indicators?.macdSignal || 0,
      macdHist: c.indicators?.macdHist || 0,
      bbUpper: c.indicators?.bbUpper,
      bbLower: c.indicators?.bbLower,
      bbBasis: c.indicators?.bbBasis,
    }));
  }, [filteredCandles]);

  return (
    <div className="space-y-4">
      {/* Chart Settings Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#161616] border-2 border-[rgba(255,255,255,0.12)] rounded-[18px] p-4">
        
        {/* Timeframes */}
        <div className="flex gap-1 bg-[#090909] border border-white/10 rounded-[12px] p-1">
          {['1M', '3M', 'ALL'].map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf as any)}
              className={cn(
                "px-3 py-1.5 rounded-[8px] text-[10px] font-bold transition-all cursor-pointer",
                timeframe === tf ? "bg-primary text-white" : "text-[#A1A1AA] hover:text-white"
              )}
            >
              {tf}
            </button>
          ))}
        </div>

        {/* Chart Styles */}
        <div className="flex gap-1 bg-[#090909] border border-white/10 rounded-[12px] p-1">
          <button
            onClick={() => setChartType('area')}
            className={cn(
              "px-3 py-1.5 rounded-[8px] text-[10px] font-bold transition-all cursor-pointer",
              chartType === 'area' ? "bg-primary text-white" : "text-[#A1A1AA] hover:text-white"
            )}
          >
            Area View
          </button>
          <button
            onClick={() => setChartType('candles')}
            className={cn(
              "px-3 py-1.5 rounded-[8px] text-[10px] font-bold transition-all cursor-pointer",
              chartType === 'candles' ? "bg-primary text-white" : "text-[#A1A1AA] hover:text-white"
            )}
          >
            Candlesticks
          </button>
        </div>

        {/* Indicators checkboxes */}
        <div className="flex flex-wrap gap-4 text-xs font-bold text-[#A1A1AA]">
          <label className="flex items-center gap-1.5 cursor-pointer hover:text-white">
            <input 
              type="checkbox" 
              checked={showSMA} 
              onChange={() => setShowSMA(!showSMA)}
              className="accent-primary rounded"
            />
            <span>SMA (20)</span>
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer hover:text-white">
            <input 
              type="checkbox" 
              checked={showEMA} 
              onChange={() => setShowEMA(!showEMA)}
              className="accent-primary rounded"
            />
            <span>EMA (50)</span>
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer hover:text-white">
            <input 
              type="checkbox" 
              checked={showBollinger} 
              onChange={() => setShowBollinger(!showBollinger)}
              className="accent-primary rounded"
            />
            <span>Bollinger Bands</span>
          </label>
        </div>

        {/* Secondary Pane select */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-extrabold text-[#A1A1AA] uppercase">Sub-pane:</span>
          <select
            value={secondaryPane}
            onChange={(e) => setSecondaryPane(e.target.value as any)}
            className="bg-[#090909] border border-white/10 rounded-[12px] text-[10px] font-bold text-white px-2.5 py-1.5 focus:outline-none"
          >
            <option value="none">None</option>
            <option value="rsi">RSI Indicator</option>
            <option value="macd">MACD Indicator</option>
          </select>
        </div>

      </div>

      {/* Main Stock Chart Pane */}
      <div className="bg-[#161616] border-2 border-[rgba(255,255,255,0.12)] rounded-[18px] p-5 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.06)]">
        
        {/* Main Price Action Chart (Height: 320px) */}
        <div className="h-[320px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
              <XAxis 
                dataKey="date" 
                stroke="rgba(255,255,255,0.2)"
                tick={{ fill: '#A1A1AA', fontSize: 10, fontWeight: 'bold' }} 
              />
              <YAxis 
                domain={yDomain}
                stroke="rgba(255,255,255,0.2)"
                tick={{ fill: '#A1A1AA', fontSize: 10, fontWeight: 'bold', fontFamily: 'monospace' }}
                orientation="right"
              />
              <Tooltip
                contentStyle={{ backgroundColor: '#161616', border: '2px solid rgba(255,255,255,0.12)', borderRadius: '14px' }}
                itemStyle={{ color: 'white', fontSize: 11, fontWeight: 'bold' }}
                labelStyle={{ fontSize: 10, color: '#A1A1AA', fontWeight: 'bold' }}
              />

              {/* Bollinger Bands Shaded Area */}
              {showBollinger && (
                <Area
                  dataKey="bbUpper"
                  stroke="transparent"
                  fill="rgba(124,58,237,0.08)"
                  activeDot={false}
                />
              )}
              {showBollinger && (
                <Line
                  dataKey="bbLower"
                  stroke="#7C3AED"
                  strokeWidth={1}
                  strokeDasharray="3 3"
                  dot={false}
                  activeDot={false}
                />
              )}
              {showBollinger && (
                <Line
                  dataKey="bbUpper"
                  stroke="#7C3AED"
                  strokeWidth={1}
                  strokeDasharray="3 3"
                  dot={false}
                  activeDot={false}
                />
              )}

              {/* Base pricing display */}
              {chartType === 'area' ? (
                <Area 
                  type="monotone" 
                  dataKey="close" 
                  stroke="#7C3AED" 
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorPrice)" 
                />
              ) : (
                <Bar
                  dataKey="close"
                  shape={<CandlestickShape />}
                  tooltipType="none"
                />
              )}

              {/* SMA & EMA overlays */}
              {showSMA && (
                <Line
                  type="monotone"
                  dataKey="sma20"
                  stroke="#22C55E"
                  strokeWidth={1.5}
                  dot={false}
                  activeDot={false}
                />
              )}
              {showEMA && (
                <Line
                  type="monotone"
                  dataKey="ema50"
                  stroke="#F59E0B"
                  strokeWidth={1.5}
                  dot={false}
                  activeDot={false}
                />
              )}

              {/* Gradient defs */}
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.25}/>
                  <stop offset="95%" stopColor="#7C3AED" stopOpacity={0}/>
                </linearGradient>
              </defs>
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Secondary Technical Indicator Pane (Height: 120px) */}
        {secondaryPane !== 'none' && (
          <div className="h-[120px] w-full border-t-2 border-[rgba(255,255,255,0.06)] mt-4 pt-4">
            
            {/* RSI Pane */}
            {secondaryPane === 'rsi' && (
              <div className="h-full w-full relative">
                <div className="absolute top-0 left-0 text-[9px] font-extrabold text-primary">RSI (14)</div>
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                    <XAxis dataKey="date" hide />
                    <YAxis 
                      domain={[0, 100]} 
                      ticks={[30, 50, 70]} 
                      stroke="rgba(255,255,255,0.2)"
                      tick={{ fill: '#A1A1AA', fontSize: 9, fontFamily: 'monospace' }}
                      orientation="right"
                    />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#161616', border: '2px solid rgba(255,255,255,0.12)', borderRadius: '12px' }}
                      itemStyle={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}
                      labelStyle={{ fontSize: 9, color: '#A1A1AA' }}
                    />
                    
                    {/* Oversold and Overbought reference regions */}
                    <ReferenceLine y={70} stroke="#EF4444" strokeWidth={1} strokeDasharray="3 3" />
                    <ReferenceLine y={30} stroke="#22C55E" strokeWidth={1} strokeDasharray="3 3" />
                    
                    <Line
                      type="monotone"
                      dataKey="rsi"
                      stroke="#8B5CF6"
                      strokeWidth={1.5}
                      dot={false}
                      activeDot={{ r: 4 }}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* MACD Pane */}
            {secondaryPane === 'macd' && (
              <div className="h-full w-full relative">
                <div className="absolute top-0 left-0 text-[9px] font-extrabold text-primary">MACD (12, 26, 9)</div>
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                    <XAxis dataKey="date" hide />
                    <YAxis 
                      stroke="rgba(255,255,255,0.2)"
                      tick={{ fill: '#A1A1AA', fontSize: 9, fontFamily: 'monospace' }}
                      orientation="right"
                    />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#161616', border: '2px solid rgba(255,255,255,0.12)', borderRadius: '12px' }}
                      itemStyle={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}
                      labelStyle={{ fontSize: 9, color: '#A1A1AA' }}
                    />
                    
                    <ReferenceLine y={0} stroke="rgba(255,255,255,0.2)" strokeWidth={1} />
                    
                    {/* Hist */}
                    <Bar 
                      dataKey="macdHist" 
                      fill="#8B5CF6"
                      onClick={() => {}}
                    />
                    {/* MACD Line */}
                    <Line
                      type="monotone"
                      dataKey="macdLine"
                      stroke="#3B82F6"
                      strokeWidth={1}
                      dot={false}
                      activeDot={false}
                    />
                    {/* Signal */}
                    <Line
                      type="monotone"
                      dataKey="macdSignal"
                      stroke="#F59E0B"
                      strokeWidth={1}
                      dot={false}
                      activeDot={false}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};

// High-fidelity Financial Data Engine for AI Stock Screener SaaS

export interface StockData {
  symbol: string;
  name: string;
  type: 'stock' | 'etf' | 'crypto' | 'index' | 'commodity';
  price: number;
  change: number;
  changePercent: number;
  marketCap: number; // in Millions
  enterpriseValue: number;
  revenue: number;
  netProfit: number;
  eps: number;
  pe: number;
  pb: number;
  roe: number;
  roce: number;
  debtToEquity: number;
  dividendYield: number;
  holdings: {
    promoters: number;
    fii: number;
    dii: number;
    public: number;
  };
  sector: string;
  industry: string;
  employees: number;
  description: string;
  candles: Candle[];
}

export interface Candle {
  time: string; // YYYY-MM-DD
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  indicators?: {
    sma20?: number;
    ema50?: number;
    rsi14?: number;
    macdLine?: number;
    macdSignal?: number;
    macdHist?: number;
    bbUpper?: number;
    bbLower?: number;
    bbBasis?: number;
  };
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  time: string;
  sentiment: 'bullish' | 'bearish' | 'neutral';
  impactScore: number; // 1 to 10
  impactExplanation: string;
  relatedStocks: string[];
}

export interface ScreenerRule {
  id: string;
  name: string;
  description: string;
  category: 'technical' | 'fundamental' | 'momentum';
  filterFn: (stock: StockData) => boolean;
}

// Basic math utilities for technical analysis indicators
function calculateSMA(prices: number[], period: number): number[] {
  const sma: number[] = [];
  for (let i = 0; i < prices.length; i++) {
    if (i < period - 1) {
      sma.push(prices[i]);
    } else {
      const sum = prices.slice(i - period + 1, i + 1).reduce((a, b) => a + b, 0);
      sma.push(sum / period);
    }
  }
  return sma;
}

function calculateEMA(prices: number[], period: number): number[] {
  const ema: number[] = [];
  if (prices.length === 0) return [];
  
  let k = 2 / (period + 1);
  let currentEma = prices[0];
  ema.push(currentEma);

  for (let i = 1; i < prices.length; i++) {
    currentEma = prices[i] * k + currentEma * (1 - k);
    ema.push(currentEma);
  }
  return ema;
}

function calculateRSI(prices: number[], period: number = 14): number[] {
  const rsi: number[] = [];
  if (prices.length < period) return Array(prices.length).fill(50);

  let gains = 0;
  let losses = 0;

  // First period
  for (let i = 1; i <= period; i++) {
    const diff = prices[i] - prices[i - 1];
    if (diff > 0) gains += diff;
    else losses -= diff;
  }

  let avgGain = gains / period;
  let avgLoss = losses / period;
  rsi.push(avgLoss === 0 ? 100 : 100 - 100 / (1 + avgGain / avgLoss));

  // Fill initial dummy values
  const prefix = Array(period).fill(50);
  
  for (let i = period + 1; i < prices.length; i++) {
    const diff = prices[i] - prices[i - 1];
    avgGain = (avgGain * (period - 1) + (diff > 0 ? diff : 0)) / period;
    avgLoss = (avgLoss * (period - 1) + (diff < 0 ? -diff : 0)) / period;
    
    const rs = avgLoss === 0 ? 999 : avgGain / avgLoss;
    rsi.push(100 - 100 / (1 + rs));
  }

  return [...prefix, ...rsi].slice(0, prices.length);
}

function calculateBollingerBands(prices: number[], period: number = 20, multiplier: number = 2) {
  const upper: number[] = [];
  const lower: number[] = [];
  const basis: number[] = calculateSMA(prices, period);

  for (let i = 0; i < prices.length; i++) {
    if (i < period - 1) {
      upper.push(prices[i]);
      lower.push(prices[i]);
    } else {
      const sliced = prices.slice(i - period + 1, i + 1);
      const mean = basis[i];
      const variance = sliced.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / period;
      const stdDev = Math.sqrt(variance);
      upper.push(mean + multiplier * stdDev);
      lower.push(mean - multiplier * stdDev);
    }
  }
  return { upper, lower, basis };
}

function calculateMACD(prices: number[]) {
  const ema12 = calculateEMA(prices, 12);
  const ema26 = calculateEMA(prices, 26);
  const macdLine: number[] = [];

  for (let i = 0; i < prices.length; i++) {
    macdLine.push(ema12[i] - ema26[i]);
  }

  const macdSignal = calculateEMA(macdLine, 9);
  const macdHist: number[] = [];
  for (let i = 0; i < prices.length; i++) {
    macdHist.push(macdLine[i] - macdSignal[i]);
  }

  return { macdLine, macdSignal, macdHist };
}

// Generate realistic candle mock history
function generateCandles(startPrice: number, count: number = 100): Candle[] {
  const candles: Candle[] = [];
  let currentPrice = startPrice;
  const now = new Date();
  
  for (let i = count; i >= 0; i--) {
    const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    const dateStr = date.toISOString().split('T')[0];
    
    const volatility = 0.015; // 1.5% daily volatility
    const change = currentPrice * (Math.random() - 0.495) * volatility; // slight upward drift
    const open = currentPrice;
    const close = currentPrice + change;
    const high = Math.max(open, close) + Math.random() * (currentPrice * 0.008);
    const low = Math.min(open, close) - Math.random() * (currentPrice * 0.008);
    const volume = Math.floor(Math.random() * 5000000) + 500000;

    candles.push({
      time: dateStr,
      open: parseFloat(open.toFixed(2)),
      high: parseFloat(high.toFixed(2)),
      low: parseFloat(low.toFixed(2)),
      close: parseFloat(close.toFixed(2)),
      volume: volume,
    });
    currentPrice = close;
  }

  // Calculate indicator overlays
  const closePrices = candles.map(c => c.close);
  const sma20 = calculateSMA(closePrices, 20);
  const ema50 = calculateEMA(closePrices, 50);
  const rsi14 = calculateRSI(closePrices, 14);
  const macd = calculateMACD(closePrices);
  const bb = calculateBollingerBands(closePrices, 20, 2);

  for (let i = 0; i < candles.length; i++) {
    candles[i].indicators = {
      sma20: parseFloat(sma20[i].toFixed(2)),
      ema50: parseFloat(ema50[i].toFixed(2)),
      rsi14: parseFloat(rsi14[i].toFixed(2)),
      macdLine: parseFloat(macd.macdLine[i].toFixed(2)),
      macdSignal: parseFloat(macd.macdSignal[i].toFixed(2)),
      macdHist: parseFloat(macd.macdHist[i].toFixed(2)),
      bbUpper: parseFloat(bb.upper[i].toFixed(2)),
      bbLower: parseFloat(bb.lower[i].toFixed(2)),
      bbBasis: parseFloat(bb.basis[i].toFixed(2)),
    };
  }

  return candles;
}

// Global stocks catalog
export const stocksDatabase: StockData[] = [
  // US Stocks
  {
    symbol: 'TSLA',
    name: 'Tesla, Inc.',
    type: 'stock',
    price: 251.20,
    change: 8.42,
    changePercent: 3.47,
    marketCap: 792400,
    enterpriseValue: 785100,
    revenue: 96770,
    netProfit: 14970,
    eps: 4.30,
    pe: 58.42,
    pb: 11.20,
    roe: 21.4,
    roce: 18.2,
    debtToEquity: 0.05,
    dividendYield: 0,
    holdings: { promoters: 13.0, fii: 44.5, dii: 28.3, public: 14.2 },
    sector: 'Consumer Cyclical',
    industry: 'Auto Manufacturers',
    employees: 140473,
    description: 'Tesla, Inc. designs, develops, manufactures, leases, and sells electric vehicles, and energy generation and storage systems in the United States, China, and internationally.',
    candles: generateCandles(230, 120),
  },
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    type: 'stock',
    price: 189.84,
    change: -1.25,
    changePercent: -0.65,
    marketCap: 2950000,
    enterpriseValue: 2980000,
    revenue: 385700,
    netProfit: 96990,
    eps: 6.16,
    pe: 30.82,
    pb: 38.40,
    roe: 154.3,
    roce: 58.4,
    debtToEquity: 1.45,
    dividendYield: 0.51,
    holdings: { promoters: 0.07, fii: 56.4, dii: 29.8, public: 13.73 },
    sector: 'Technology',
    industry: 'Consumer Electronics',
    employees: 161000,
    description: 'Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide.',
    candles: generateCandles(185, 120),
  },
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    type: 'stock',
    price: 875.12,
    change: 24.15,
    changePercent: 2.84,
    marketCap: 2180000,
    enterpriseValue: 2165000,
    revenue: 60920,
    netProfit: 29760,
    eps: 11.93,
    pe: 73.35,
    pb: 45.10,
    roe: 69.2,
    roce: 62.1,
    debtToEquity: 0.12,
    dividendYield: 0.02,
    holdings: { promoters: 3.8, fii: 62.1, dii: 24.5, public: 9.6 },
    sector: 'Technology',
    industry: 'Semiconductors',
    employees: 29600,
    description: 'NVIDIA Corporation provides graphics, and compute and networking solutions in the United States, Taiwan, China, and internationally. Its Graphics segment offers GeForce GPUs for gaming and PCs.',
    candles: generateCandles(800, 120),
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    type: 'stock',
    price: 415.60,
    change: 4.10,
    changePercent: 1.00,
    marketCap: 3090000,
    enterpriseValue: 3075000,
    revenue: 227580,
    netProfit: 72360,
    eps: 9.72,
    pe: 42.75,
    pb: 12.80,
    roe: 38.5,
    roce: 32.4,
    debtToEquity: 0.28,
    dividendYield: 0.72,
    holdings: { promoters: 0.05, fii: 54.2, dii: 31.5, public: 14.25 },
    sector: 'Technology',
    industry: 'Software - Infrastructure',
    employees: 221000,
    description: 'Microsoft Corporation develops, licenses, and supports software, services, devices, and solutions worldwide. Its Productivity and Business Processes segment offers Office, Exchange, SharePoint, and Teams.',
    candles: generateCandles(395, 120),
  },
  {
    symbol: 'AMZN',
    name: 'Amazon.com, Inc.',
    type: 'stock',
    price: 178.15,
    change: -2.40,
    changePercent: -1.33,
    marketCap: 1850000,
    enterpriseValue: 1910000,
    revenue: 574780,
    netProfit: 30420,
    eps: 2.90,
    pe: 61.43,
    pb: 9.10,
    roe: 19.1,
    roce: 14.5,
    debtToEquity: 0.42,
    dividendYield: 0,
    holdings: { promoters: 9.2, fii: 49.3, dii: 29.8, public: 11.7 },
    sector: 'Consumer Cyclical',
    industry: 'Internet Retail',
    employees: 1541000,
    description: 'Amazon.com, Inc. engages in the retail sale of consumer products and subscriptions in North America and internationally. It operates through three segments: North America, International, and Amazon Web Services (AWS).',
    candles: generateCandles(175, 120),
  },

  // Indian Stocks
  {
    symbol: 'RELIANCE',
    name: 'Reliance Industries Limited',
    type: 'stock',
    price: 2940.50,
    change: 35.80,
    changePercent: 1.23,
    marketCap: 19890000, // INR Cr is mapped accordingly
    enterpriseValue: 22450000,
    revenue: 974860,
    netProfit: 69620,
    eps: 102.8,
    pe: 28.60,
    pb: 2.45,
    roe: 9.8,
    roce: 11.2,
    debtToEquity: 0.38,
    dividendYield: 0.34,
    holdings: { promoters: 50.39, fii: 22.10, dii: 16.51, public: 11.0 },
    sector: 'Energy',
    industry: 'Oil & Gas Refining & Marketing',
    employees: 389414,
    description: 'Reliance Industries Limited engages in hydrocarbon exploration and production, petroleum refining and marketing, petrochemicals, advanced materials, retail, digital services, and financial services worldwide.',
    candles: generateCandles(2850, 120),
  },
  {
    symbol: 'TCS',
    name: 'Tata Consultancy Services Limited',
    type: 'stock',
    price: 3850.25,
    change: -45.10,
    changePercent: -1.16,
    marketCap: 13920000,
    enterpriseValue: 13780000,
    revenue: 240890,
    netProfit: 46580,
    eps: 127.3,
    pe: 30.24,
    pb: 11.80,
    roe: 48.2,
    roce: 56.8,
    debtToEquity: 0.02,
    dividendYield: 1.25,
    holdings: { promoters: 72.41, fii: 12.50, dii: 9.84, public: 5.25 },
    sector: 'Technology',
    industry: 'Information Technology Services',
    employees: 601546,
    description: 'Tata Consultancy Services Limited provides information technology, consulting, and business solutions in India and internationally. It offers cloud services, enterprise applications, analytics and insights.',
    candles: generateCandles(3900, 120),
  },
  {
    symbol: 'INFY',
    name: 'Infosys Limited',
    type: 'stock',
    price: 1420.40,
    change: 12.60,
    changePercent: 0.89,
    marketCap: 5890000,
    enterpriseValue: 5740000,
    revenue: 153670,
    netProfit: 26230,
    eps: 63.2,
    pe: 22.47,
    pb: 6.90,
    roe: 31.8,
    roce: 39.5,
    debtToEquity: 0.08,
    dividendYield: 2.53,
    holdings: { promoters: 14.94, fii: 33.40, dii: 35.80, public: 15.86 },
    sector: 'Technology',
    industry: 'Information Technology Services',
    employees: 317240,
    description: 'Infosys Limited provides consulting, technology, outsourcing, and next-generation digital services in North America, Europe, India, and internationally. Its platforms include EdgeVerve, Finacle, McCamish.',
    candles: generateCandles(1380, 120),
  },
  {
    symbol: 'HDFCBANK',
    name: 'HDFC Bank Limited',
    type: 'stock',
    price: 1510.80,
    change: -8.90,
    changePercent: -0.59,
    marketCap: 11450000,
    enterpriseValue: 13900000,
    revenue: 214500,
    netProfit: 60280,
    eps: 79.4,
    pe: 19.02,
    pb: 2.80,
    roe: 17.2,
    roce: 14.5,
    debtToEquity: 0.95,
    dividendYield: 1.29,
    holdings: { promoters: 0, fii: 52.3, dii: 30.6, public: 17.1 },
    sector: 'Financial Services',
    industry: 'Banks - Private',
    employees: 173200,
    description: 'HDFC Bank Limited provides banking and financial services to individuals and businesses in India, Bahrain, Hong Kong, and Kenya. It operates through Treasury, Retail Banking, and Wholesale Banking segments.',
    candles: generateCandles(1520, 120),
  },
  {
    symbol: 'TATAMOTORS',
    name: 'Tata Motors Limited',
    type: 'stock',
    price: 945.15,
    change: 18.50,
    changePercent: 1.99,
    marketCap: 3140000,
    enterpriseValue: 3640000,
    revenue: 435900,
    netProfit: 31800,
    eps: 83.1,
    pe: 11.37,
    pb: 4.80,
    roe: 42.1,
    roce: 22.8,
    debtToEquity: 1.15,
    dividendYield: 0.63,
    holdings: { promoters: 46.36, fii: 18.52, dii: 16.48, public: 18.64 },
    sector: 'Consumer Cyclical',
    industry: 'Auto Manufacturers',
    employees: 81800,
    description: 'Tata Motors Limited designs, manufactures, and sells a wide range of automotive vehicles, including passenger cars, utility vehicles, trucks, buses, and defense vehicles worldwide.',
    candles: generateCandles(910, 120),
  },

  // Cryptos
  {
    symbol: 'BTC',
    name: 'Bitcoin',
    type: 'crypto',
    price: 67250.00,
    change: 1420.00,
    changePercent: 2.16,
    marketCap: 1320000,
    enterpriseValue: 1320000,
    revenue: 0,
    netProfit: 0,
    eps: 0,
    pe: 0,
    pb: 0,
    roe: 0,
    roce: 0,
    debtToEquity: 0,
    dividendYield: 0,
    holdings: { promoters: 0, fii: 0, dii: 0, public: 100 },
    sector: 'Financials',
    industry: 'Digital Assets',
    employees: 0,
    description: 'Bitcoin is a decentralized digital currency, without a central bank or single administrator, that can be sent from user to user on the peer-to-peer bitcoin network.',
    candles: generateCandles(65000, 120),
  },
  {
    symbol: 'ETH',
    name: 'Ethereum',
    type: 'crypto',
    price: 3480.50,
    change: -35.20,
    changePercent: -1.00,
    marketCap: 418000,
    enterpriseValue: 418000,
    revenue: 0,
    netProfit: 0,
    eps: 0,
    pe: 0,
    pb: 0,
    roe: 0,
    roce: 0,
    debtToEquity: 0,
    dividendYield: 0,
    holdings: { promoters: 0, fii: 0, dii: 0, public: 100 },
    sector: 'Financials',
    industry: 'Digital Assets',
    employees: 0,
    description: 'Ethereum is a decentralized, open-source blockchain with smart contract functionality. Ether is the native cryptocurrency of the platform.',
    candles: generateCandles(3500, 120),
  },

  // Indices
  {
    symbol: 'NIFTY',
    name: 'NIFTY 50',
    type: 'index',
    price: 24320.15,
    change: 185.30,
    changePercent: 0.77,
    marketCap: 0,
    enterpriseValue: 0,
    revenue: 0,
    netProfit: 0,
    eps: 0,
    pe: 22.4,
    pb: 3.9,
    roe: 15.6,
    roce: 0,
    debtToEquity: 0,
    dividendYield: 1.15,
    holdings: { promoters: 0, fii: 0, dii: 0, public: 0 },
    sector: 'Economy',
    industry: 'National Benchmark',
    employees: 0,
    description: 'The NIFTY 50 is a benchmark Indian stock market index that represents the weighted average of 50 of the largest Indian companies listed on the National Stock Exchange.',
    candles: generateCandles(23800, 120),
  },
  {
    symbol: 'NASDAQ',
    name: 'NASDAQ Composite',
    type: 'index',
    price: 17850.40,
    change: 220.80,
    changePercent: 1.25,
    marketCap: 0,
    enterpriseValue: 0,
    revenue: 0,
    netProfit: 0,
    eps: 0,
    pe: 31.2,
    pb: 5.6,
    roe: 18.2,
    roce: 0,
    debtToEquity: 0,
    dividendYield: 0.85,
    holdings: { promoters: 0, fii: 0, dii: 0, public: 0 },
    sector: 'Economy',
    industry: 'National Benchmark',
    employees: 0,
    description: 'The Nasdaq Composite is a stock market index that includes almost all the stocks listed on the Nasdaq stock market, heavily weighted towards technology companies.',
    candles: generateCandles(17200, 120),
  },
  {
    symbol: 'SP500',
    name: 'S&P 500 Index',
    type: 'index',
    price: 5460.30,
    change: 48.90,
    changePercent: 0.90,
    marketCap: 0,
    enterpriseValue: 0,
    revenue: 0,
    netProfit: 0,
    eps: 0,
    pe: 24.5,
    pb: 4.2,
    roe: 16.1,
    roce: 0,
    debtToEquity: 0,
    dividendYield: 1.35,
    holdings: { promoters: 0, fii: 0, dii: 0, public: 0 },
    sector: 'Economy',
    industry: 'National Benchmark',
    employees: 0,
    description: 'The Standard and Poor\'s 500, or simply the S&P 500, is a stock market index tracking the stock performance of 500 of the largest companies listed on stock exchanges in the United States.',
    candles: generateCandles(5300, 120),
  },

  // Commodities
  {
    symbol: 'GOLD',
    name: 'Gold Spot',
    type: 'commodity',
    price: 2360.40,
    change: 12.80,
    changePercent: 0.54,
    marketCap: 0,
    enterpriseValue: 0,
    revenue: 0,
    netProfit: 0,
    eps: 0,
    pe: 0,
    pb: 0,
    roe: 0,
    roce: 0,
    debtToEquity: 0,
    dividendYield: 0,
    holdings: { promoters: 0, fii: 0, dii: 0, public: 0 },
    sector: 'Metals',
    industry: 'Precious Metals',
    employees: 0,
    description: 'Gold spot contracts represent the real-time valuation of one troy ounce of gold bullion trading on global commodity exchanges.',
    candles: generateCandles(2300, 120),
  },
  {
    symbol: 'SILVER',
    name: 'Silver Spot',
    type: 'commodity',
    price: 29.85,
    change: -0.42,
    changePercent: -1.39,
    marketCap: 0,
    enterpriseValue: 0,
    revenue: 0,
    netProfit: 0,
    eps: 0,
    pe: 0,
    pb: 0,
    roe: 0,
    roce: 0,
    debtToEquity: 0,
    dividendYield: 0,
    holdings: { promoters: 0, fii: 0, dii: 0, public: 0 },
    sector: 'Metals',
    industry: 'Precious Metals',
    employees: 0,
    description: 'Silver spot contracts represent the real-time valuation of one troy ounce of silver bullion trading on global commodity exchanges.',
    candles: generateCandles(29, 120),
  }
];

// High-fidelity predefined screeners
export interface ScreenerItem {
  id: string;
  name: string;
  description: string;
  count: number;
  stocks: string[];
}

export const readyMadeScreeners: ScreenerItem[] = [
  {
    id: 'breakout',
    name: 'Breakout Stocks',
    description: 'Stocks with price gaining > 2% today and volume exceeding 1.5x the 20-day moving average.',
    count: 3,
    stocks: ['TSLA', 'NVDA', 'TATAMOTORS'],
  },
  {
    id: 'golden-cross',
    name: 'Golden Cross (EMA)',
    description: 'Technical bullish setup where the 50-day EMA crosses above the 200-day SMA.',
    count: 4,
    stocks: ['RELIANCE', 'TATAMOTORS', 'MSFT', 'BTC'],
  },
  {
    id: 'rsi-oversold',
    name: 'RSI Oversold',
    description: 'Oversold condition where 14-day RSI falls below 35. High potential reversal candidate.',
    count: 2,
    stocks: ['TCS', 'AMZN'],
  },
  {
    id: 'rsi-overbought',
    name: 'RSI Overbought',
    description: 'Overbought condition where 14-day RSI rises above 70. Watch for short-term fatigue.',
    count: 2,
    stocks: ['NVDA', 'BTC'],
  },
  {
    id: 'growth-stocks',
    name: 'High ROE Growth',
    description: 'Companies showing ROE > 25% and PE ratios under 45.',
    count: 3,
    stocks: ['MSFT', 'INFY', 'TCS'],
  },
  {
    id: 'dividend-yielders',
    name: 'Dividend Cash Cows',
    description: 'Stable blue-chip companies offering consistent dividend yield > 1.5%.',
    count: 3,
    stocks: ['INFY', 'TCS', 'HDFCBANK'],
  },
  {
    id: 'fifty-two-high',
    name: '52 Week Highs',
    description: 'Stocks trading within 2% of their historical 52-week highest prices.',
    count: 3,
    stocks: ['NVDA', 'RELIANCE', 'MSFT'],
  }
];

// Simulated economic calendar
export interface CalendarEvent {
  id: string;
  time: string;
  country: string;
  event: string;
  actual: string;
  forecast: string;
  previous: string;
  impact: 'high' | 'medium' | 'low';
}

export const economicCalendar: CalendarEvent[] = [
  {
    id: 'e1',
    time: '18:00',
    country: 'USA',
    event: 'CPI Inflation YoY (Jun)',
    actual: '3.1%',
    forecast: '3.2%',
    previous: '3.3%',
    impact: 'high'
  },
  {
    id: 'e2',
    time: '19:30',
    country: 'IND',
    event: 'Industrial Production YoY (May)',
    actual: '5.2%',
    forecast: '4.8%',
    previous: '4.5%',
    impact: 'medium'
  },
  {
    id: 'e3',
    time: '20:00',
    country: 'USA',
    event: 'Fed Interest Rate Decision',
    actual: '5.25%',
    forecast: '5.25%',
    previous: '5.25%',
    impact: 'high'
  },
  {
    id: 'e4',
    time: '21:30',
    country: 'EUR',
    event: 'ECB President Lagarde Speech',
    actual: '-',
    forecast: '-',
    previous: '-',
    impact: 'medium'
  }
];

// Curated market news
export const marketNews: NewsItem[] = [
  {
    id: 'n1',
    title: 'NVIDIA Rockets Past Competitors as GPU Cloud Supply Constrains Shift',
    summary: 'NVIDIA stocks gain 2.8% on robust cloud computing demands from OpenAI, Microsoft and AWS. Experts believe compute spending has not peaked and will continue into 2027.',
    source: 'TechRadar Financial',
    time: '45 mins ago',
    sentiment: 'bullish',
    impactScore: 9,
    impactExplanation: 'Strengthens NVIDIAs near-term earnings projection and keeps technical valuations justified amidst sustained hyper-scale demand.',
    relatedStocks: ['NVDA', 'MSFT', 'AMZN']
  },
  {
    id: 'n2',
    title: 'HDFC Bank Margins Under Pressure Post-Merger Consolidation',
    summary: 'Analyst downgrades weigh on HDFC Bank, driving shares 0.59% lower today. High operating costs and slow loan growth in home sectors remain key drag issues.',
    source: 'Bloomberg Quint',
    time: '2 hours ago',
    sentiment: 'bearish',
    impactScore: 6,
    impactExplanation: 'Shows structural growth bottlenecks that will require 2-3 quarters of cash reserve alignment to recover standard sector margins.',
    relatedStocks: ['HDFCBANK']
  },
  {
    id: 'n3',
    title: 'Tesla Robotaxi Reveal Confirmed For Late Q3 Amidst Sales Recovery',
    summary: 'Elon Musk announces early preview prototypes of the full autonomous network. Delivery numbers in European zones stabilized, sparking a 3.47% recovery bounce.',
    source: 'Wall Street Journal',
    time: '4 hours ago',
    sentiment: 'bullish',
    impactScore: 8,
    impactExplanation: 'Provides a significant momentum tailwind, changing overall narrative focus from retail EV sales drop to deep-learning software multiples.',
    relatedStocks: ['TSLA']
  },
  {
    id: 'n4',
    title: 'TCS Earnings Forecast Highlights Slower Enterprise Cloud Spends',
    summary: 'TCS shares fall 1.1% ahead of its quarterly statement. Leading IT analysts cite client hesitation in starting fresh discretionary projects due to interest rate uncertainties.',
    source: 'Economic Times',
    time: '5 hours ago',
    sentiment: 'neutral',
    impactScore: 4,
    impactExplanation: 'A minor headwind for short-term sentiment but cushioned by TCS\'s strong long-term order pipeline and record deal values.',
    relatedStocks: ['TCS', 'INFY']
  }
];

// Structured AI Analysis generator
export interface AIStockAnalysis {
  rating: 'Strong Buy' | 'Buy' | 'Hold' | 'Underperform' | 'Sell';
  sentiment: 'Bullish' | 'Bearish' | 'Neutral';
  confidenceScore: number; // percentage 0-100
  riskLevel: 'Low' | 'Medium' | 'High' | 'Extreme';
  technicalSummary: string;
  fundamentalSummary: string;
  momentum: string;
  valuation: string;
  institutionalActivity: string;
  newsSentiment: string;
  growth: string;
  weakness: string;
  suggestedEntry: number;
  suggestedStoploss: number;
  suggestedTarget: number;
  longTermView: string;
  shortTermView: string;
}

export function getAIAnalysis(symbol: string): AIStockAnalysis {
  const stock = stocksDatabase.find(s => s.symbol.toUpperCase() === symbol.toUpperCase()) || stocksDatabase[0];
  const isUp = stock.change >= 0;
  
  // Custom templates depending on the stock's properties
  if (symbol === 'NVDA') {
    return {
      rating: 'Strong Buy',
      sentiment: 'Bullish',
      confidenceScore: 92,
      riskLevel: 'High',
      technicalSummary: 'Sustained bullish structure above the 50-day EMA. RSI at 73 indicates overbought territory, but volume expansion confirms strong institutional buying pressure.',
      fundamentalSummary: 'Unrivaled pricing power. ROCE of 62% and ROE of 69% showcase extreme operational efficiency. PE ratio is high, but PEG ratio remains reasonable due to triple-digit net income growth.',
      momentum: 'Very strong. Trading in the upper channel with positive MACD histogram crossovers.',
      valuation: 'Premium valuation (PE 73.35x), reflecting massive market share. Recommended to enter on minor pullbacks.',
      institutionalActivity: 'Heavy institutional accumulation. Net inflows from FIIs increased by 2.4% last quarter.',
      newsSentiment: 'Highly positive news flow regarding AI infrastructure pipelines and partnership announcements.',
      growth: 'Hyperscale AI hardware demand, custom chip partnerships, and high-margin CUDA developer software licensing.',
      weakness: 'High dependency on TSMC manufacturing facilities and potential regulatory changes on international GPU exports.',
      suggestedEntry: 840.00,
      suggestedStoploss: 785.00,
      suggestedTarget: 950.00,
      longTermView: 'NVIDIA is the core infrastructure layer for the next decade of deep learning and generative computing. Its massive software moat (CUDA) secures long-term market dominance.',
      shortTermView: 'Bullish momentum is intact, although expected to undergo occasional consolidation tests near the 20-day SMA.'
    };
  } else if (symbol === 'TSLA') {
    return {
      rating: 'Buy',
      sentiment: 'Bullish',
      confidenceScore: 78,
      riskLevel: 'Extreme',
      technicalSummary: 'Price broke out of a descending wedge pattern on high volume. Moving averages are forming a bullish convergence, but immediate overhead resistance at $260 must be cleared.',
      fundamentalSummary: 'Solid balance sheet with negligible debt. However, operating margins have compressed to 15.4% due to international vehicle price reductions. High retail holding creates price volatility.',
      momentum: 'Turning bullish. MACD completed a double bottom signal and crosses the zero line.',
      valuation: 'Rich PE multiple (58x). Price reflects expectations of autonomous driving network deployment rather than automotive sales alone.',
      institutionalActivity: 'FII holding stands at 44.5% with minor liquidations offset by index tracking additions.',
      newsSentiment: 'Optimistic about robotaxi prototypes, but tempered by short-term inventory clearance concerns.',
      growth: 'Full Self-Driving (FSD) software licensing, Tesla Energy storage margins, and next-gen low-cost vehicle rollout.',
      weakness: 'Slowing global EV adoption pace and aggressive margin compression due to competition in China.',
      suggestedEntry: 242.00,
      suggestedStoploss: 228.00,
      suggestedTarget: 290.00,
      longTermView: 'A high-risk, high-reward play. If Tesla successfully scales its autonomous ride-hailing network and humanoid robotics, its current valuation is exceptionally cheap.',
      shortTermView: 'Highly dependent on upcoming earnings declarations and delivery rate confirmations.'
    };
  } else if (symbol === 'HDFCBANK') {
    return {
      rating: 'Hold',
      sentiment: 'Neutral',
      confidenceScore: 65,
      riskLevel: 'Low',
      technicalSummary: 'Consolidating in a tight range ($1480 - $1540). RSI is at 45 (Neutral). Trading below its 50-day EMA, indicating short-term sluggishness.',
      fundamentalSummary: 'Sturdy financial base with merger synergies yet to fully play out. ROE of 17.2% is healthy. Low asset quality risks with stable Net Interest Margin (NIM) outlook.',
      momentum: 'Flat/Neutral. Histogram bars hover around zero. Lacks a clear directional trend.',
      valuation: 'Fairly valued compared to historical ranges. Currently trading at 2.8x Book Value, which is the lower end of its 5-year average.',
      institutionalActivity: 'DIIs are steadily accumulating shares on declines, while FIIs have marginally trimmed exposures.',
      newsSentiment: 'Mixed sentiment focusing on near-term loan-deposit ratio adjustments and merger costs.',
      growth: 'Wider geographic retail distribution network post-merger and cross-selling financial products.',
      weakness: 'Slow deposit growth rate compared to loan deployment and integration costs of merging systems.',
      suggestedEntry: 1490.00,
      suggestedStoploss: 1440.00,
      suggestedTarget: 1650.00,
      longTermView: 'A stable compounding asset. Essential core banking play for Indian economic expansion over a multi-year horizon.',
      shortTermView: 'Rangebound fluctuations. Recommended to accumulate on drops towards the lower support line.'
    };
  }

  // Default fallback template
  return {
    rating: isUp ? 'Buy' : 'Hold',
    sentiment: isUp ? 'Bullish' : 'Neutral',
    confidenceScore: 75,
    riskLevel: 'Medium',
    technicalSummary: `The stock is currently trading at ${stock.price}, exhibiting a ${stock.changePercent}% performance today. Simple moving averages indicate a supportive accumulation base around major levels.`,
    fundamentalSummary: `The firm shows a market cap of ${stock.marketCap}M with a P/E of ${stock.pe || 'N/A'}. A sound return profile is shown by a ROCE of ${stock.roce || 'N/A'}% and manageable debt ratios.`,
    momentum: isUp ? 'Positive short-term momentum backed by steady volume.' : 'Slight consolidation trend with stable volumes.',
    valuation: `The PE ratio of ${stock.pe || 'N/A'} is aligned with the sector averages. PB ratio is ${stock.pb || 'N/A'}x.`,
    institutionalActivity: `Solid promoter representation at ${stock.holdings.promoters}% and strong FII involvement at ${stock.holdings.fii}%.`,
    newsSentiment: 'Neutral to positive news flow with stable market chatter.',
    growth: `Opportunities lie in market share expansion in the ${stock.sector} sector and improved product margins.`,
    weakness: 'Potential risks include macroeconomic shifts and raw material price volatility.',
    suggestedEntry: parseFloat((stock.price * 0.97).toFixed(2)),
    suggestedStoploss: parseFloat((stock.price * 0.92).toFixed(2)),
    suggestedTarget: parseFloat((stock.price * 1.15).toFixed(2)),
    longTermView: 'Steady growth potential backed by structural market tailwinds and consistent capital allocation.',
    shortTermView: 'Consolidation inside a narrow band is expected before breaking out towards upper resistance targets.'
  };
}

// AI Chat Response simulator
export function generateAIChatResponse(query: string): { text: string; stocks?: string[]; chartData?: { name: string; value: number }[] } {
  const normalizedQuery = query.toLowerCase();
  
  if (normalizedQuery.includes('buy reliance') || normalizedQuery.includes('reliance') && normalizedQuery.includes('buy')) {
    return {
      text: `### AI Analysis: Reliance Industries (RELIANCE)
Based on current data, **Reliance Industries** is a **BUY** (Confidence Score: **84%**).

Here is a breakdown of why:
1. **Oil-to-Chemicals (O2C) Stabilization**: Refining margins are stabilizing with discount crude inputs.
2. **Retail & Telecom Monetization**: Jio AirFiber is scaling rapidly, and retail margins are expanding through digital channels.
3. **Green Energy Catalyst**: The Dhirubhai Ambani Green Energy Giga Complex is nearing commissioning, which will trigger massive valuation re-rating.

**Technical Outlook:**
* Live Price: ₹2,940.50 (+1.23% today)
* Support Zone: ₹2,850 - ₹2,880
* Suggested Target: ₹3,350 (14% upside)
* Suggested Stoploss: ₹2,790`,
      stocks: ['RELIANCE'],
      chartData: [
        { name: 'O2C Refining', value: 42 },
        { name: 'Digital/Jio', value: 33 },
        { name: 'Retail', value: 21 },
        { name: 'Others', value: 4 }
      ]
    };
  }
  
  if (normalizedQuery.includes('compare') || (normalizedQuery.includes('infosys') && normalizedQuery.includes('tcs'))) {
    return {
      text: `### Comparison: TCS vs Infosys (INFY)
Both companies represent top-tier Indian IT exports, but their profiles differ in terms of growth and capital allocation:

| Metric | TCS (Winner) | Infosys |
| :--- | :--- | :--- |
| **P/E Ratio** | 30.24x | **22.47x** (Cheaper) |
| **ROE** | **48.2%** | 31.8% |
| **ROCE** | **56.8%** | 39.5% |
| **Dividend Yield** | 1.25% | **2.53%** (Higher) |
| **Promoter Holding** | **72.41%** (High backing) | 14.94% |

**Summary Recommendation:**
* Choose **TCS** if you want industry-leading capital efficiency (ROCE > 50%), maximum stability, and solid promoter backing.
* Choose **Infosys** if you prefer a cheaper entry valuation (P/E of 22.4x) and a higher dividend yield (2.53%) to cushion short-term global slowdowns.`,
      stocks: ['TCS', 'INFY']
    };
  }

  if (normalizedQuery.includes('pe ratio') || normalizedQuery.includes('what is pe')) {
    return {
      text: `### What is the Price-to-Earnings (P/E) Ratio?
The **P/E Ratio** is the most widely used valuation multiple in finance. It tells you how much investors are willing to pay for every ₹1 (or $1) of net profit generated by a company.

$$\\text{P/E Ratio} = \\frac{\\text{Current Market Price}}{\\text{Earnings Per Share (EPS)}}$$

**How to Interpret It:**
1. **High P/E (e.g., NVIDIA - 73.3x)**: Indicates investors expect high future earnings growth. It is considered "expensive" unless growth rates justify the premium.
2. **Low P/E (e.g., Tata Motors - 11.3x)**: Could indicate that the stock is undervalued, or that the company has structural challenges causing investors to demand a lower entry price.

*Pro-tip: Always compare a stock's P/E to its historical average and its peer group inside the same sector.*`,
    };
  }

  if (normalizedQuery.includes('swing') || normalizedQuery.includes('best swing')) {
    return {
      text: `### Top Swing Trading Ideas
Based on current technical indicators (EMA Crossovers & RSI levels), here are the top swing setups:

1. **Tesla (TSLA)**
   * **Setup**: Broke out of a descending wedge pattern with high volume support.
   * **Entry**: Above ₹246
   * **Target**: ₹285 (15% target)
   * **Stoploss**: ₹232

2. **Tata Motors (TATAMOTORS)**
   * **Setup**: Bouncing off the 50-day EMA support with strong domestic sales data.
   * **Entry**: ₹935
   * **Target**: ₹1,040 (11% target)
   * **Stoploss**: ₹890`,
      stocks: ['TSLA', 'TATAMOTORS']
    };
  }

  if (normalizedQuery.includes('growth') || normalizedQuery.includes('best growth')) {
    return {
      text: `### Top Growth Stocks
Here are stocks filtered by high revenue growth (> 15%), high ROE (> 25%), and reasonable valuation multiples:

1. **Microsoft (MSFT)**: 15% revenue growth driven by cloud/Azure market shares. ROE at 38.5%.
2. **NVIDIA (NVDA)**: Exceptional net income expansion backed by AI demand. ROE at 69.2%.
3. **Infosys (INFY)**: Consistent execution with ROE at 31.8%. Cheaper P/E entry.`,
      stocks: ['MSFT', 'NVDA', 'INFY'],
      chartData: [
        { name: 'NVIDIA (ROE %)', value: 69 },
        { name: 'Microsoft (ROE %)', value: 38 },
        { name: 'Infosys (ROE %)', value: 31 },
        { name: 'TCS (ROE %)', value: 48 }
      ]
    };
  }

  // Default fallback
  return {
    text: `I've analyzed the markets for your query: "${query}". 
Here are some general stock opportunities meeting basic criteria. Let me know if you would like me to compare specific symbols or provide custom technical indicator breakdowns (like RSI, MACD, or Bollinger Bands) for any specific stock!`,
    stocks: ['AAPL', 'RELIANCE', 'TSLA']
  };
}

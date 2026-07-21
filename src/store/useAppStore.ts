import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { generateAIChatResponse, stocksDatabase } from '../data/mockData';

export interface User {
  email: string;
  name: string;
  avatarUrl?: string;
}

export interface Holding {
  symbol: string;
  qty: number;
  avgPrice: number;
}

export interface Transaction {
  id: string;
  symbol: string;
  type: 'buy' | 'sell';
  qty: number;
  price: number;
  date: string;
}

export interface Alert {
  id: string;
  symbol: string;
  type: 'price_above' | 'price_below' | 'volume_above' | 'rsi_above' | 'rsi_below';
  value: number;
  active: boolean;
}

export interface AlertNotification {
  id: string;
  symbol: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  date: string;
  stocks?: string[];
  chartData?: { name: string; value: number }[];
}

export type SubscriptionTier = 'free' | 'pro' | 'premium';

interface AppState {
  // Auth state
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, name?: string) => void;
  logout: () => void;
  
  // Watchlist state
  watchlists: Record<string, string[]>;
  activeWatchlist: string;
  createWatchlist: (name: string) => void;
  deleteWatchlist: (name: string) => void;
  addToWatchlist: (watchlist: string, symbol: string) => void;
  removeFromWatchlist: (watchlist: string, symbol: string) => void;
  pinnedStocks: string[];
  togglePinStock: (symbol: string) => void;
  recentSearches: string[];
  addRecentSearch: (symbol: string) => void;
  
  // Portfolio state
  portfolio: {
    holdings: Holding[];
    cash: number;
    transactions: Transaction[];
  };
  buyStock: (symbol: string, qty: number, price: number) => void;
  sellStock: (symbol: string, qty: number, price: number) => void;
  resetPortfolio: () => void;

  // Alerts state
  alerts: Alert[];
  notifications: AlertNotification[];
  createAlert: (symbol: string, type: Alert['type'], value: number) => void;
  deleteAlert: (id: string) => void;
  toggleAlertActive: (id: string) => void;
  markNotificationsRead: () => void;
  checkAlertTriggers: (symbol: string, currentPrice: number) => void;

  // AI Chat state
  chatMessages: ChatMessage[];
  sendChatMessage: (content: string) => void;
  clearChat: () => void;

  // Configuration / API Settings
  subscription: SubscriptionTier;
  setSubscription: (tier: SubscriptionTier) => void;
  apiKey: string;
  setApiKey: (key: string) => void;
  brokerConnected: boolean;
  connectBroker: () => void;
  disconnectBroker: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Auth Default State
      user: { email: 'investor@antigravity.ai', name: 'Tushar Raut', avatarUrl: '' },
      isAuthenticated: true, // Default to true for ease of preview, can be toggled
      login: (email, name) => set({
        user: { email, name: name || email.split('@')[0], avatarUrl: '' },
        isAuthenticated: true
      }),
      logout: () => set({ user: null, isAuthenticated: false }),

      // Watchlists Default State
      watchlists: {
        'My Core': ['TSLA', 'AAPL', 'NVDA', 'RELIANCE', 'TATAMOTORS'],
        'High Volatility': ['BTC', 'ETH', 'TSLA']
      },
      activeWatchlist: 'My Core',
      createWatchlist: (name) => set((state) => {
        if (state.watchlists[name]) return {};
        return { watchlists: { ...state.watchlists, [name]: [] } };
      }),
      deleteWatchlist: (name) => set((state) => {
        if (name === 'My Core') return {}; // Protect default
        const newWatchlists = { ...state.watchlists };
        delete newWatchlists[name];
        return {
          watchlists: newWatchlists,
          activeWatchlist: state.activeWatchlist === name ? 'My Core' : state.activeWatchlist
        };
      }),
      addToWatchlist: (watchlist, symbol) => set((state) => {
        const list = state.watchlists[watchlist] || [];
        if (list.includes(symbol)) return {};
        return {
          watchlists: {
            ...state.watchlists,
            [watchlist]: [...list, symbol]
          }
        };
      }),
      removeFromWatchlist: (watchlist, symbol) => set((state) => {
        const list = state.watchlists[watchlist] || [];
        return {
          watchlists: {
            ...state.watchlists,
            [watchlist]: list.filter((s) => s !== symbol)
          }
        };
      }),
      pinnedStocks: ['AAPL', 'RELIANCE', 'BTC'],
      togglePinStock: (symbol) => set((state) => {
        const isPinned = state.pinnedStocks.includes(symbol);
        return {
          pinnedStocks: isPinned
            ? state.pinnedStocks.filter((s) => s !== symbol)
            : [...state.pinnedStocks, symbol]
        };
      }),
      recentSearches: ['NVDA', 'RELIANCE', 'BTC'],
      addRecentSearch: (symbol) => set((state) => {
        const filtered = state.recentSearches.filter(s => s !== symbol);
        return {
          recentSearches: [symbol, ...filtered].slice(0, 5) // Keep last 5
        };
      }),

      // Portfolio Default State
      portfolio: {
        holdings: [
          { symbol: 'AAPL', qty: 25, avgPrice: 175.50 },
          { symbol: 'NVDA', qty: 10, avgPrice: 650.00 },
          { symbol: 'RELIANCE', qty: 50, avgPrice: 2800.00 },
          { symbol: 'BTC', qty: 0.15, avgPrice: 62000.00 }
        ],
        cash: 18500.00,
        transactions: [
          { id: 't1', symbol: 'AAPL', type: 'buy', qty: 25, price: 175.50, date: '2026-05-15' },
          { id: 't2', symbol: 'NVDA', type: 'buy', qty: 10, price: 650.00, date: '2026-06-02' },
          { id: 't3', symbol: 'RELIANCE', type: 'buy', qty: 50, price: 2800.00, date: '2026-06-10' },
          { id: 't4', symbol: 'BTC', type: 'buy', qty: 0.15, price: 62000.00, date: '2026-07-01' }
        ]
      },
      buyStock: (symbol, qty, price) => set((state) => {
        const cost = qty * price;
        if (state.portfolio.cash < cost) return {}; // Insufficient cash
        
        const existingHolding = state.portfolio.holdings.find(h => h.symbol === symbol);
        let newHoldings = [];
        
        if (existingHolding) {
          newHoldings = state.portfolio.holdings.map(h => {
            if (h.symbol === symbol) {
              const newQty = h.qty + qty;
              const newAvg = (h.qty * h.avgPrice + cost) / newQty;
              return { ...h, qty: newQty, avgPrice: parseFloat(newAvg.toFixed(2)) };
            }
            return h;
          });
        } else {
          newHoldings = [...state.portfolio.holdings, { symbol, qty, avgPrice: price }];
        }

        const newTx: Transaction = {
          id: 'tx-' + Math.random().toString(36).substr(2, 9),
          symbol,
          type: 'buy',
          qty,
          price,
          date: new Date().toISOString().split('T')[0]
        };

        return {
          portfolio: {
            holdings: newHoldings,
            cash: parseFloat((state.portfolio.cash - cost).toFixed(2)),
            transactions: [newTx, ...state.portfolio.transactions]
          }
        };
      }),
      sellStock: (symbol, qty, price) => set((state) => {
        const existingHolding = state.portfolio.holdings.find(h => h.symbol === symbol);
        if (!existingHolding || existingHolding.qty < qty) return {}; // Insufficient qty

        const proceeds = qty * price;
        const newHoldings = state.portfolio.holdings
          .map(h => {
            if (h.symbol === symbol) {
              return { ...h, qty: h.qty - qty };
            }
            return h;
          })
          .filter(h => h.qty > 0);

        const newTx: Transaction = {
          id: 'tx-' + Math.random().toString(36).substr(2, 9),
          symbol,
          type: 'sell',
          qty,
          price,
          date: new Date().toISOString().split('T')[0]
        };

        return {
          portfolio: {
            holdings: newHoldings,
            cash: parseFloat((state.portfolio.cash + proceeds).toFixed(2)),
            transactions: [newTx, ...state.portfolio.transactions]
          }
        };
      }),
      resetPortfolio: () => set({
        portfolio: { holdings: [], cash: 100000.00, transactions: [] } // Start fresh with $100k
      }),

      // Alerts
      alerts: [
        { id: 'a1', symbol: 'TSLA', type: 'price_above', value: 260.00, active: true },
        { id: 'a2', symbol: 'BTC', type: 'price_below', value: 65000.00, active: true }
      ],
      notifications: [
        {
          id: 'n1',
          symbol: 'NVDA',
          title: 'Price Alert Triggered',
          message: 'NVIDIA Corporation (NVDA) crossed above your alert price of ₹850.00. Current price: ₹875.12.',
          date: '2026-07-11 14:35',
          read: false
        }
      ],
      createAlert: (symbol, type, value) => set((state) => {
        const newAlert: Alert = {
          id: 'alert-' + Math.random().toString(36).substr(2, 9),
          symbol,
          type,
          value,
          active: true
        };
        return { alerts: [newAlert, ...state.alerts] };
      }),
      deleteAlert: (id) => set((state) => ({
        alerts: state.alerts.filter(a => a.id !== id)
      })),
      toggleAlertActive: (id) => set((state) => ({
        alerts: state.alerts.map(a => a.id === id ? { ...a, active: !a.active } : a)
      })),
      markNotificationsRead: () => set((state) => ({
        notifications: state.notifications.map(n => ({ ...n, read: true }))
      })),
      checkAlertTriggers: (symbol, currentPrice) => set((state) => {
        const triggered: Alert[] = [];
        const newAlerts = state.alerts.map(alert => {
          if (alert.symbol.toUpperCase() === symbol.toUpperCase() && alert.active) {
            let matches = false;
            if (alert.type === 'price_above' && currentPrice >= alert.value) matches = true;
            if (alert.type === 'price_below' && currentPrice <= alert.value) matches = true;
            
            if (matches) {
              triggered.push(alert);
              return { ...alert, active: false }; // deactivate triggered alert
            }
          }
          return alert;
        });

        if (triggered.length === 0) return {};

        const newNotifications = triggered.map(alert => ({
          id: 'notif-' + Math.random().toString(36).substr(2, 9),
          symbol: alert.symbol,
          title: `Alert Triggered: ${alert.symbol}`,
          message: `${alert.symbol} met trigger parameters (${alert.type.replace('_', ' ')} ${alert.value}). Current price: ₹${currentPrice.toFixed(2)}.`,
          date: new Date().toISOString().replace('T', ' ').substr(0, 16),
          read: false
        }));

        return {
          alerts: newAlerts,
          notifications: [...newNotifications, ...state.notifications]
        };
      }),

      // AI Chat
      chatMessages: [
        {
          id: 'msg-start',
          role: 'assistant',
          content: `Hello! I am your AI Market Assistant. I can help you analyze fundamentals, review charts, identify breakout opportunities, or compare equities. 

Here are some questions you can ask me:
* "Should I buy Reliance?"
* "Compare Infosys vs TCS"
* "Explain PE Ratio and how to use it"
* "Give me some swing trading stocks"
* "Which are the best growth stocks to buy right now?"`,
          date: new Date().toISOString()
        }
      ],
      sendChatMessage: (content) => set((state) => {
        const userMsg: ChatMessage = {
          id: 'msg-' + Math.random().toString(36).substr(2, 9),
          role: 'user',
          content,
          date: new Date().toISOString()
        };

        const response = generateAIChatResponse(content);

        const assistantMsg: ChatMessage = {
          id: 'msg-' + Math.random().toString(36).substr(2, 9),
          role: 'assistant',
          content: response.text,
          date: new Date().toISOString(),
          stocks: response.stocks,
          chartData: response.chartData
        };

        return {
          chatMessages: [...state.chatMessages, userMsg, assistantMsg]
        };
      }),
      clearChat: () => set({
        chatMessages: [
          {
            id: 'msg-start',
            role: 'assistant',
            content: `Chat history cleared. How can I help you analyze markets today?`,
            date: new Date().toISOString()
          }
        ]
      }),

      // Configuration Settings
      subscription: 'pro', // Free, Pro, Premium
      setSubscription: (tier) => set({ subscription: tier }),
      apiKey: '',
      setApiKey: (key) => set({ apiKey: key }),
      brokerConnected: false,
      connectBroker: () => set({ brokerConnected: true }),
      disconnectBroker: () => set({ brokerConnected: false })
    }),
    {
      name: 'antigravity-stock-state',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        watchlists: state.watchlists,
        activeWatchlist: state.activeWatchlist,
        pinnedStocks: state.pinnedStocks,
        recentSearches: state.recentSearches,
        portfolio: state.portfolio,
        alerts: state.alerts,
        notifications: state.notifications,
        chatMessages: state.chatMessages,
        subscription: state.subscription,
        apiKey: state.apiKey,
        brokerConnected: state.brokerConnected
      })
    }
  )
);

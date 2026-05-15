'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { CheckCircle2, XCircle, Info, AlertTriangle, X } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface Toast {
  id: number;
  type: ToastType;
  title: string;
  message?: string;
}

interface ToastContextValue {
  showToast: (type: ToastType, title: string, message?: string) => void;
}

const ToastContext = createContext<ToastContextValue>({ showToast: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

const icons = {
  success: <CheckCircle2 size={18} />,
  error: <XCircle size={18} />,
  info: <Info size={18} />,
  warning: <AlertTriangle size={18} />,
};

const styles = {
  success: { bg: 'rgba(16,185,129,0.12)', border: 'rgba(16,185,129,0.3)', color: '#10b981', bar: '#10b981' },
  error:   { bg: 'rgba(239,68,68,0.12)',  border: 'rgba(239,68,68,0.3)',  color: '#ef4444', bar: '#ef4444' },
  info:    { bg: 'rgba(59,130,246,0.12)', border: 'rgba(59,130,246,0.3)', color: '#3b82f6', bar: '#3b82f6' },
  warning: { bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.3)', color: '#f59e0b', bar: '#f59e0b' },
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((type: ToastType, title: string, message?: string) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  }, []);

  const remove = (id: number) => setToasts(prev => prev.filter(t => t.id !== id));

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast container */}
      <div className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-3 max-w-sm w-full pointer-events-none">
        {toasts.map(t => {
          const s = styles[t.type];
          return (
            <div key={t.id}
              className="pointer-events-auto animate-slide-left rounded-2xl px-4 py-3.5 flex items-start gap-3 shadow-2xl"
              style={{
                background: 'rgba(255,255,255,0.97)',
                backdropFilter: 'blur(20px)',
                border: `1px solid ${s.border}`,
                boxShadow: `0 8px 32px rgba(0,0,0,0.12), 0 0 0 1px ${s.border}`,
              }}>
              {/* Left color bar */}
              <div className="absolute left-0 top-3 bottom-3 w-1 rounded-full" style={{ background: s.bar }}/>

              {/* Icon */}
              <div className="flex-shrink-0 mt-0.5" style={{ color: s.color }}>
                {icons[t.type]}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold" style={{ color: '#0f172a' }}>{t.title}</p>
                {t.message && (
                  <p className="text-xs font-medium mt-0.5" style={{ color: '#64748b' }}>{t.message}</p>
                )}
              </div>

              {/* Close */}
              <button onClick={() => remove(t.id)} className="flex-shrink-0 mt-0.5 transition-opacity hover:opacity-60">
                <X size={14} style={{ color: '#94a3b8' }}/>
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

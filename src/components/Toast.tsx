import React, { useEffect } from 'react';
import { CheckCircle2, X } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
  onAction?: () => void;
  actionLabel?: string;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose, onAction, actionLabel }) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl flex items-center justify-between gap-3 animate-in fade-in slide-in-from-bottom-5 duration-200">
      <div className="flex items-center gap-2.5 min-w-0">
        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
        <p className="text-sm font-medium truncate text-slate-100">{message}</p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        {onAction && actionLabel && (
          <button
            onClick={() => {
              onAction();
              onClose();
            }}
            className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 underline underline-offset-2 transition-colors cursor-pointer"
          >
            {actionLabel}
          </button>
        )}
        <button
          onClick={onClose}
          aria-label="Close notification"
          className="text-slate-400 hover:text-white p-1 rounded-md transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

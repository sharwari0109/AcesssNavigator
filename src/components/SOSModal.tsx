import { useState, useEffect, useRef } from 'react';
import { Phone, Share2, MapPin, X, Siren, User } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Button } from './ui/Button';

export function SOSModal() {
  const { sosActive, setSosActive, showToast, navigate } = useApp();
  const [countdown, setCountdown] = useState(3);
  const [holding, setHolding] = useState(false);
  const [activated, setActivated] = useState(false);
  const holdTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const reset = () => {
    setHolding(false);
    setCountdown(3);
    setActivated(false);
    if (holdTimer.current) clearTimeout(holdTimer.current);
    if (countdownRef.current) clearInterval(countdownRef.current);
  };

  const startHold = () => {
    setHolding(true);
    setCountdown(3);

    countdownRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          if (countdownRef.current) clearInterval(countdownRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    holdTimer.current = setTimeout(() => {
      setActivated(true);
      setSosActive(true);
      if (countdownRef.current) clearInterval(countdownRef.current);
    }, 3000);
  };

  const cancelHold = () => {
    if (!activated) {
      setHolding(false);
      setCountdown(3);
      if (holdTimer.current) clearTimeout(holdTimer.current);
      if (countdownRef.current) clearInterval(countdownRef.current);
    }
  };

  useEffect(() => {
    return () => {
      if (holdTimer.current) clearTimeout(holdTimer.current);
      if (countdownRef.current) clearInterval(countdownRef.current);
    };
  }, []);

  const handleClose = () => {
    reset();
    setSosActive(false);
    navigate('home');
  };

  const simulateAction = (action: string) => {
    showToast(`${action} (simulated)`, 'success');
  };

  return (
    <div className="fixed inset-0 z-[60] flex flex-col bg-danger-950/95 backdrop-blur-sm animate-fade-in">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2 text-white">
          <Siren className="w-6 h-6" />
          <span className="font-bold text-lg">SOS Emergency</span>
        </div>
        <button
          onClick={handleClose}
          aria-label="Close SOS"
          className="p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors touch-target"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6">
        {!activated ? (
          <>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Need immediate help?</h2>
              <p className="text-danger-200 text-lg">Press and hold for 3 seconds to activate SOS</p>
            </div>

            <button
              onMouseDown={startHold}
              onMouseUp={cancelHold}
              onMouseLeave={cancelHold}
              onTouchStart={startHold}
              onTouchEnd={cancelHold}
              aria-label="Press and hold to activate SOS"
              className={`relative w-40 h-40 rounded-full flex items-center justify-center transition-all duration-200 touch-target ${holding ? 'scale-105' : 'scale-100'}`}
            >
              <span className={`absolute inset-0 rounded-full bg-danger-500/30 ${holding ? 'animate-pulse-ring' : 'animate-pulse-ring'}`} aria-hidden="true" />
              <span className="absolute inset-2 rounded-full bg-danger-600 shadow-card-lg" />
              <span className="relative z-10 flex flex-col items-center text-white">
                {holding ? (
                  <span className="text-5xl font-extrabold">{countdown}</span>
                ) : (
                  <>
                    <Siren className="w-14 h-14 mb-1" strokeWidth={2.5} />
                    <span className="text-xl font-extrabold tracking-wider">SOS</span>
                  </>
                )}
              </span>
            </button>

            <p className="text-danger-200 text-sm mt-6 text-center max-w-xs">
              This will simulate an emergency alert. No actual calls will be made in this prototype.
            </p>
          </>
        ) : (
          <div className="w-full max-w-sm animate-scale-in">
            <div className="text-center mb-8">
              <div className="w-24 h-24 rounded-full bg-danger-500 mx-auto flex items-center justify-center mb-4 animate-bounce-soft">
                <Siren className="w-12 h-12 text-white" strokeWidth={2.5} />
              </div>
              <h2 className="text-3xl font-extrabold text-white tracking-wide mb-2">SOS ACTIVATED</h2>
              <p className="text-danger-200">Emergency assistance is ready</p>
            </div>

            <div className="bg-white rounded-2xl p-4 mb-4">
              <div className="flex items-center gap-2 text-ink-700 mb-2">
                <MapPin className="w-5 h-5 text-primary-600" />
                <div>
                  <p className="font-semibold text-sm">Current location</p>
                  <p className="text-xs text-ink-500">Bandra West, Mumbai, MH</p>
                </div>
              </div>
              <p className="text-2xs font-semibold text-success-600">Last updated just now</p>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => simulateAction('Calling Emergency Services (112)')}
                className="w-full flex items-center gap-3 p-4 rounded-2xl bg-white hover:bg-danger-50 transition-colors text-left"
              >
                <div className="w-11 h-11 rounded-xl bg-danger-600 flex items-center justify-center text-white">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-ink-900">Call Emergency Services</p>
                  <p className="text-sm text-ink-500">Dial 112 immediately</p>
                </div>
              </button>

              <button
                onClick={() => simulateAction('Calling Emergency Contact')}
                className="w-full flex items-center gap-3 p-4 rounded-2xl bg-white hover:bg-primary-50 transition-colors text-left"
              >
                <div className="w-11 h-11 rounded-xl bg-primary-600 flex items-center justify-center text-white">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-ink-900">Call Emergency Contact</p>
                  <p className="text-sm text-ink-500">Mom — +91 98XXX XXXXX</p>
                </div>
              </button>

              <button
                onClick={() => simulateAction('Location shared with contacts')}
                className="w-full flex items-center gap-3 p-4 rounded-2xl bg-white hover:bg-accent-50 transition-colors text-left"
              >
                <div className="w-11 h-11 rounded-xl bg-accent-600 flex items-center justify-center text-white">
                  <Share2 className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-ink-900">Share Current Location</p>
                  <p className="text-sm text-ink-500">Send to emergency contacts</p>
                </div>
              </button>
            </div>

            <Button
              fullWidth
              size="lg"
              variant="ghost"
              onClick={handleClose}
              className="mt-6 text-white hover:bg-white/10"
            >
              Cancel SOS
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

import {StrictMode, useEffect, useMemo, useState} from 'react';
import {createRoot} from 'react-dom/client';
import {AlertTriangle, Check, CircleSlash, X} from 'lucide-react';
import './styles.css';

type AuthPopupState = 'complete' | 'cancelled' | 'invalid' | 'unavailable';

const allowedStates = new Set<AuthPopupState>([
  'complete',
  'cancelled',
  'invalid',
  'unavailable',
]);

const stateCopy: Record<
  AuthPopupState,
  {
    icon: typeof Check;
    eyebrow: string;
    title: string;
    body: string;
    tone: string;
  }
> = {
  complete: {
    icon: Check,
    eyebrow: 'Connected',
    title: "You're all set here.",
    body: 'Return to Squigit to finish signing in.',
    tone: 'complete',
  },
  cancelled: {
    icon: X,
    eyebrow: 'Cancelled',
    title: 'Sign-in was cancelled.',
    body: 'Nothing changed in Squigit. You can close this tab.',
    tone: 'cancelled',
  },
  invalid: {
    icon: AlertTriangle,
    eyebrow: 'Not completed',
    title: "Squigit couldn't finish sign-in.",
    body: 'Return to Squigit and start Google sign-in again.',
    tone: 'invalid',
  },
  unavailable: {
    icon: CircleSlash,
    eyebrow: 'Unavailable',
    title: 'Nothing to complete here.',
    body: 'Start Google sign-in from the Squigit app.',
    tone: 'unavailable',
  },
};

function currentState(): AuthPopupState {
  const hash = window.location.hash.replace(/^#/, '') as AuthPopupState;
  return allowedStates.has(hash) ? hash : 'unavailable';
}

function AuthPopup() {
  const [state, setState] = useState<AuthPopupState>(() => currentState());
  const content = stateCopy[state];
  const Icon = content.icon;

  useEffect(() => {
    const onHashChange = () => setState(currentState());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    if (state !== 'complete' && state !== 'cancelled') return;
    const timer = window.setTimeout(() => window.close(), 900);
    return () => window.clearTimeout(timer);
  }, [state]);

  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <main className="auth-popup" data-state={content.tone}>
      <section className="auth-panel" aria-labelledby="auth-title">
        <div className="brand" aria-label="Squigit">
          <span className="brand-mark" aria-hidden="true">S</span>
          <span>Squigit</span>
        </div>
        <div className="status-icon" aria-hidden="true">
          <Icon size={24} strokeWidth={2.2} />
        </div>
        <p className="eyebrow">{content.eyebrow}</p>
        <h1 id="auth-title">{content.title}</h1>
        <p className="body-copy">{content.body}</p>
        <p className="hint">This tab can be closed.</p>
      </section>
      <footer>© {year} Squigit</footer>
    </main>
  );
}

createRoot(document.getElementById('auth-popup-root')!).render(
  <StrictMode>
    <AuthPopup />
  </StrictMode>,
);

import {StrictMode, useEffect, useMemo, useState} from 'react';
import {createRoot} from 'react-dom/client';
import {AlertTriangle, Check, CircleSlash, LoaderCircle, X} from 'lucide-react';
import './styles.css';

type AuthPopupState = 'handoff' | 'success' | 'cancelled' | 'invalid' | 'unavailable';
const appCallbackUrl = 'org.squigit.app:/oauth2redirect/google';

const allowedStates = new Set<AuthPopupState>([
  'handoff',
  'success',
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
  handoff: {
    icon: LoaderCircle,
    eyebrow: 'Opening Squigit',
    title: 'Finishing sign-in.',
    body: 'Approve the browser prompt to return to Squigit.',
    tone: 'handoff',
  },
  success: {
    icon: Check,
    eyebrow: 'Sent to Squigit',
    title: 'Return to Squigit.',
    body: 'Squigit is finishing sign-in locally. This browser tab can be closed.',
    tone: 'success',
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
    eyebrow: 'Not successd',
    title: "Squigit couldn't finish sign-in.",
    body: 'Return to Squigit and start Google sign-in again.',
    tone: 'invalid',
  },
  unavailable: {
    icon: CircleSlash,
    eyebrow: 'Unavailable',
    title: 'Nothing to success here.',
    body: 'Start Google sign-in from the Squigit app.',
    tone: 'unavailable',
  },
};

function oauthCallbackParams() {
  const params = new URLSearchParams(window.location.search);
  const hasOAuthResult = params.has('code') || params.has('error');
  const hasState = params.has('state');
  return hasOAuthResult && hasState ? params : null;
}

function handoffUrl(params: URLSearchParams) {
  const url = new URL(appCallbackUrl);
  url.search = params.toString();
  return url.toString();
}

function currentState(): AuthPopupState {
  if (oauthCallbackParams()) return 'handoff';
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
    const params = oauthCallbackParams();
    if (!params) return;

    window.history.replaceState(null, document.title, `${window.location.pathname}#handoff`);
    window.location.href = handoffUrl(params);
    const timer = window.setTimeout(() => {
      const error = params.get('error');
      const nextState = error === 'access_denied' ? 'cancelled' : error ? 'invalid' : 'success';
      setState(nextState);
      window.history.replaceState(null, document.title, `${window.location.pathname}#${nextState}`);
    }, 1600);

    return () => window.clearTimeout(timer);
  }, []);

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

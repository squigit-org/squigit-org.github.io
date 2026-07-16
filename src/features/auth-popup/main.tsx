import {StrictMode, useEffect, useState} from 'react';
import {createRoot} from 'react-dom/client';
import {TextEffectTwo} from 'react-text-animate';
import {Footer, Header} from '@/components/layout';
import {Button, HeroCard} from '@/components/ui';
import '../../index.css';
import './styles.css';

type AuthState = 'success' | 'invalid' | 'unavailable';

const appCallbackUrl = 'org.squigit.app:/oauth2redirect/google';
const AUTH_TEXT_EFFECT = {
  animationDuration: 0.5,
  staggerDuration: 0.13,
  initialDelay: 0,
  filter: true,
} as const;

const authCopy: Record<AuthState, {title: string; subtitle: string}> = {
  success: {
    title: 'You have successfully authenticated.',
    subtitle: "You can close this tab and go back to Squigit.",
  },
  invalid: {
    title: 'There was an unexpected issue setting up your account.',
    subtitle:
      'We were unable to complete authentication.',
  },
  unavailable: {
    title: '404 Not Found',
    subtitle: "The page you're looking for doesn't exist or has been moved.",
  },
};

function oauthCallbackState(): AuthState | null {
  const params = new URLSearchParams(window.location.search);

  if (params.has('error')) {
    return 'invalid';
  }

  if (params.has('code') && params.has('state')) {
    return 'success';
  }

  return null;
}

function currentAuthState(): AuthState {
  const oauthState = oauthCallbackState();

  if (oauthState) {
    return oauthState;
  }

  return window.location.hash.replace(/^#/, '') === 'success'
    ? 'success'
    : window.location.hash.replace(/^#/, '') === 'invalid'
      ? 'invalid'
      : 'unavailable';
}

function squigitDeepLink() {
  const url = new URL(appCallbackUrl);
  url.search = window.location.search;
  return url.toString();
}

function openSquigit() {
  window.location.href = squigitDeepLink();
}

function openUseCases() {
  window.dispatchEvent(new Event('squigit:open-use-cases'));
}

function AuthPopup() {
  const [state, setState] = useState<AuthState>(() => currentAuthState());
  const [showSuccessMeta, setShowSuccessMeta] = useState(false);
  const copy = authCopy[state];
  const canOpenSquigit = state === 'success';
  const titleBaseClassName =
    'text-center font-semibold leading-[1.02] tracking-[-0.045em] text-slate-950';
  const titleClassName = canOpenSquigit
    ? `${titleBaseClassName} text-4xl`
    : `${titleBaseClassName} text-[1.5rem]`;

  useEffect(() => {
    const syncState = () => setState(currentAuthState());
    window.addEventListener('hashchange', syncState);
    return () => window.removeEventListener('hashchange', syncState);
  }, []);

  useEffect(() => {
    if (!canOpenSquigit) {
      setShowSuccessMeta(false);
      return;
    }

    const wordCount = copy.title.trim().split(/\s+/).length;
    const totalDurationMs =
      (AUTH_TEXT_EFFECT.initialDelay +
        AUTH_TEXT_EFFECT.animationDuration +
        Math.max(wordCount - 1, 0) * AUTH_TEXT_EFFECT.staggerDuration) *
      1000;
    const timeoutId = window.setTimeout(() => {
      setShowSuccessMeta(true);
    }, totalDurationMs);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [canOpenSquigit, copy.title]);

  return (
    <main className="auth-popup">
      <HeroCard
        animateMeta={canOpenSquigit}
        showMeta={canOpenSquigit ? showSuccessMeta : true}
        className="mt-0 sm:mt-0"
        actionsClassName="mt-10"
        text={
          canOpenSquigit ? (
            <TextEffectTwo
              animateOnce
              key={copy.title}
              className={titleClassName}
              text={copy.title}
              animationDuration={AUTH_TEXT_EFFECT.animationDuration}
              staggerDuration={AUTH_TEXT_EFFECT.staggerDuration}
              initialDelay={AUTH_TEXT_EFFECT.initialDelay}
              filter={AUTH_TEXT_EFFECT.filter}
            />
          ) : (
            <h1 className={titleClassName}>{copy.title}</h1>
          )
        }
        supportingText={
          <p className="max-w-2xl text-center text-xl font-medium leading-8 tracking-normal text-slate-700 sm:text-2xl sm:leading-9">
            {copy.subtitle}
          </p>
        }
        primaryButton={
          canOpenSquigit ? (
            <Button
              size="lg"
              onClick={openSquigit}
              className="h-12 rounded-full bg-slate-950 px-7 text-[1.03rem] text-white hover:bg-slate-800 cursor-pointer"
            >
              Open Squigit
            </Button>
          ) : undefined
        }
        secondaryButton={
          canOpenSquigit ? (
            <Button
              size="lg"
              onClick={openUseCases}
              className="h-12 rounded-full bg-transparent px-5 text-[1.03rem] text-black cursor-pointer"
            >
              Explore use cases
            </Button>
          ) : undefined
        }
      />
    </main>
  );
}

function AuthPopupPage() {
  return (
    <>
      <Header navigationScope="site" hiddenItems={['products', 'pricing']} />
      <AuthPopup />
      <Footer navigationScope="site" />
    </>
  );
}

createRoot(document.getElementById('auth-popup-root')!).render(
  <StrictMode>
    <AuthPopupPage />
  </StrictMode>,
);

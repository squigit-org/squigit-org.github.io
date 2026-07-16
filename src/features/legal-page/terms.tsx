import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {TermsPage} from './LegalPage';

createRoot(document.getElementById('legal-root')!).render(
  <StrictMode>
    <TermsPage />
  </StrictMode>,
);

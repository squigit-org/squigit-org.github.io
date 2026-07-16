import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {PrivacyPage} from './LegalPage';

createRoot(document.getElementById('legal-root')!).render(
  <StrictMode>
    <PrivacyPage />
  </StrictMode>,
);

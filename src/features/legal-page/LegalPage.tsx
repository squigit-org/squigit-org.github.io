import type {ReactNode} from 'react';
import {Footer} from '@/components/layout';
import {LINKS} from '@/lib';
import '../../index.css';

type LegalPageProps = {
  title: string;
  children: ReactNode;
};

function LegalPage({title, children}: LegalPageProps) {
  return (
    <div className="min-h-screen bg-white text-slate-950">
      <main className="mx-auto max-w-[840px] px-4 py-12 sm:px-6 sm:py-16">
        <section className="mb-8 border-b border-slate-200 pb-7">
          <h1 className="text-4xl font-semibold leading-tight tracking-normal sm:text-6xl">
            {title}
          </h1>
          <p className="mt-3 text-base text-slate-600">
            <strong>Last Updated:</strong> March 24, 2026
          </p>
        </section>

        <div className="space-y-7 text-base leading-7 text-slate-700 [&_a]:underline [&_a]:decoration-slate-400 [&_a]:underline-offset-4 [&_h2]:pt-2 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:leading-tight [&_h2]:text-slate-950 [&_li+li]:mt-2 [&_strong]:font-semibold [&_strong]:text-slate-950 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
          {children}
        </div>
      </main>
      <Footer navigationScope="site" bottomLinks="home" />
    </div>
  );
}

export function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy">
      <p>
        Squigit is an open-source, local-first desktop application. We believe
        your data belongs to you. This Privacy Policy explains how we handle
        your information, specifically regarding our use of Google APIs and
        third-party integrations.
      </p>

      <h2>Google API Services User Data Policy</h2>
      <p>
        Squigit&apos;s use and transfer of information received from Google APIs
        to any other app will adhere to the{' '}
        <a href="https://developers.google.com/terms/api-services-user-data-policy">
          Google API Services User Data Policy
        </a>
        , including the Limited Use requirements.
      </p>

      <h2>What data we collect and why</h2>
      <p>
        When you sign in using Google OAuth, Squigit requests access to your
        basic profile information: name, email, and avatar.
      </p>
      <ul>
        <li>
          <strong>Purpose:</strong> This data is used exclusively to create a
          local profile on your machine to personalize the application
          interface, such as displaying your avatar and name.
        </li>
        <li>
          <strong>Data Storage:</strong> This information is stored locally on
          your device. It is never transmitted to, stored on, or processed by
          any servers controlled by the Squigit developers.
        </li>
      </ul>

      <h2>Local-First and Zero-Trust Architecture</h2>
      <p>
        Because Squigit analyzes your screen and text, your privacy is our
        highest priority:
      </p>
      <ul>
        <li>
          <strong>No Telemetry or Backend:</strong> Squigit has no backend
          database or central server. Your conversations, images, and history
          never leave your local machine unless you explicitly trigger an AI
          feature.
        </li>
        <li>
          <strong>Encrypted API Keys:</strong> Squigit operates on a Bring Your
          Own Key model. Your API keys, such as Google AI Studio and ImgBB keys,
          are hashed and stored locally using AES-256 encryption. We cannot read
          them.
        </li>
        <li>
          <strong>Stateless API Requests:</strong> When you use AI features,
          requests are sent directly from your machine to your chosen provider,
          such as Google or ImgBB. There is no middleman server intercepting or
          logging your prompts and completions.
        </li>
      </ul>

      <h2>Third-Party Integrations and Google Lens Feature</h2>
      <p>Squigit includes a reverse image search feature using Google Lens.</p>
      <ul>
        <li>
          <strong>How it works:</strong> To send a local image to the web-based
          Google Lens service, Squigit uses the ImgBB API as a temporary image
          host.
        </li>
        <li>
          <strong>Warning:</strong> If you use this feature, your selected
          screenshot will be uploaded to ImgBB and will be accessible via a
          public URL to process the search. Do not use the Lens feature for
          images containing sensitive personal or confidential data.
        </li>
      </ul>

      <h2>Support and Diagnostics</h2>
      <p>
        If you choose to contact our support team or submit a bug report via
        GitHub, basic system information, such as your OS, Squigit version, and
        backend engine status, may be included to help us troubleshoot. You have
        full control over what is sent in these reports.
      </p>

      <h2>Contact</h2>
      <p>
        If you have any questions about this Privacy Policy, please open an
        issue on our <a href={LINKS.squigit.repository}>GitHub repository</a>.
      </p>
    </LegalPage>
  );
}

export function TermsPage() {
  return (
    <LegalPage title="Terms of Service">
      <p>
        By downloading, installing, and using Squigit, you agree to the
        following terms.
      </p>

      <h2>1. Bring Your Own Key Model</h2>
      <p>
        Squigit operates as a direct client application. We do not resell API
        access or provide built-in AI generation capabilities.
      </p>
      <ul>
        <li>
          You are required to provide your own API keys, such as keys from
          Google AI Studio or ImgBB, to use cloud-based features.
        </li>
        <li>
          You are solely responsible for managing these keys, including any
          costs, quotas, or billing limits incurred directly with those
          third-party providers. Squigit takes no responsibility for unexpected
          API charges.
        </li>
      </ul>

      <h2>2. Third-Party Services and Risks</h2>
      <p>Squigit integrates with third-party services for certain features:</p>
      <ul>
        <li>
          <strong>Google Lens and ImgBB:</strong> The reverse image search
          feature uploads your selected image to ImgBB to generate a public URL
          for Google Lens. You acknowledge that images processed through this
          feature are temporarily hosted publicly. You agree not to use this
          feature for sensitive, personal, or confidential information. You
          assume all risk associated with uploading images to these third-party
          services.
        </li>
      </ul>

      <h2>3. Acceptable Use</h2>
      <p>
        You agree to use Squigit in compliance with all applicable local, state,
        national, and international laws. You also agree to adhere to our{' '}
        <a href={`${LINKS.squigit.repository}/blob/main/docs/07-policies/CODE_OF_CONDUCT.md`}>
          Code of Conduct
        </a>{' '}
        when interacting with the Squigit community and repository.
      </p>

      <h2>4. License and Disclaimer of Warranties</h2>
      <p>
        Squigit is open-source software released under the{' '}
        <strong>Apache License, Version 2.0</strong>.
      </p>
      <p>
        THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY
        KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
        MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
        IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
        CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
        TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
        SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
      </p>
      <p>
        For the full license text, please see the{' '}
        <a href={`${LINKS.squigit.repository}/blob/main/LICENSE`}>LICENSE</a>{' '}
        file in the root of the repository.
      </p>
    </LegalPage>
  );
}

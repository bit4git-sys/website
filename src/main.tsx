import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop.tsx';
import App from './App.tsx';
import WebDevelopmentPage from './pages/WebDevelopmentPage.tsx';
import AppDevelopmentPage from './pages/AppDevelopmentPage.tsx';
import CloudServicesPage from './pages/CloudServicesPage.tsx';
import ITServicesPage from './pages/ITServicesPage.tsx';
import CybersecurityPage from './pages/CybersecurityPage.tsx';
import ITConsultingPage from './pages/ITConsultingPage.tsx';
import CareersPage from './pages/CareersPage.tsx';
import './index.css';

const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <defs>
    <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="#3BAFDA"/>
      <stop offset="1" stop-color="#8C75FF"/>
    </linearGradient>
  </defs>
  <path d="M34 6l-18 26h12l-4 20 22-28H36l6-18z" fill="url(#g)"/>
</svg>`;
const faviconDataUrl = `data:image/svg+xml;utf8,${encodeURIComponent(logoSvg)}`;
let faviconLink = document.querySelector('link[rel="icon"]') as HTMLLinkElement | null;
if (!faviconLink) {
  faviconLink = document.createElement('link');
  faviconLink.rel = 'icon';
  document.head.appendChild(faviconLink);
}
faviconLink.type = 'image/svg+xml';
faviconLink.href = faviconDataUrl;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/website-development" element={<WebDevelopmentPage />} />
        <Route path="/webdevelopment" element={<WebDevelopmentPage />} />
        <Route path="/app-development" element={<AppDevelopmentPage />} />
        <Route path="/appdevelopment" element={<AppDevelopmentPage />} />
        <Route path="/cloud-services" element={<CloudServicesPage />} />
        <Route path="/it-services" element={<ITServicesPage />} />
        <Route path="/cybersecurity" element={<CybersecurityPage />} />
        <Route path="/it-consulting" element={<ITConsultingPage />} />
        <Route path="/careers" element={<CareersPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

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
import InternshipPage from './pages/InternshipPage.tsx';
import './index.css';

const faviconUrl = new URL('./logo/logo.png', import.meta.url).href;
let faviconLink = document.querySelector('link[rel="icon"]') as HTMLLinkElement | null;
if (!faviconLink) {
  faviconLink = document.createElement('link');
  faviconLink.rel = 'icon';
  document.head.appendChild(faviconLink);
}
faviconLink.type = 'image/png';
faviconLink.href = faviconUrl;

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
        <Route path="/internship" element={<InternshipPage />} />
        <Route path="/insternship" element={<InternshipPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

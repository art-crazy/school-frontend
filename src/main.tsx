import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from "./shared/components/Layout";
import Home from "@/pages/Home";
import Policy from "@/pages/policy";
import OfferAgreementPage from "@/pages/offerAgreementPage";
import {YandexMetrika} from "@/shared/components/Yandex/YandexMetrika.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Router>
            <YandexMetrika/>
            <Layout>
                <Routes>
                    <Route path="/oferta" element={<OfferAgreementPage />} />
                    <Route path="/policy" element={<Policy />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/plan" element={<Home />} />
                    <Route path="/methods" element={<Home />} />
                    <Route path="/services" element={<Home />} />
                    <Route path="/reviews" element={<Home />} />
                    <Route path="/faq" element={<Home />} />
                </Routes>
            </Layout>
        </Router>
    </StrictMode>,
);

import React from 'react';
import Footer from "@/shared/components/Footer";
import ScrollToTop from "@/shared/components/ScrollToTop";
import Header from "@/widgets/Header/Header.tsx";

interface LayoutProps {
  children: React.ReactNode;
  onAuthModeChange: (mode: 'login' | 'register') => void;
}

const Layout = ({ children, onAuthModeChange }: LayoutProps) => {
    return (
        <>
            <Header onAuthModeChange={onAuthModeChange} />
            <main>{children}</main>
            <ScrollToTop />
            <Footer />
        </>
    );
};

export default Layout;

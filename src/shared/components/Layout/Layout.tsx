// src/components/Layout.tsx
import React from 'react';
import Header from "@/shared/components/Header";
import Footer from "@/shared/components/Footer";
import ScrollToTop from "@/shared/components/ScrollToTop";


const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Header />
            <main>{children}</main>
            <ScrollToTop />
            <Footer />
        </>
    );
};

export default Layout;

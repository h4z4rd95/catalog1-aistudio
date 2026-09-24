import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { WebsiteHeader } from '../website/WebsiteHeader';
import { WebsiteFooter } from '../website/WebsiteFooter';
import { CartDrawer } from '../website/CartDrawer';
import { ToastContainer } from '../website/ToastContainer';
import { ClientPresentationModal } from '../website/ClientPresentationModal';
import { LandingPage } from '../../pages/LandingPage';
import { StorePage } from '../../pages/StorePage';
import { ProductDetailPage } from '../../pages/ProductDetailPage';
import { CartCheckoutPage } from '../../pages/CartCheckoutPage';
import { AboutPage } from '../../pages/AboutPage';
import { ContactPage } from '../../pages/ContactPage';
import { AuthPage } from '../../pages/AuthPage';
import { NewsPage } from '../../pages/NewsPage';

interface AuraWebsiteSampleProps {
  onReturnToCatalog?: () => void;
}

export default function AuraWebsiteSample({ onReturnToCatalog = () => {} }: AuraWebsiteSampleProps) {
  const { activePage, theme, direction } = useStore();
  const [isPresentationOpen, setIsPresentationOpen] = useState(false);

  return (
    <div
      dir={direction}
      className={`min-h-screen flex flex-col font-['Plus_Jakarta_Sans'] transition-colors duration-200 ${
        theme === 'light'
          ? 'bg-[#f8fafc] text-zinc-900 selection:bg-cyan-500 selection:text-white'
          : 'bg-[#050609] text-zinc-100 selection:bg-cyan-400 selection:text-black'
      }`}
    >
      {/* Top Global Navigation Bar */}
      <WebsiteHeader
        onSwitchToShowroom={onReturnToCatalog}
        onOpenPresentationMode={() => setIsPresentationOpen(true)}
      />

      {/* Slide-over AJAX Cart Drawer */}
      <CartDrawer />

      {/* Floating AJAX Toast Stack */}
      <ToastContainer />

      {/* Client Pitch Presentation Kiosk Modal */}
      <ClientPresentationModal
        isOpen={isPresentationOpen}
        onClose={() => setIsPresentationOpen(false)}
      />

      {/* Active Page Routing */}
      <main className="flex-1 w-full">
        {activePage === 'LANDING' && <LandingPage onSwitchToShowroom={onReturnToCatalog} />}
        {activePage === 'STORE' && <StorePage />}
        {activePage === 'PRODUCT_DETAIL' && <ProductDetailPage />}
        {activePage === 'CART' && <CartCheckoutPage />}
        {activePage === 'ABOUT' && <AboutPage />}
        {activePage === 'CONTACT' && <ContactPage />}
        {activePage === 'AUTH' && <AuthPage />}
        {activePage === 'NEWS' && <NewsPage />}
      </main>

      {/* Global Production Footer */}
      <WebsiteFooter />
    </div>
  );
}

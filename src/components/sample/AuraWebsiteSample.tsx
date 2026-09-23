import React from 'react';
import { StoreProvider, useStore } from '../../context/StoreContext';
import { WebsiteHeader } from '../website/WebsiteHeader';
import { WebsiteFooter } from '../website/WebsiteFooter';
import { CartDrawer } from '../website/CartDrawer';
import { ToastContainer } from '../website/ToastContainer';
import { LandingPage } from '../../pages/LandingPage';
import { StorePage } from '../../pages/StorePage';
import { ProductDetailPage } from '../../pages/ProductDetailPage';
import { CartCheckoutPage } from '../../pages/CartCheckoutPage';
import { AboutPage } from '../../pages/AboutPage';
import { ContactPage } from '../../pages/ContactPage';
import { AuthPage } from '../../pages/AuthPage';

interface AuraWebsiteSampleProps {
  onReturnToCatalog?: () => void;
}

const WebsiteContent: React.FC<AuraWebsiteSampleProps> = ({ onReturnToCatalog = () => {} }) => {
  const { activePage } = useStore();

  return (
    <div className="min-h-screen bg-[#050609] text-zinc-100 flex flex-col font-['Plus_Jakarta_Sans'] selection:bg-cyan-400 selection:text-black">
      {/* Top Global Navigation Bar */}
      <WebsiteHeader onSwitchToShowroom={onReturnToCatalog} />

      {/* Slide-over AJAX Cart Drawer */}
      <CartDrawer />

      {/* Floating AJAX Toast Stack */}
      <ToastContainer />

      {/* Active Page Routing */}
      <main className="flex-1 w-full">
        {activePage === 'LANDING' && <LandingPage onSwitchToShowroom={onReturnToCatalog} />}
        {activePage === 'STORE' && <StorePage />}
        {activePage === 'PRODUCT_DETAIL' && <ProductDetailPage />}
        {activePage === 'CART' && <CartCheckoutPage />}
        {activePage === 'ABOUT' && <AboutPage />}
        {activePage === 'CONTACT' && <ContactPage />}
        {activePage === 'AUTH' && <AuthPage />}
      </main>

      {/* Global Production Footer */}
      <WebsiteFooter />
    </div>
  );
};

export default function AuraWebsiteSample(props: AuraWebsiteSampleProps) {
  return (
    <StoreProvider>
      <WebsiteContent {...props} />
    </StoreProvider>
  );
}

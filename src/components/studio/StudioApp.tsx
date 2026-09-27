import React, { useState } from 'react';
import StudioHeader from './common/StudioHeader';
import StudioFooter from './common/StudioFooter';
import StudioPreloader from './common/StudioPreloader';
import CartPhysicsThread, { ThreadAnimationPayload } from './common/CartPhysicsThread';
import StudioCartModal from './common/StudioCartModal';
import StudioHero from './home/StudioHero';
import StudioServicesDna from './home/StudioServicesDna';
import StudioSignalLog from './home/StudioSignalLog';
import StudioStatsOdometer from './home/StudioStatsOdometer';
import StudioTestimonialsPinboard from './home/StudioTestimonialsPinboard';
import StudioFaqRuledIndex from './home/StudioFaqRuledIndex';
import StudioPackagesGrid from './home/StudioPackagesGrid';
import SocialBotsPage from './pages/SocialBotsPage';
import DepartmentsPage from './pages/DepartmentsPage';
import StudioShopPage from './pages/StudioShopPage';
import { StudioPackage, StudioService } from '../../content/site';
import { soundFx } from '../../utils/audio';

interface StudioAppProps {
  onReturnToCatalog?: () => void;
}

export type StudioRoute = 'HOME' | 'DEPARTMENTS' | 'BOTS' | 'SHOP';

export default function StudioApp({ onReturnToCatalog = () => {} }: StudioAppProps) {
  const [currentRoute, setCurrentRoute] = useState<StudioRoute>('HOME');
  const [cartItems, setCartItems] = useState<StudioPackage[]>([]);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [activeThreads, setActiveThreads] = useState<ThreadAnimationPayload[]>([]);
  const [isPreloaded, setIsPreloaded] = useState(false);

  // Physical Thread pull on Add to Cart
  const handleAddToCartWithThread = (pkg: StudioPackage, e: React.MouseEvent<HTMLButtonElement>) => {
    soundFx.playClick(800);
    const rect = e.currentTarget.getBoundingClientRect();
    const startX = rect.left + rect.width / 2;
    const startY = rect.top + rect.height / 2;

    const cartAnchor = document.getElementById('studio-cart-anchor');
    const cartRect = cartAnchor ? cartAnchor.getBoundingClientRect() : { left: window.innerWidth - 60, top: 30, width: 40, height: 40 };
    const endX = cartRect.left + cartRect.width / 2;
    const endY = cartRect.top + cartRect.height / 2;

    const threadId = `th-${Date.now()}-${Math.random()}`;
    const newThread: ThreadAnimationPayload = {
      id: threadId,
      startX,
      startY,
      endX,
      endY,
      productTitle: pkg.title,
    };

    setActiveThreads((prev) => [...prev, newThread]);

    // Add item to cart state
    setCartItems((prev) => [...prev, pkg]);
  };

  const handleThreadComplete = (id: string) => {
    soundFx.playChime(950, 0.2);
    setActiveThreads((prev) => prev.filter((th) => th.id !== id));
  };

  const handleSelectService = (srv: StudioService) => {
    soundFx.playClick(700);
    if (srv.id === 'social-bots') {
      setCurrentRoute('BOTS');
    } else {
      setCurrentRoute('DEPARTMENTS');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div dir="rtl" className="min-h-screen bg-[#09090B] text-white font-['Plus_Jakarta_Sans'] selection:bg-cyan-400 selection:text-black antialiased relative">
      {/* 1. Three-Stroke «۱۲۳» Theatrical Curtain Preloader */}
      {!isPreloaded && (
        <StudioPreloader onComplete={() => setIsPreloaded(true)} />
      )}

      {/* 2. Physical Trajectory Thread Canvas */}
      <CartPhysicsThread
        activeThreads={activeThreads}
        onThreadComplete={handleThreadComplete}
      />

      {/* 3. Sticky Global Header */}
      <StudioHeader
        currentRoute={currentRoute}
        onNavigate={(route) => {
          setCurrentRoute(route);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        cartCount={cartItems.length}
        onOpenCartModal={() => setIsCartModalOpen(true)}
        onSwitchToShowroom={onReturnToCatalog}
      />

      {/* 4. Cart Drawer / Modal */}
      <StudioCartModal
        isOpen={isCartModalOpen}
        onClose={() => setIsCartModalOpen(false)}
        items={cartItems}
        onRemoveItem={(idx) => {
          setCartItems((prev) => prev.filter((_, i) => i !== idx));
        }}
        onClearCart={() => setCartItems([])}
      />

      {/* 5. Main Route Views */}
      <main className="w-full">
        {currentRoute === 'HOME' && (
          <>
            <StudioHero
              onExploreServices={() => {
                const el = document.getElementById('services-dna');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenBotsPage={() => {
                setCurrentRoute('BOTS');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onExplorePackages={() => {
                const el = document.getElementById('packages-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            <StudioServicesDna onSelectService={handleSelectService} />

            <StudioSignalLog />

            <StudioStatsOdometer />

            <StudioTestimonialsPinboard />

            <StudioFaqRuledIndex />

            <StudioPackagesGrid
              onAddToCart={handleAddToCartWithThread}
              onOpenBotsPage={() => {
                setCurrentRoute('BOTS');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </>
        )}

        {currentRoute === 'BOTS' && (
          <SocialBotsPage
            onBackToHome={() => {
              setCurrentRoute('HOME');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onAddToCart={handleAddToCartWithThread}
          />
        )}

        {currentRoute === 'DEPARTMENTS' && (
          <DepartmentsPage
            onBackToHome={() => {
              setCurrentRoute('HOME');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectService={handleSelectService}
            onOpenBotsPage={() => {
              setCurrentRoute('BOTS');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentRoute === 'SHOP' && (
          <StudioShopPage
            onBackToHome={() => {
              setCurrentRoute('HOME');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onAddToCart={handleAddToCartWithThread}
          />
        )}
      </main>

      {/* 6. Studio Footer */}
      <StudioFooter />
    </div>
  );
}

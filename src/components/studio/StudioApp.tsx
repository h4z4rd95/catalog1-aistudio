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
import InteractiveProjectCalculator from './elements/InteractiveProjectCalculator';
import SocialBotsPage from './pages/SocialBotsPage';
import DepartmentsPage from './pages/DepartmentsPage';
import StudioShopPage from './pages/StudioShopPage';
import StudioEssentialElementsPage from './pages/StudioEssentialElementsPage';
import { StudioPackage, StudioService } from '../../content/site';
import { soundFx } from '../../utils/audio';

interface StudioAppProps {
  onReturnToCatalog?: () => void;
}

export type StudioRoute = 'HOME' | 'DEPARTMENTS' | 'BOTS' | 'SHOP' | 'ELEMENTS';

export default function StudioApp({ onReturnToCatalog = () => {} }: StudioAppProps) {
  const [currentRoute, setCurrentRoute] = useState<StudioRoute>('HOME');
  const [cartItems, setCartItems] = useState<StudioPackage[]>([]);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [activeThreads, setActiveThreads] = useState<ThreadAnimationPayload[]>([]);
  const [isPreloaded, setIsPreloaded] = useState(true);

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

            {/* 08 // REAL-TIME INTERACTIVE PROJECT COST & SYNERGY CALCULATOR */}
            <section id="project-calculator" className="relative py-20 px-4 sm:px-8 bg-[#09090B] border-b border-[#202027] overflow-hidden">
              <div className="max-w-7xl mx-auto space-y-8">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#202027] pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                      <span className="font-mono text-xs uppercase tracking-widest text-cyan-400 font-bold">
                        08 // REAL-TIME PROJECT CALCULATOR &bull; برآورد بلادرنگ هزینه و زمان
                      </span>
                    </div>
                    <h2 className="font-['Lalezar'] text-3xl sm:text-5xl text-white mt-1">
                      محاسبه‌گر هوشمند هزینه، زمان و تخفیف هم‌افزایی
                    </h2>
                  </div>
                  <div className="font-mono text-xs text-zinc-400">
                    DYNAMIC SYNERGY ENGINE // ۳۵٪ کاهش زمان با انتخاب همزمان
                  </div>
                </div>

                <InteractiveProjectCalculator
                  onAddToCartCustom={handleAddToCartWithThread}
                />
              </div>
            </section>
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

        {currentRoute === 'ELEMENTS' && (
          <StudioEssentialElementsPage
            onBackToHome={() => {
              setCurrentRoute('HOME');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </main>

      {/* 6. Studio Footer */}
      <StudioFooter />
    </div>
  );
}

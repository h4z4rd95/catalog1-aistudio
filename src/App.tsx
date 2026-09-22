import React, { useState } from 'react';
import CatalogHeader from './components/common/CatalogHeader';
import CursorFollower from './components/common/CursorFollower';
// Batch 1: Hero Sections
import HeroChromaticLiquid from './components/heroes/HeroChromaticLiquid';
import HeroKineticNeoBrutalist from './components/heroes/HeroKineticNeoBrutalist';
import HeroCyberMatrixGlitch from './components/heroes/HeroCyberMatrixGlitch';
import HeroLuxuryEditorial from './components/heroes/HeroLuxuryEditorial';
import HeroQuantumSupershape3D from './components/heroes/HeroQuantumSupershape3D';
// Batch 2: Navigation Systems
import NavKineticOverlayMorph from './components/navigation/NavKineticOverlayMorph';
import NavDockGlassmorphicPhysics from './components/navigation/NavDockGlassmorphicPhysics';
import NavBrutalistSplitIndex from './components/navigation/NavBrutalistSplitIndex';
import NavLuxuryEditorialCurtain from './components/navigation/NavLuxuryEditorialCurtain';
import NavTerminalCommandPalette from './components/navigation/NavTerminalCommandPalette';
// Batch 3: Immersive Page Loaders & Transitions
import LoaderKineticCounterMask from './components/loaders/LoaderKineticCounterMask';
import LoaderLiquidShaderDissolve from './components/loaders/LoaderLiquidShaderDissolve';
import LoaderCyberDiagnosticBoot from './components/loaders/LoaderCyberDiagnosticBoot';
import LoaderLuxuryFoilCurtain from './components/loaders/LoaderLuxuryFoilCurtain';
import LoaderQuantumTopologyReassembly from './components/loaders/LoaderQuantumTopologyReassembly';
// Batch 4: Scroll Choreography & Infinite Canvas Pinning
import ScrollHorizontalParallaxGallery from './components/scroll/ScrollHorizontalParallaxGallery';
import ScrollKineticMarqueeVelocity from './components/scroll/ScrollKineticMarqueeVelocity';
import ScrollStickyDepthPinning from './components/scroll/ScrollStickyDepthPinning';
import ScrollEditorialSplitSync from './components/scroll/ScrollEditorialSplitSync';
import ScrollCyberRaycastTunnel from './components/scroll/ScrollCyberRaycastTunnel';
// Batch 5: Footers, Magnetic CTA Zones & Kinetic Physics
import FooterGravitationalMagneticGrid from './components/footers/FooterGravitationalMagneticGrid';
import FooterBrutalistAsciiTerminal from './components/footers/FooterBrutalistAsciiTerminal';
import FooterLuxuryVermeilInscription from './components/footers/FooterLuxuryVermeilInscription';
import FooterCyberShutdownMatrix from './components/footers/FooterCyberShutdownMatrix';
import FooterLiquidMeshInversion from './components/footers/FooterLiquidMeshInversion';
// Batch 6: High-Density Dashboards & Interactive Node Visualizers
import DashboardChromaticTelemetryHUD from './components/dashboards/DashboardChromaticTelemetryHUD';
import DashboardBrutalistHardwareLedger from './components/dashboards/DashboardBrutalistHardwareLedger';
import DashboardCyberOrbitalTopologyGraph from './components/dashboards/DashboardCyberOrbitalTopologyGraph';
import DashboardLuxuryExhibitionSpatialMatrix from './components/dashboards/DashboardLuxuryExhibitionSpatialMatrix';
import DashboardForceDirectedParticleNetwork3D from './components/dashboards/DashboardForceDirectedParticleNetwork3D';
// Batch 7: Spatial E-Commerce & 3D Configurator Showcases
import ProductChromaticWatchConfigurator from './components/products/ProductChromaticWatchConfigurator';
import ProductBrutalistSneakerDisassembly from './components/products/ProductBrutalistSneakerDisassembly';
import ProductCyberdeckHoloTerminal from './components/products/ProductCyberdeckHoloTerminal';
import ProductHauteCoutureFragrance from './components/products/ProductHauteCoutureFragrance';
import ProductParametricSpatialAudio3D from './components/products/ProductParametricSpatialAudio3D';
// Batch 8: Generative Art, Audio-Visual Shaders & Kinetic Sound Sculptures
import GenerativeFluidOscilloscope from './components/generative/GenerativeFluidOscilloscope';
import GenerativeBrutalistAsciiSand from './components/generative/GenerativeBrutalistAsciiSand';
import GenerativeCyberLidarScanner from './components/generative/GenerativeCyberLidarScanner';
import GenerativeLuxuryHarmonicMetronome from './components/generative/GenerativeLuxuryHarmonicMetronome';
import GenerativeQuantumAttractor3D from './components/generative/GenerativeQuantumAttractor3D';
// Batch 9: Interactive Creative Typography, Liquid Text Shaders & Kinetic Glyphs
import TypographyChromaticLiquidDisplacement from './components/typography/TypographyChromaticLiquidDisplacement';
import TypographyBrutalistVariableStretch from './components/typography/TypographyBrutalistVariableStretch';
import TypographyCyberMatrixDecoder from './components/typography/TypographyCyberMatrixDecoder';
import TypographyLuxuryEditorialLigature from './components/typography/TypographyLuxuryEditorialLigature';
import TypographyParametric3DRibbonMesh from './components/typography/TypographyParametric3DRibbonMesh';
// Batch 10: Interactive Shaders, Frosted Optical Caustics & Spatial Refraction FX
import ShaderChromaticGlassPrism from './components/shaders/ShaderChromaticGlassPrism';
import ShaderBrutalistDitherMatrix from './components/shaders/ShaderBrutalistDitherMatrix';
import ShaderCyberVolumetricLaser from './components/shaders/ShaderCyberVolumetricLaser';
import ShaderLuxuryFlutedGlass from './components/shaders/ShaderLuxuryFlutedGlass';
import ShaderParametric3DRaymarch from './components/shaders/ShaderParametric3DRaymarch';

import OmniSearchModal from './components/common/OmniSearchModal';
import { CATALOG_SEARCH_DATA } from './data/catalogSearchData';

import { AestheticFilter, TechFilter } from './types';
import { Sparkles, Layers, ArrowUp, CheckCircle2, ChevronRight, Terminal, BookOpen, Compass, Hourglass, MoveHorizontal, Anchor, LayoutDashboard, ShoppingBag, Radio, Type } from 'lucide-react';
import { soundFx } from './utils/audio';

export default function App() {
  const [currentAesthetic, setCurrentAesthetic] = useState<AestheticFilter>('ALL');
  const [currentTech, setCurrentTech] = useState<TechFilter>('ALL');
  const [activeBatch, setActiveBatch] = useState<string>('ALL');
  const [showRoadmapModal, setShowRoadmapModal] = useState<boolean>(false);
  const [showSearchModal, setShowSearchModal] = useState<boolean>(false);

  // Global Keyboard Shortcut: ⌘K or Ctrl+K for Omni-Search
  React.useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        soundFx.playChime(900, 0.2);
        setShowSearchModal((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  const scrollToTop = () => {
    soundFx.playClick(800);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const jumpToComponent = (id: string) => {
    soundFx.playClick(700);
    // Reset filters if active so target component is guaranteed mounted
    if (activeBatch !== 'ALL') {
      setActiveBatch('ALL');
    }
    if (currentAesthetic !== 'ALL') {
      setCurrentAesthetic('ALL');
    }

    setTimeout(() => {
      const el = document.getElementById(id.toLowerCase());
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        el.classList.add('ring-2', 'ring-cyan-400', 'transition-all');
        setTimeout(() => {
          el.classList.remove('ring-2', 'ring-cyan-400');
        }, 2200);
      }
    }, 60);
  };

  const catalogItems = [
    // Batch 1: Heroes
    { id: 'hero_v01_chromaticliquidmesh', label: 'H01', name: 'Chromatic Liquid', batch: 'BATCH_1', aesthetic: 'CHROMATIC' },
    { id: 'hero_v02_kineticneobrutalist', label: 'H02', name: 'Kinetic Brutalist', batch: 'BATCH_1', aesthetic: 'NEO_BRUTALIST' },
    { id: 'hero_v03_cybermatrixglitch', label: 'H03', name: 'Cyber Raycaster', batch: 'BATCH_1', aesthetic: 'CYBERPUNK' },
    { id: 'hero_v04_luxuryeditorialcouture', label: 'H04', name: 'Luxury Editorial', batch: 'BATCH_1', aesthetic: 'LUXURY_EDITORIAL' },
    { id: 'hero_v05_quantumsupershape3d', label: 'H05', name: 'Quantum 3D', batch: 'BATCH_1', aesthetic: 'WEBGL_3D' },
    // Batch 2: Navigations
    { id: 'nav_v01_kineticoverlaymorph', label: 'N01', name: 'Overlay Morph', batch: 'BATCH_2', aesthetic: 'KINETIC' },
    { id: 'nav_v02_dockglassmorphicphysics', label: 'N02', name: 'Gaussian Dock', batch: 'BATCH_2', aesthetic: 'CHROMATIC' },
    { id: 'nav_v03_brutalistsplitindex', label: 'N03', name: 'Brutalist Split', batch: 'BATCH_2', aesthetic: 'NEO_BRUTALIST' },
    { id: 'nav_v04_luxuryeditorialcurtain', label: 'N04', name: 'Silk Curtain', batch: 'BATCH_2', aesthetic: 'LUXURY_EDITORIAL' },
    { id: 'nav_v05_terminalcommandpalette', label: 'N05', name: 'Cyber ⌘K HUD', batch: 'BATCH_2', aesthetic: 'CYBERPUNK' },
    // Batch 3: Loaders
    { id: 'loader_v01_kineticcountermask', label: 'L01', name: 'Kinetic Counter Wipe', batch: 'BATCH_3', aesthetic: 'NEO_BRUTALIST' },
    { id: 'loader_v02_liquidshaderdissolve', label: 'L02', name: 'Simplex Liquid Melt', batch: 'BATCH_3', aesthetic: 'CHROMATIC' },
    { id: 'loader_v03_cyberdiagnosticboot', label: 'L03', name: 'Cyber BIOS Boot', batch: 'BATCH_3', aesthetic: 'CYBERPUNK' },
    { id: 'loader_v04_luxuryfoilcurtain', label: 'L04', name: 'Gold Foil Velvet Split', batch: 'BATCH_3', aesthetic: 'LUXURY_EDITORIAL' },
    { id: 'loader_v05_quantumtopologyreassembly', label: 'L05', name: 'Quantum Attractor 3D', batch: 'BATCH_3', aesthetic: 'WEBGL_3D' },
    // Batch 4: Scroll
    { id: 'scroll_v01_horizontalparallaxgallery', label: 'S01', name: 'Horizontal Parallax', batch: 'BATCH_4', aesthetic: 'CHROMATIC' },
    { id: 'scroll_v02_kineticmarqueevelocity', label: 'S02', name: 'Velocity Marquee', batch: 'BATCH_4', aesthetic: 'NEO_BRUTALIST' },
    { id: 'scroll_v03_stickydepthpinning', label: 'S03', name: '3D Depth Pinning', batch: 'BATCH_4', aesthetic: 'WEBGL_3D' },
    { id: 'scroll_v04_editorialsplitsync', label: 'S04', name: 'Split Counter-Scroll', batch: 'BATCH_4', aesthetic: 'LUXURY_EDITORIAL' },
    { id: 'scroll_v05_cyberraycasttunnel', label: 'S05', name: 'Raycast Cyber Tunnel', batch: 'BATCH_4', aesthetic: 'CYBERPUNK' },
    // Batch 5: Footers & Physics
    { id: 'footer_v01_gravitationalmagneticgrid', label: 'F01', name: 'Gravitational Grid', batch: 'BATCH_5', aesthetic: 'CHROMATIC' },
    { id: 'footer_v02_brutalistasciiterminal', label: 'F02', name: 'Brutalist ASCII', batch: 'BATCH_5', aesthetic: 'NEO_BRUTALIST' },
    { id: 'footer_v03_luxuryvermeilinscription', label: 'F03', name: 'Luxury Vermeil', batch: 'BATCH_5', aesthetic: 'LUXURY_EDITORIAL' },
    { id: 'footer_v04_cybershutdownmatrix', label: 'F04', name: 'Cyber Shutdown', batch: 'BATCH_5', aesthetic: 'CYBERPUNK' },
    { id: 'footer_v05_liquidmeshinversion', label: 'F05', name: '3D Wave Inversion', batch: 'BATCH_5', aesthetic: 'WEBGL_3D' },
    // Batch 6: Dashboards & Node Visualizers
    { id: 'dashboard_v01_chromatictelemetryhud', label: 'D01', name: 'Telemetry HUD', batch: 'BATCH_6', aesthetic: 'CHROMATIC' },
    { id: 'dashboard_v02_brutalisthardwareledger', label: 'D02', name: 'Hardware Ledger', batch: 'BATCH_6', aesthetic: 'NEO_BRUTALIST' },
    { id: 'dashboard_v03_cyberorbitaltopologygraph', label: 'D03', name: 'Orbital Topology', batch: 'BATCH_6', aesthetic: 'CYBERPUNK' },
    { id: 'dashboard_v04_luxuryexhibitionspatialmatrix', label: 'D04', name: 'Exhibition Matrix', batch: 'BATCH_6', aesthetic: 'LUXURY_EDITORIAL' },
    { id: 'dashboard_v05_forcedirectedparticlenetwork3d', label: 'D05', name: 'Force Network 3D', batch: 'BATCH_6', aesthetic: 'WEBGL_3D' },
    // Batch 7: Spatial E-Commerce & 3D Configurator Showcases
    { id: 'product_v01_chromaticwatchconfigurator', label: 'P01', name: 'Watch Configurator', batch: 'BATCH_7', aesthetic: 'CHROMATIC' },
    { id: 'product_v02_brutalistsneakerdisassembly', label: 'P02', name: 'Sneaker Deconstruct', batch: 'BATCH_7', aesthetic: 'NEO_BRUTALIST' },
    { id: 'product_v03_cyberdeckholoterminal', label: 'P03', name: 'Cyberdeck Terminal', batch: 'BATCH_7', aesthetic: 'CYBERPUNK' },
    { id: 'product_v04_hautecouturefragrance', label: 'P04', name: 'Couture Fragrance', batch: 'BATCH_7', aesthetic: 'LUXURY_EDITORIAL' },
    { id: 'product_v05_parametricspatialaudio3d', label: 'P05', name: 'Spatial Audio 3D', batch: 'BATCH_7', aesthetic: 'WEBGL_3D' },
    // Batch 8: Generative Art, Audio-Visual Shaders & Kinetic Sound Sculptures
    { id: 'generative_v01_fluidochilloscope', label: 'G01', name: 'Fluid Oscilloscope', batch: 'BATCH_8', aesthetic: 'CHROMATIC' },
    { id: 'generative_v02_brutalistasciisand', label: 'G02', name: 'ASCII Falling Sand', batch: 'BATCH_8', aesthetic: 'NEO_BRUTALIST' },
    { id: 'generative_v03_cyberlidarscanner', label: 'G03', name: 'Cyber LiDAR Scanner', batch: 'BATCH_8', aesthetic: 'CYBERPUNK' },
    { id: 'generative_v04_luxuryharmonicmetronome', label: 'G04', name: 'Harmonic Metronome', batch: 'BATCH_8', aesthetic: 'LUXURY_EDITORIAL' },
    { id: 'generative_v05_quantumattractor3d', label: 'G05', name: 'Lorenz Chaos 3D', batch: 'BATCH_8', aesthetic: 'WEBGL_3D' },
    // Batch 9: Interactive Creative Typography, Liquid Text Shaders & Kinetic Glyphs
    { id: 'typography_v01_chromaticliquiddisplacement', label: 'T01', name: 'Liquid Text Wave', batch: 'BATCH_9', aesthetic: 'CHROMATIC' },
    { id: 'typography_v02_brutalistvariablestretch', label: 'T02', name: 'Letter-Stretch Matrix', batch: 'BATCH_9', aesthetic: 'NEO_BRUTALIST' },
    { id: 'typography_v03_cybermatrixdecoder', label: 'T03', name: 'Cryptographic Decoder', batch: 'BATCH_9', aesthetic: 'CYBERPUNK' },
    { id: 'typography_v04_luxuryeditorialligature', label: 'T04', name: 'Museum Drop-Cap Atelier', batch: 'BATCH_9', aesthetic: 'LUXURY_EDITORIAL' },
    { id: 'typography_v05_parametric3dribbonmesh', label: 'T05', name: '3D Typography Ribbon', batch: 'BATCH_9', aesthetic: 'WEBGL_3D' },
    // Batch 10: Interactive Shaders, Frosted Optical Caustics & Spatial Refraction FX
    { id: 'shader_v01_chromaticglassprism', label: 'X01', name: 'Refractive Glass Prism', batch: 'BATCH_10', aesthetic: 'CHROMATIC' },
    { id: 'shader_v02_brutalistdithermatrix', label: 'X02', name: 'Bayer Dither Matrix', batch: 'BATCH_10', aesthetic: 'NEO_BRUTALIST' },
    { id: 'shader_v03_cybervolumetriclaser', label: 'X03', name: 'Volumetric Laser Scanner', batch: 'BATCH_10', aesthetic: 'CYBERPUNK' },
    { id: 'shader_v04_luxuryflutedglass', label: 'X04', name: 'Fluted Glass Mercury', batch: 'BATCH_10', aesthetic: 'LUXURY_EDITORIAL' },
    { id: 'shader_v05_parametric3draymarch', label: 'X05', name: 'Raymarched Metaballs SDF', batch: 'BATCH_10', aesthetic: 'WEBGL_3D' },
  ];

  const showBatch1 = activeBatch === 'ALL' || activeBatch === 'BATCH_1';
  const showBatch2 = activeBatch === 'ALL' || activeBatch === 'BATCH_2';
  const showBatch3 = activeBatch === 'ALL' || activeBatch === 'BATCH_3';
  const showBatch4 = activeBatch === 'ALL' || activeBatch === 'BATCH_4';
  const showBatch5 = activeBatch === 'ALL' || activeBatch === 'BATCH_5';
  const showBatch6 = activeBatch === 'ALL' || activeBatch === 'BATCH_6';
  const showBatch7 = activeBatch === 'ALL' || activeBatch === 'BATCH_7';
  const showBatch8 = activeBatch === 'ALL' || activeBatch === 'BATCH_8';
  const showBatch9 = activeBatch === 'ALL' || activeBatch === 'BATCH_9';
  const showBatch10 = activeBatch === 'ALL' || activeBatch === 'BATCH_10';

  return (
    <div className="relative min-h-screen bg-[#050609] text-zinc-100 font-['Plus_Jakarta_Sans'] antialiased selection:bg-amber-400 selection:text-black">
      {/* Precision Trailing Inertia Cursor */}
      <CursorFollower />

      {/* Persistent Showroom Sticky Header */}
      <CatalogHeader
        currentAesthetic={currentAesthetic}
        onSelectAesthetic={setCurrentAesthetic}
        currentTech={currentTech}
        onSelectTech={setCurrentTech}
        activeBatch={activeBatch}
        onSelectBatch={setActiveBatch}
        onOpenSearch={() => setShowSearchModal(true)}
      />

      {/* Floating Quick-Jump Quick Bar */}
      <nav 
        aria-label="Quick jump to components" 
        className="fixed bottom-6 right-6 z-40 hidden xl:flex items-center gap-1.5 p-2 rounded-full bg-black/85 border border-white/20 backdrop-blur-xl shadow-2xl"
      >
        <div className="flex items-center gap-1.5 px-2.5">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="font-mono text-[11px] font-semibold text-zinc-300">JUMP:</span>
        </div>
        {catalogItems.map((item) => (
          <button
            key={item.id}
            onClick={() => jumpToComponent(item.id)}
            className="px-2 py-1 rounded-full font-mono text-[10px] bg-white/5 hover:bg-cyan-400 hover:text-black text-zinc-300 border border-white/10 transition-colors"
            title={`${item.label}: ${item.name}`}
            data-cursor="hover"
          >
            {item.label}
          </button>
        ))}
        <button
          onClick={scrollToTop}
          className="w-7 h-7 rounded-full bg-white/10 hover:bg-white text-zinc-300 hover:text-black flex items-center justify-center transition-colors ml-1"
          title="Scroll to top"
          data-cursor="hover"
        >
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </nav>

      {/* Main Continuous Scroll Catalog Container */}
      <main className="w-full relative">
        {/* ========================================================================= */}
        {/* BATCH 1: HERO SECTIONS (5 VARIATIONS)                                     */}
        {/* ========================================================================= */}
        {showBatch1 && (
          <>
            {/* Section Header Divider */}
            <div className="w-full py-6 px-8 bg-zinc-950 border-b border-white/10 flex items-center justify-between font-mono text-xs text-zinc-400">
              <span className="text-amber-400 font-bold uppercase tracking-wider flex items-center gap-2">
                <Layers className="w-4 h-4" /> BATCH 1 // NEXT.JS HERO SECTIONS (05 PERMUTATIONS)
              </span>
              <span className="hidden sm:inline">WebGL Shaders &bull; Matrix Skew &bull; Parametric 3D</span>
            </div>

            {/* Variation 1: Chromatic Liquid Mesh */}
            {(currentAesthetic === 'ALL' || currentAesthetic === 'CHROMATIC') && (
              <HeroChromaticLiquid />
            )}

            {/* Variation 2: Kinetic Neo-Brutalist Grid */}
            {(currentAesthetic === 'ALL' || currentAesthetic === 'NEO_BRUTALIST') && (
              <HeroKineticNeoBrutalist />
            )}

            {/* Variation 3: Cyber Matrix Raycaster */}
            {(currentAesthetic === 'ALL' || currentAesthetic === 'CYBERPUNK') && (
              <HeroCyberMatrixGlitch />
            )}

            {/* Variation 4: Luxury Editorial Couture */}
            {(currentAesthetic === 'ALL' || currentAesthetic === 'LUXURY_EDITORIAL') && (
              <HeroLuxuryEditorial />
            )}

            {/* Variation 5: Quantum Supershape 3D */}
            {(currentAesthetic === 'ALL' || currentAesthetic === 'WEBGL_3D') && (
              <HeroQuantumSupershape3D />
            )}
          </>
        )}

        {/* ========================================================================= */}
        {/* BATCH 2: NAVIGATION SYSTEMS & INTERACTIVE MEGA-MENUS (5 VARIATIONS)      */}
        {/* ========================================================================= */}
        {showBatch2 && (
          <>
            {/* Section Header Divider */}
            <div className="w-full py-6 px-8 bg-zinc-950 border-y border-white/10 flex items-center justify-between font-mono text-xs text-zinc-400">
              <span className="text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-2">
                <Compass className="w-4 h-4" /> BATCH 2 // NAVIGATION SYSTEMS &amp; MEGA-MENUS (05 PERMUTATIONS)
              </span>
              <span className="hidden sm:inline">SVG Wave Morphing &bull; Gaussian Dock &bull; ⌘K Palette</span>
            </div>

            {/* Variation 6: Kinetic Overlay Morph */}
            {(currentAesthetic === 'ALL' || currentAesthetic === 'NEO_BRUTALIST') && (
              <NavKineticOverlayMorph />
            )}

            {/* Variation 7: Chromatic Glassmorphic Dock */}
            {(currentAesthetic === 'ALL' || currentAesthetic === 'CHROMATIC') && (
              <NavDockGlassmorphicPhysics />
            )}

            {/* Variation 8: Neo-Brutalist Split-Screen Index */}
            {(currentAesthetic === 'ALL' || currentAesthetic === 'NEO_BRUTALIST') && (
              <NavBrutalistSplitIndex />
            )}

            {/* Variation 9: Luxury Editorial Silk Curtain */}
            {(currentAesthetic === 'ALL' || currentAesthetic === 'LUXURY_EDITORIAL') && (
              <NavLuxuryEditorialCurtain />
            )}

            {/* Variation 10: Cyberpunk Command Palette ⌘K */}
            {(currentAesthetic === 'ALL' || currentAesthetic === 'CYBERPUNK') && (
              <NavTerminalCommandPalette />
            )}
          </>
        )}

        {/* ========================================================================= */}
        {/* BATCH 3: IMMERSIVE PAGE LOADERS & FLUID TRANSITIONS (5 VARIATIONS)        */}
        {/* ========================================================================= */}
        {showBatch3 && (
          <>
            {/* Section Header Divider */}
            <div className="w-full py-6 px-8 bg-zinc-950 border-y border-white/10 flex items-center justify-between font-mono text-xs text-zinc-400">
              <span className="text-pink-400 font-bold uppercase tracking-wider flex items-center gap-2">
                <Hourglass className="w-4 h-4" /> BATCH 3 // IMMERSIVE PAGE LOADERS &amp; FLUID TRANSITIONS (05 PERMUTATIONS)
              </span>
              <span className="hidden sm:inline">Euler Momentum &bull; GLSL Simplex Dissolve &bull; BIOS Boot &bull; Velvet Split &bull; Particle Attractor</span>
            </div>

            {/* Variation 11: Kinetic Counter & Diagonal Mask Wipe */}
            {(currentAesthetic === 'ALL' || currentAesthetic === 'NEO_BRUTALIST') && (
              <LoaderKineticCounterMask />
            )}

            {/* Variation 12: Simplex Shader Liquid Melt & Spectral Glow */}
            {(currentAesthetic === 'ALL' || currentAesthetic === 'CHROMATIC') && (
              <LoaderLiquidShaderDissolve />
            )}

            {/* Variation 13: Cyberpunk BIOS Diagnostic Boot Matrix */}
            {(currentAesthetic === 'ALL' || currentAesthetic === 'CYBERPUNK') && (
              <LoaderCyberDiagnosticBoot />
            )}

            {/* Variation 14: Luxury Haute Couture Gold Foil Curtain Unfurl */}
            {(currentAesthetic === 'ALL' || currentAesthetic === 'LUXURY_EDITORIAL') && (
              <LoaderLuxuryFoilCurtain />
            )}

            {/* Variation 15: 3D Quantum Topology Particle Reassembly */}
            {(currentAesthetic === 'ALL' || currentAesthetic === 'WEBGL_3D') && (
              <LoaderQuantumTopologyReassembly />
            )}
          </>
        )}

        {/* ========================================================= */}
        {/* BATCH 4: SCROLL CHOREOGRAPHY, CANVAS PINNING & TRIGGERS    */}
        {/* ========================================================= */}
        {showBatch4 && (
          <>
            {/* Section Divider Bar */}
            <div className="w-full py-8 px-6 bg-gradient-to-r from-emerald-950/40 via-zinc-900/60 to-black border-y border-emerald-500/20 backdrop-blur-md">
              <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    <MoveHorizontal className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-mono text-xs uppercase tracking-widest text-emerald-400 font-bold">
                      BATCH 4 // PRODUCTION SUITE
                    </span>
                    <h3 className="font-['Syne'] text-xl sm:text-2xl font-bold text-white tracking-tight">
                      Scroll Choreography, Infinite Canvas Pinning &amp; Section Triggers (5 Permutations)
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2 font-mono text-xs text-zinc-400">
                  <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-emerald-300 font-semibold">
                    Variations 16 — 20
                  </span>
                </div>
              </div>
            </div>

            {/* Variation 16: Multi-Layer Horizontal Parallax Gallery with Inertia Damping */}
            {(currentAesthetic === 'ALL' || currentAesthetic === 'CHROMATIC') && (
              <ScrollHorizontalParallaxGallery />
            )}

            {/* Variation 17: Kinetic Velocity Marquee & Dynamic Skew Matrix */}
            {(currentAesthetic === 'ALL' || currentAesthetic === 'NEO_BRUTALIST') && (
              <ScrollKineticMarqueeVelocity />
            )}

            {/* Variation 18: Sticky Viewport Pinning & 3D Z-Axis Flythrough Scrub */}
            {(currentAesthetic === 'ALL' || currentAesthetic === 'WEBGL_3D') && (
              <ScrollStickyDepthPinning />
            )}

            {/* Variation 19: Haute Couture Dual-Column Split Counter-Scroll */}
            {(currentAesthetic === 'ALL' || currentAesthetic === 'LUXURY_EDITORIAL') && (
              <ScrollEditorialSplitSync />
            )}

            {/* Variation 20: Cyberpunk Raycast Spline Tunnel & Waypoint Scrub */}
            {(currentAesthetic === 'ALL' || currentAesthetic === 'CYBERPUNK') && (
              <ScrollCyberRaycastTunnel />
            )}
          </>
        )}

        {/* ========================================================= */}
        {/* BATCH 5: FOOTERS, MAGNETIC CTA ZONES & KINETIC PHYSICS   */}
        {/* ========================================================= */}
        {showBatch5 && (
          <>
            {/* Section Divider Bar */}
            <div className="w-full py-8 px-6 bg-gradient-to-r from-purple-950/40 via-zinc-900/60 to-black border-y border-purple-500/20 backdrop-blur-md">
              <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400 border border-purple-500/30">
                    <Anchor className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-mono text-xs uppercase tracking-widest text-purple-400 font-bold">
                      BATCH 5 // PRODUCTION SUITE
                    </span>
                    <h3 className="font-['Syne'] text-xl sm:text-2xl font-bold text-white tracking-tight">
                      Footers, Magnetic CTA Zones &amp; Kinetic Physics Elements (5 Permutations)
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2 font-mono text-xs text-zinc-400">
                  <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-purple-300 font-semibold">
                    Variations 21 — 25
                  </span>
                </div>
              </div>
            </div>

            {/* Variation 21: Gravitational Particle Attractor & Magnetic Spring CTA */}
            {(currentAesthetic === 'ALL' || currentAesthetic === 'CHROMATIC') && (
              <FooterGravitationalMagneticGrid />
            )}

            {/* Variation 22: Brutalist ASCII Monospace & Interactive CLI Command Footer */}
            {(currentAesthetic === 'ALL' || currentAesthetic === 'NEO_BRUTALIST') && (
              <FooterBrutalistAsciiTerminal />
            )}

            {/* Variation 23: Haute Couture Vermeil Inscription & Salon Privé Ledger */}
            {(currentAesthetic === 'ALL' || currentAesthetic === 'LUXURY_EDITORIAL') && (
              <FooterLuxuryVermeilInscription />
            )}

            {/* Variation 24: Cyberpunk Holographic Cockpit & Interactive System Shutdown */}
            {(currentAesthetic === 'ALL' || currentAesthetic === 'CYBERPUNK') && (
              <FooterCyberShutdownMatrix />
            )}

            {/* Variation 25: Parametric 3D Wave Ribbon & Inverted Magnetic Pill CTAs */}
            {(currentAesthetic === 'ALL' || currentAesthetic === 'WEBGL_3D') && (
              <FooterLiquidMeshInversion />
            )}
          </>
        )}

        {/* ========================================================= */}
        {/* BATCH 6: HIGH-DENSITY DASHBOARDS & NODE VISUALIZERS       */}
        {/* ========================================================= */}
        {showBatch6 && (
          <>
            {/* Section Divider Bar */}
            <div className="w-full py-8 px-6 bg-gradient-to-r from-amber-950/40 via-zinc-900/60 to-black border-y border-amber-500/20 backdrop-blur-md">
              <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
                    <LayoutDashboard className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-mono text-xs uppercase tracking-widest text-amber-400 font-bold">
                      BATCH 6 // PRODUCTION SUITE
                    </span>
                    <h3 className="font-['Syne'] text-xl sm:text-2xl font-bold text-white tracking-tight">
                      High-Density Dashboards &amp; Interactive Node Visualizers (5 Permutations)
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2 font-mono text-xs text-zinc-400">
                  <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-amber-300 font-semibold">
                    Variations 26 — 30
                  </span>
                </div>
              </div>
            </div>

            {/* Variation 26: Chromatic Liquid Glassmorphic Telemetry HUD */}
            {(currentAesthetic === 'ALL' || currentAesthetic === 'CHROMATIC') && (
              <DashboardChromaticTelemetryHUD />
            )}

            {/* Variation 27: Kinetic Neo-Brutalist Hardware Register Ledger */}
            {(currentAesthetic === 'ALL' || currentAesthetic === 'NEO_BRUTALIST') && (
              <DashboardBrutalistHardwareLedger />
            )}

            {/* Variation 28: Cyberpunk Interactive Orbital Node Topology Graph */}
            {(currentAesthetic === 'ALL' || currentAesthetic === 'CYBERPUNK') && (
              <DashboardCyberOrbitalTopologyGraph />
            )}

            {/* Variation 29: Haute Couture Spatial Exhibition Portfolio Matrix */}
            {(currentAesthetic === 'ALL' || currentAesthetic === 'LUXURY_EDITORIAL') && (
              <DashboardLuxuryExhibitionSpatialMatrix />
            )}

            {/* Variation 30: Force-Directed 3D Particle Network & Neural Flow */}
            {(currentAesthetic === 'ALL' || currentAesthetic === 'WEBGL_3D') && (
              <DashboardForceDirectedParticleNetwork3D />
            )}
          </>
        )}

        {/* BATCH 7: SPATIAL E-COMMERCE & 3D CONFIGURATOR SHOWCASES */}
        {showBatch7 && (
          <>
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-4">
              <div className="flex items-center gap-3 border-b border-cyan-500/20 pb-4">
                <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-widest text-cyan-400 font-mono font-bold block">
                    BATCH 7 ARCHITECTURE // 5 VARIATIONS
                  </span>
                  <h3 className="font-['Syne'] text-2xl font-bold text-white tracking-tight">
                    Spatial E-Commerce &amp; 3D Configurator Showcases
                  </h3>
                </div>
              </div>
            </div>

            {/* Variation 31: Chromatic Liquid Glassmorphic 3D Chronometer Configurator */}
            {(currentAesthetic === 'ALL' || currentAesthetic === 'CHROMATIC') && (
              <ProductChromaticWatchConfigurator />
            )}

            {/* Variation 32: Neo-Brutalist Footwear Disassembly Matrix */}
            {(currentAesthetic === 'ALL' || currentAesthetic === 'NEO_BRUTALIST') && (
              <ProductBrutalistSneakerDisassembly />
            )}

            {/* Variation 33: Cyberpunk Cyberdeck Holographic Terminal & Hardware Flasher */}
            {(currentAesthetic === 'ALL' || currentAesthetic === 'CYBERPUNK') && (
              <ProductCyberdeckHoloTerminal />
            )}

            {/* Variation 34: Haute Couture Olfactory Pyramid & Bespoke Flacon Atelier */}
            {(currentAesthetic === 'ALL' || currentAesthetic === 'LUXURY_EDITORIAL') && (
              <ProductHauteCoutureFragrance />
            )}

            {/* Variation 35: Parametric 3D Spatial Audio Headphone & Frequency Resonator */}
            {(currentAesthetic === 'ALL' || currentAesthetic === 'WEBGL_3D') && (
              <ProductParametricSpatialAudio3D />
            )}
          </>
        )}

        {/* BATCH 8: GENERATIVE ART, AUDIO-VISUAL SHADERS & KINETIC SOUND SCULPTURES */}
        {showBatch8 && (
          <>
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-4">
              <div className="flex items-center gap-3 border-b border-emerald-500/20 pb-4">
                <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                  <Radio className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-widest text-emerald-400 font-mono font-bold block">
                    BATCH 8 ARCHITECTURE // 5 VARIATIONS
                  </span>
                  <h3 className="font-['Syne'] text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Generative Art, Audio-Visual Shaders &amp; Kinetic Sound Sculptures
                  </h3>
                </div>
              </div>
            </div>

            {/* Variation 36: Chromatic Liquid Audio Oscilloscope & Spectral Refraction Ribbon */}
            {(currentAesthetic === 'ALL' || currentAesthetic === 'CHROMATIC') && (
              <GenerativeFluidOscilloscope />
            )}

            {/* Variation 37: Neo-Brutalist ASCII Cellular Automata & Sand Physics Grid */}
            {(currentAesthetic === 'ALL' || currentAesthetic === 'NEO_BRUTALIST') && (
              <GenerativeBrutalistAsciiSand />
            )}

            {/* Variation 38: Cyberpunk LiDAR Pointcloud Scanner & Topographic Radar HUD */}
            {(currentAesthetic === 'ALL' || currentAesthetic === 'CYBERPUNK') && (
              <GenerativeCyberLidarScanner />
            )}

            {/* Variation 39: Haute Horlogerie Lissajous Resonance & Astronomical Pendulum */}
            {(currentAesthetic === 'ALL' || currentAesthetic === 'LUXURY_EDITORIAL') && (
              <GenerativeLuxuryHarmonicMetronome />
            )}

            {/* Variation 40: Quantum Lorenz Strange Attractor & 3D Chaos Manifold */}
            {(currentAesthetic === 'ALL' || currentAesthetic === 'WEBGL_3D') && (
              <GenerativeQuantumAttractor3D />
            )}
          </>
        )}

        {/* ========================================================= */}
        {/* BATCH 9: CREATIVE TYPOGRAPHY & KINETIC TEXT SHADERS       */}
        {/* ========================================================= */}
        {showBatch9 && (
          <>
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-4">
              <div className="flex items-center gap-3 border-b border-rose-500/20 pb-4">
                <div className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400">
                  <Type className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-widest text-rose-400 font-mono font-bold block">
                    BATCH 9 ARCHITECTURE // 5 VARIATIONS
                  </span>
                  <h3 className="font-['Syne'] text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Interactive Creative Typography, Liquid Text Shaders &amp; Kinetic Glyphs
                  </h3>
                </div>
              </div>
            </div>

            {/* Variation 41: Chromatic Liquid Typography & Spectral Displacement Wave */}
            {(currentAesthetic === 'ALL' || currentAesthetic === 'CHROMATIC') && (
              <TypographyChromaticLiquidDisplacement />
            )}

            {/* Variation 42: Neo-Brutalist Dynamic Letter-Stretch & Mouse Proximity Matrix */}
            {(currentAesthetic === 'ALL' || currentAesthetic === 'NEO_BRUTALIST') && (
              <TypographyBrutalistVariableStretch />
            )}

            {/* Variation 43: Cyberpunk Cryptographic Terminal & Matrix Glyphic Decoder */}
            {(currentAesthetic === 'ALL' || currentAesthetic === 'CYBERPUNK') && (
              <TypographyCyberMatrixDecoder />
            )}

            {/* Variation 44: Haute Couture Museum Editorial & Illuminated Drop-Cap Atelier */}
            {(currentAesthetic === 'ALL' || currentAesthetic === 'LUXURY_EDITORIAL') && (
              <TypographyLuxuryEditorialLigature />
            )}

            {/* Variation 45: Parametric 3D Kinetic Typography Ribbon & Spatial Möbius Mesh */}
            {(currentAesthetic === 'ALL' || currentAesthetic === 'WEBGL_3D') && (
              <TypographyParametric3DRibbonMesh />
            )}
          </>
        )}

        {/* ========================================================================= */}
        {/* BATCH 10: INTERACTIVE SHADERS, OPTICAL CAUSTICS & REFRACTION FX (5 VARS)   */}
        {/* ========================================================================= */}
        {showBatch10 && (
          <>
            {/* Section Header Divider */}
            <div className="w-full py-8 px-8 bg-zinc-950/90 border-y border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono text-xs text-zinc-400 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-300 shadow-sm">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-widest text-amber-400 font-mono font-bold block">
                    BATCH 10 ARCHITECTURE // 5 VARIATIONS
                  </span>
                  <h3 className="font-['Syne'] text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Interactive Shaders, Frosted Optical Caustics &amp; Spatial Refraction FX
                  </h3>
                </div>
              </div>
              <span className="hidden sm:inline text-zinc-500 font-mono text-[11px]">
                Snell's Law &bull; Bayer Dithering &bull; Tyndall Scattering &bull; Fluted Optics &bull; SDF Raymarching
              </span>
            </div>

            {/* Variation 46: Chromatic Refractive Glass Prism & Optical Lens Shader */}
            {(currentAesthetic === 'ALL' || currentAesthetic === 'CHROMATIC') && (
              <ShaderChromaticGlassPrism />
            )}

            {/* Variation 47: Neo-Brutalist Ordered Dither & ASCII Halftone Matrix */}
            {(currentAesthetic === 'ALL' || currentAesthetic === 'NEO_BRUTALIST') && (
              <ShaderBrutalistDitherMatrix />
            )}

            {/* Variation 48: Cyberpunk Volumetric Laser Scanner & Fog Caustics */}
            {(currentAesthetic === 'ALL' || currentAesthetic === 'CYBERPUNK') && (
              <ShaderCyberVolumetricLaser />
            )}

            {/* Variation 49: Haute Couture Fluted Ribbed Glass & Liquid Mercury */}
            {(currentAesthetic === 'ALL' || currentAesthetic === 'LUXURY_EDITORIAL') && (
              <ShaderLuxuryFlutedGlass />
            )}

            {/* Variation 50: Parametric 3D Raymarched Metaballs & SDF Liquid Chrome */}
            {(currentAesthetic === 'ALL' || currentAesthetic === 'WEBGL_3D') && (
              <ShaderParametric3DRaymarch />
            )}
          </>
        )}
      </main>

      {/* Catalog Footer & Vibe Coding Playbook Terminal */}
      <footer className="relative w-full border-t border-white/15 bg-[#030407] py-16 px-6 z-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start justify-between gap-8">
          {/* Left Column: Progress & Protocol */}
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 font-mono text-xs uppercase tracking-wider mb-4">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Batches 1 — 10 Complete: 50 Total Production Variations</span>
            </div>

            <h4 className="font-['Syne'] text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Awwwards-Level Supreme Showroom &amp; Vibe Coding Matrix
            </h4>

            <p className="mt-3 text-zinc-400 text-sm leading-relaxed font-light">
              Every variation is self-documenting with a dedicated live metadata HUD, tech stack specs,
              interaction blueprint, and real-time GPU/physics tuning controls.
            </p>

            {/* Master Completion Box */}
            <div className="mt-6 p-4 rounded-lg bg-emerald-950/20 border border-emerald-500/30 backdrop-blur-md">
              <div className="flex items-center justify-between text-xs font-mono text-emerald-400 font-bold mb-2">
                <span className="flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5" /> MASTER ARCHITECTURE COMPLETE // 50/50 PRODUCTION VARIATIONS
                </span>
                <span className="text-emerald-400 font-bold">100% Ready</span>
              </div>
              <p className="text-xs text-zinc-300 font-mono leading-relaxed">
                Covering 10 complete architectural suites: Next.js Heroes, Navigation Systems, Immersive Page Loaders, Scroll Choreographies, Footers &amp; Magnetic Physics, High-Density Dashboards, Spatial E-Commerce 3D Configurators, Generative Audio-Visual Art, Creative Typography, and Interactive Optical Shaders across Chromatic, Neo-Brutalist, Cyberpunk, Luxury Editorial, and 3D WebGL styles.
              </p>
            </div>
          </div>

          {/* Right Column: Quick Stats & Roadmap Actions */}
          <div className="w-full md:w-80 flex flex-col gap-4">
            <div className="p-4 rounded-lg bg-zinc-950 border border-white/10 font-mono text-xs text-zinc-400 space-y-2">
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span>TOTAL VARIATIONS:</span>
                <strong className="text-emerald-400 font-bold">50 Live in Showroom</strong>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span>HERO SECTIONS:</span>
                <strong className="text-white">5 Complete</strong>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span>NAVIGATION SYSTEMS:</span>
                <strong className="text-cyan-400 font-bold">5 Complete</strong>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span>PAGE LOADERS:</span>
                <strong className="text-pink-400 font-bold">5 Complete</strong>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span>SCROLL CHOREOGRAPHIES:</span>
                <strong className="text-emerald-400 font-bold">5 Complete</strong>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span>FOOTERS &amp; PHYSICS:</span>
                <strong className="text-purple-400 font-bold">5 Complete</strong>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span>DASHBOARDS &amp; NODES:</span>
                <strong className="text-amber-400 font-bold">5 Complete</strong>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span>SPATIAL PRODUCTS:</span>
                <strong className="text-cyan-400 font-bold">5 Complete</strong>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span>GENERATIVE ART:</span>
                <strong className="text-emerald-400 font-bold">5 Complete</strong>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span>CREATIVE TYPOGRAPHY:</span>
                <strong className="text-rose-400 font-bold">5 Complete</strong>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span>INTERACTIVE SHADERS:</span>
                <strong className="text-amber-300 font-bold">5 Complete</strong>
              </div>
              <div className="flex justify-between">
                <span>STATUS:</span>
                <strong className="text-emerald-400">Master Catalog Live (10/10)</strong>
              </div>
            </div>

            <button
              onClick={() => {
                soundFx.playChime(600);
                setShowRoadmapModal(true);
              }}
              className="w-full py-3 rounded-lg bg-white/10 hover:bg-white text-zinc-200 hover:text-black font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all border border-white/20"
              data-cursor="hover"
            >
              <BookOpen className="w-4 h-4" />
              <span>Inspect Master Roadmap (50/50 Live)</span>
            </button>
          </div>
        </div>
      </footer>

      {/* Roadmap Spec Modal */}
      {showRoadmapModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="max-w-2xl w-full bg-[#0a0c10] border border-cyan-400/40 rounded-xl p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
              <span className="font-mono text-xs uppercase tracking-widest text-cyan-400 font-bold flex items-center gap-2">
                <Layers className="w-4 h-4" /> Master Visual Catalog Architecture (50 Live Variations)
              </span>
              <button
                onClick={() => setShowRoadmapModal(false)}
                className="font-mono text-xs text-zinc-400 hover:text-white"
              >
                ✕ Close
              </button>
            </div>

            <div className="font-mono text-xs text-zinc-300 space-y-3 leading-relaxed max-h-[60vh] overflow-y-auto pr-2">
              <p className="text-amber-300 font-bold">
                ✓ Batch 1: Next.js Hero Sections (5/5 Complete)
              </p>
              <p className="text-zinc-400">
                &bull; Hero_V01: Chromatic Liquid Mesh (Three.js Simplex GLSL)<br />
                &bull; Hero_V02: Kinetic Neo-Brutalist Grid (CSS Matrix Skew)<br />
                &bull; Hero_V03: Cyber Matrix Raycaster (Canvas 2D Raycast Net)<br />
                &bull; Hero_V04: Luxury Editorial Couture (Cinzel &amp; Golden Stardust)<br />
                &bull; Hero_V05: Quantum Supershape 3D (Parametric Torus Knot GLSL)
              </p>

              <p className="text-cyan-300 font-bold mt-3">
                ✓ Batch 2: Navigation Systems &amp; Mega-Menus (5/5 Complete)
              </p>
              <p className="text-zinc-400">
                &bull; Nav_V01: Kinetic Overlay Morph (SVG Bezier Path Wave)<br />
                &bull; Nav_V02: Chromatic Glassmorphic Dock (Gaussian Proximity Math)<br />
                &bull; Nav_V03: Neo-Brutalist Split Index (Synchronous Dual Telemetry)<br />
                &bull; Nav_V04: Luxury Editorial Curtain (Asymmetric Silk Columns)<br />
                &bull; Nav_V05: Cyber Command Palette (Global ⌘K Keyboard Modal)
              </p>

              <p className="text-pink-400 font-bold mt-3">
                ✓ Batch 3: Immersive Page Loaders &amp; Fluid Transitions (5/5 Complete)
              </p>
              <p className="text-zinc-400">
                &bull; Loader_V01: Kinetic Counter &amp; SVG Diagonal Mask Wipe<br />
                &bull; Loader_V02: Liquid Simplex Shader Dissolve &amp; Spectral Edge Melt<br />
                &bull; Loader_V03: Cyberpunk BIOS Diagnostic Boot Matrix<br />
                &bull; Loader_V04: Haute Couture Gold Foil &amp; Velvet Curtain Split<br />
                &bull; Loader_V05: Quantum Particle Attractor &amp; Torus Knot Crystallization
              </p>

              <p className="text-emerald-400 font-bold mt-3">
                ✓ Batch 4: Scroll Choreography &amp; Canvas Pinning (5/5 Complete)
              </p>
              <p className="text-zinc-400">
                &bull; Scroll_V01: Multi-Layer Horizontal Parallax Gallery with Inertia Scrub<br />
                &bull; Scroll_V02: Kinetic Marquee Velocity &amp; Dynamic CSS Skew Matrix<br />
                &bull; Scroll_V03: Sticky Viewport Pinning &amp; 3D Z-Axis Flythrough Scrub<br />
                &bull; Scroll_V04: Haute Couture Dual-Column Split Counter-Scroll<br />
                &bull; Scroll_V05: Cyberpunk Raycast Spline Tunnel &amp; Waypoint Scrub
              </p>

              <p className="text-purple-400 font-bold mt-3">
                ✓ Batch 5: Footers, Magnetic CTA Zones &amp; Physics (5/5 Complete)
              </p>
              <p className="text-zinc-400">
                &bull; Footer_V01: Gravitational Magnetic Particle Attractor Grid Footer<br />
                &bull; Footer_V02: Brutalist ASCII Monospace Terminal &amp; Interactive Telemetry<br />
                &bull; Footer_V03: Luxury Vermeil Foil Monogram &amp; Salon Privé Inscription<br />
                &bull; Footer_V04: Cyberpunk Holographic System Shutdown Matrix<br />
                &bull; Footer_V05: Parametric 3D Wave Ribbon &amp; Inverted Magnetic Pill CTAs
              </p>

              <p className="text-amber-400 font-bold mt-3">
                ✓ Batch 6: High-Density Dashboards &amp; Node Visualizers (5/5 Complete)
              </p>
              <p className="text-zinc-400">
                &bull; Dashboard_V01: Chromatic Glassmorphic Real-Time Telemetry HUD<br />
                &bull; Dashboard_V02: Kinetic Neo-Brutalist Hardware Register Ledger<br />
                &bull; Dashboard_V03: Cyberpunk Interactive Orbital Node Topology Graph<br />
                &bull; Dashboard_V04: Haute Couture Spatial Exhibition Portfolio Matrix<br />
                &bull; Dashboard_V05: Force-Directed 3D Particle Network &amp; Neural Flow
              </p>

              <p className="text-cyan-400 font-bold mt-3">
                ✓ Batch 7: Spatial E-Commerce &amp; 3D Configurator Showcases (5/5 Complete)
              </p>
              <p className="text-zinc-400">
                &bull; Product_V01: Chromatic Liquid Glassmorphic 3D Chronometer Configurator<br />
                &bull; Product_V02: Neo-Brutalist Footwear Disassembly Matrix &amp; Specification Ledger<br />
                &bull; Product_V03: Cyberpunk Cyberdeck Holographic Terminal &amp; Hardware Flasher<br />
                &bull; Product_V04: Haute Couture Olfactory Pyramid &amp; Bespoke Flacon Atelier<br />
                &bull; Product_V05: Parametric 3D Spatial Audio Headphone &amp; Frequency Resonator
              </p>

              <p className="text-emerald-400 font-bold mt-3">
                ✓ Batch 8: Generative Art, Audio-Visual Shaders &amp; Kinetic Sound Sculptures (5/5 Complete)
              </p>
              <p className="text-zinc-400">
                &bull; Generative_V01: Chromatic Liquid Audio Oscilloscope &amp; Spectral Refraction Ribbon<br />
                &bull; Generative_V02: Neo-Brutalist ASCII Cellular Automata &amp; Sand Physics Grid<br />
                &bull; Generative_V03: Cyberpunk LiDAR Pointcloud Scanner &amp; Topographic Radar HUD<br />
                &bull; Generative_V04: Haute Horlogerie Lissajous Resonance &amp; Astronomical Pendulum<br />
                &bull; Generative_V05: Quantum Lorenz Strange Attractor &amp; 3D Chaos Manifold
              </p>

              <p className="text-rose-400 font-bold mt-3">
                ✓ Batch 9: Interactive Creative Typography, Liquid Text Shaders &amp; Kinetic Glyphs (5/5 Complete)
              </p>
              <p className="text-zinc-400">
                &bull; Typography_V01: Chromatic Liquid Typography &amp; Spectral Displacement Wave<br />
                &bull; Typography_V02: Neo-Brutalist Dynamic Letter-Stretch &amp; Mouse Proximity Matrix<br />
                &bull; Typography_V03: Cyberpunk Cryptographic Terminal &amp; Matrix Glyphic Decoder<br />
                &bull; Typography_V04: Haute Couture Museum Editorial &amp; Illuminated Drop-Cap Atelier<br />
                &bull; Typography_V05: Parametric 3D Kinetic Typography Ribbon &amp; Spatial Möbius Mesh
              </p>

              <p className="text-amber-300 font-bold mt-3">
                ✓ Batch 10: Interactive Shaders, Optical Caustics &amp; Spatial Refraction FX (5/5 Complete)
              </p>
              <p className="text-zinc-400">
                &bull; Shader_V01: Chromatic Refractive Glass Prism &amp; Dual-Surface Lens (Snell's Law)<br />
                &bull; Shader_V02: Neo-Brutalist Ordered Dither &amp; ASCII Halftone Matrix (Bayer 8x8)<br />
                &bull; Shader_V03: Cyberpunk Volumetric Laser Scanner &amp; Fog Caustics (Tyndall Scattering)<br />
                &bull; Shader_V04: Haute Couture Fluted Ribbed Glass &amp; Liquid Mercury (Cylindrical Refraction)<br />
                &bull; Shader_V05: Parametric 3D Raymarched Metaballs &amp; SDF Liquid Chrome (Three.js WebGL)
              </p>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowRoadmapModal(false)}
                className="px-5 py-2 bg-cyan-400 text-black font-mono text-xs font-bold rounded uppercase hover:bg-cyan-300 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Global ⌘K Omni-Search Modal */}
      <OmniSearchModal
        isOpen={showSearchModal}
        onClose={() => setShowSearchModal(false)}
        onSelectComponent={jumpToComponent}
        items={CATALOG_SEARCH_DATA}
      />
    </div>
  );
}

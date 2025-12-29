"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import FadeInSection from "./components/FadeInSection";
import ScrollSlideUp from "./components/ScrollSlideUp";

export default function Home() {
  const [showScrollExplore, setShowScrollExplore] = useState(false);
  const [navOnWhite, setNavOnWhite] = useState(false);
  const [clipPercent, setClipPercent] = useState(0);
  const splashSectionRef = useRef<HTMLElement>(null);
  const brandRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const element = splashSectionRef.current;
      const brandElement = brandRef.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Show scroll-explore 10-15% earlier (before white section fully fills viewport)
      if (rect.top <= windowHeight * 0.12) {
        setShowScrollExplore(true);
      } else {
        setShowScrollExplore(false);
      }

      // Check if navbar is over the white section (navbar is ~80px from top)
      const navbarBottom = 80;
      if (rect.top <= navbarBottom) {
        setNavOnWhite(true);
      } else {
        setNavOnWhite(false);
      }

      // Calculate clip percentage for the brand element
      if (brandElement) {
        const brandRect = brandElement.getBoundingClientRect();
        const whiteTop = rect.top;

        // Calculate how much of the brand is over the white section
        if (whiteTop >= brandRect.bottom) {
          // White section is completely below the brand
          setClipPercent(0);
        } else if (whiteTop <= brandRect.top) {
          // White section is completely above the brand (brand fully on white)
          setClipPercent(100);
        } else {
          // White section is partially intersecting the brand
          const brandHeight = brandRect.bottom - brandRect.top;
          const overlapFromBottom = brandRect.bottom - whiteTop;
          const percent = (overlapFromBottom / brandHeight) * 100;
          setClipPercent(Math.min(100, Math.max(0, percent)));
        }
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Navbar */}
      <nav className={`navbar ${navOnWhite ? 'nav-on-white' : ''}`}>
        <div className="navbar-container">
          <div className="navbar-left">
            <a href="/" className="navbar-brand" ref={brandRef}>
              {/* White version (for dark background) - clips from bottom */}
              <div
                className="brand-layer brand-white"
                style={{
                  clipPath: `inset(0 0 ${clipPercent}% 0)`,
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4" />
                  <path d="M12 8h.01" />
                </svg>
                <span>Sentry</span>
              </div>
              {/* Black version (for white background) - clips from top */}
              <div
                className="brand-layer brand-black"
                style={{
                  clipPath: `inset(${100 - clipPercent}% 0 0 0)`,
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4" />
                  <path d="M12 8h.01" />
                </svg>
                <span>Sentry</span>
              </div>
            </a>
          </div>

          <div className="navbar-right">
            <button className="btn-get-started">Get Started</button>
          </div>
        </div>
      </nav>

      {/* Hero Section - 80% of viewport */}
      <section className="hero">
        <Image
          src="/landing.jpeg"
          alt="Hero background"
          className="hero-image"
          fill
          priority
          style={{ objectFit: "cover", objectPosition: "center bottom" }}
        />
      </section>
      <section className="hero-text">
        <h1 className="hero-title">Warp Speed</h1>
        <p className="hero-subtitle">The Manufacturing&nbsp;OS for </p>
        <p className="hero-subtitle">Indian Industrialization</p>

        {/* Partners */}
        <div className="partners">
          <h2 className="partners-title">Warp Speed Partners</h2>
          <div className="partners-carousel">
            <div className="carousel-track">
              {/* Set 1 */}
              <div className="logo-item">
                <Image src="/logos/akums.png" alt="Akums" width={160} height={58} />
              </div>
              <div className="logo-item">
                <Image src="/logos/piramal.png" alt="Piramal" width={140} height={50} />
              </div>
              <div className="logo-item">
                <Image src="/logos/emcure.png" alt="Emcure" width={140} height={50} />
              </div>
              <div className="logo-item">
                <Image src="/logos/asence.png" alt="Asence" width={110} height={38} />
              </div>
              <div className="logo-item">
                <Image src="/logos/mankind.png" alt="Mankind" width={125} height={44} />
              </div>
              {/* Set 2 */}
              <div className="logo-item">
                <Image src="/logos/akums.png" alt="Akums" width={160} height={58} />
              </div>
              <div className="logo-item">
                <Image src="/logos/piramal.png" alt="Piramal" width={140} height={50} />
              </div>
              <div className="logo-item">
                <Image src="/logos/emcure.png" alt="Emcure" width={140} height={50} />
              </div>
              <div className="logo-item">
                <Image src="/logos/asence.png" alt="Asence" width={110} height={38} />
              </div>
              <div className="logo-item">
                <Image src="/logos/mankind.png" alt="Mankind" width={125} height={44} />
              </div>
              {/* Set 3 */}
              <div className="logo-item">
                <Image src="/logos/akums.png" alt="Akums" width={160} height={58} />
              </div>
              <div className="logo-item">
                <Image src="/logos/piramal.png" alt="Piramal" width={140} height={50} />
              </div>
              <div className="logo-item">
                <Image src="/logos/emcure.png" alt="Emcure" width={140} height={50} />
              </div>
              <div className="logo-item">
                <Image src="/logos/asence.png" alt="Asence" width={110} height={38} />
              </div>
              <div className="logo-item">
                <Image src="/logos/mankind.png" alt="Mankind" width={125} height={44} />
              </div>
              {/* Set 4 */}
              <div className="logo-item">
                <Image src="/logos/akums.png" alt="Akums" width={160} height={58} />
              </div>
              <div className="logo-item">
                <Image src="/logos/piramal.png" alt="Piramal" width={140} height={50} />
              </div>
              <div className="logo-item">
                <Image src="/logos/emcure.png" alt="Emcure" width={140} height={50} />
              </div>
              <div className="logo-item">
                <Image src="/logos/asence.png" alt="Asence" width={110} height={38} />
              </div>
              <div className="logo-item">
                <Image src="/logos/mankind.png" alt="Mankind" width={125} height={44} />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Splash Section */}
      <section ref={splashSectionRef} className="splash-section">
        <FadeInSection>
          <div className="splash-divider"></div>
          <div className="splash-text-row">
            <span className="splash-text-left">SOFTWARE</span>
            <span className="splash-text-center">{'{'}WARP SPEED{'}'}</span>
            <span className="splash-text-right">GET STARTED</span>
          </div>
        </FadeInSection>
        <div className="splash-hero-text" style={{paddingTop: '6rem'}}>
          <ScrollSlideUp>
            <h1>Warp Speed is the manufacturing&nbsp;OS</h1>
            <h1>that <span className="splash-gray"> adapts to your business</span></h1>
            <h1>—not the other way around</h1>
          </ScrollSlideUp>
        </div>

        <div
          className="scroll-explore"
          style={{
            opacity: showScrollExplore ? 1 : 0,
            transform: showScrollExplore ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
          }}
        >
          <p className="scroll-explore-text">SCROLL TO EXPLORE</p>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="scroll-explore-icon"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </section>

      {/* Next Section */}
      <section className="next-section">
      </section>
    </>
  );
}

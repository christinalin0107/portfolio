import { useEffect } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { ArrowUp, Asterisk } from 'lucide-react';
import { site } from '../content';
import { DesignArtwork } from './DesignArtwork';

export function SiteLayout() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      if (hash) document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
      else window.scrollTo(0, 0);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [pathname, hash]);
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header"><div className="header-inner">
      <NavLink className="site-brand" to="/" aria-label="Christina Lin home"><Asterisk size={28} aria-hidden="true" /><span>Christina Lin</span></NavLink>
      <nav aria-label="Main navigation"><Link to="/#work">Work</Link><NavLink to="/about">About</NavLink><a href={site.resume} target="_blank" rel="noreferrer">Resume</a><Link to="/#contact">Contact</Link></nav>
    </div></header>
    <main id="main" tabIndex={-1} className={pathname === '/' ? 'main-home' : 'main-content'}><Outlet /></main>
    <footer className="site-footer"><DesignArtwork name="night-skyline" className="footer-skyline" /><div className="footer-inner page-width"><span>© {new Date().getFullYear()} Christina Lin</span><nav aria-label="Footer navigation"><NavLink to="/">Home</NavLink><NavLink to="/about">About</NavLink><a href={site.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></nav><button aria-label="Back to top" title="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })}><ArrowUp size={20} /></button></div></footer>
  </>;
}

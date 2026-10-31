import { useEffect } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';
import { assetUrl, site } from '../content';

export function SiteLayout() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header"><div className="header-inner">
      <NavLink to="/" aria-label="Christina Lin home"><img className="wordmark" src={assetUrl(site.logo)} alt="Christina Lin" /></NavLink>
      <nav aria-label="Main navigation"><NavLink to="/" end>Work</NavLink><NavLink to="/about">About</NavLink><a href={site.resume} target="_blank" rel="noreferrer">Resume</a></nav>
    </div></header>
    <main id="main" tabIndex={-1}><Outlet /></main>
    <footer className="site-footer"><div><NavLink to="/">Home</NavLink><NavLink to="/about">About</NavLink><a href={site.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></div><span>© {new Date().getFullYear()} Christina Lin</span><button aria-label="Back to top" title="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><ArrowUp size={20} /></button></footer>
  </>;
}

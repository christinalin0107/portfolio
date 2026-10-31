import { Route, Routes } from 'react-router-dom';
import { SiteLayout } from './components/SiteLayout';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProjectPage } from './pages/ProjectPage';
import { NotFoundPage } from './pages/NotFoundPage';

export function App() {
  return <Routes><Route element={<SiteLayout />}><Route index element={<HomePage />} /><Route path="about" element={<AboutPage />} /><Route path=":slug" element={<ProjectPage />} /><Route path="*" element={<NotFoundPage />} /></Route></Routes>;
}

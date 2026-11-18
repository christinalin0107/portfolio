import { useEffect, type RefObject } from 'react';

const clamp = (value: number) => Math.max(0, Math.min(1, value));
const smooth = (value: number) => { const progress = clamp(value); return progress * progress * (3 - 2 * progress); };

export function useDayNightScroll(ref: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const hero = element.querySelector<HTMLElement>('.home-hero')!;
    const contact = element.querySelector<HTMLElement>('.home-contact')!;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;

    function update() {
      frame = 0;
      if (!element) return;
      const scroll = window.scrollY;
      const heroHeight = hero.offsetHeight;
      const contactTop = contact.offsetTop;
      const day = smooth((scroll - heroHeight * .1) / (heroHeight * .85));
      const night = smooth((scroll + window.innerHeight * .7 - contactTop - element.offsetTop) / (window.innerHeight * .6));
      const sky = [221, 239, 251].map((color, index) => Math.round(color + ([243, 211, 199][index] - color) * day));
      element.style.setProperty('--hero-height', `${heroHeight}px`);
      element.style.setProperty('--contact-top', `${contactTop}px`);
      element.style.setProperty('--day-sky', reducedMotion.matches ? '#ddeffb' : `rgb(${sky.join(',')})`);
      element.style.setProperty('--sun-drop', `${reducedMotion.matches ? 0 : day * 90}px`);
      element.style.setProperty('--day-visibility', `${reducedMotion.matches ? 1 : 1 - day * .85}`);
      element.style.setProperty('--night-visibility', `${reducedMotion.matches ? 1 : .35 + night * .65}`);
      element.dataset.time = night > .65 ? 'night' : day > .45 ? 'sunset' : 'day';
    }

    function schedule() { if (!frame) frame = window.requestAnimationFrame(update); }
    const resize = new ResizeObserver(schedule);
    resize.observe(element);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    reducedMotion.addEventListener('change', schedule);
    update();
    return () => {
      window.cancelAnimationFrame(frame);
      resize.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      reducedMotion.removeEventListener('change', schedule);
    };
  }, [ref]);
}

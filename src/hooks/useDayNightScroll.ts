import { useEffect, type RefObject } from 'react';

const clamp = (value: number) => Math.max(0, Math.min(1, value));
const smooth = (value: number) => { const progress = clamp(value); return progress * progress * (3 - 2 * progress); };
const mix = (start: number[], end: number[], progress: number) => start.map((color, index) => Math.round(color + (end[index] - color) * progress));
function luminance(colors: number[]) {
  const linear = colors.map(color => { const channel = color / 255; return channel <= .04045 ? channel / 12.92 : ((channel + .055) / 1.055) ** 2.4; });
  return linear[0] * .2126 + linear[1] * .7152 + linear[2] * .0722;
}

export function useDayNightScroll(ref: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const contact = element.querySelector<HTMLElement>('.home-contact')!;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;

    function update() {
      frame = 0;
      if (!element) return;
      const scroll = window.scrollY;
      const distance = Math.max(window.innerHeight, contact.offsetTop - window.innerHeight * .55);
      const progress = clamp((scroll - element.offsetTop) / distance);
      const sky = progress < .5
        ? mix([221, 239, 251], [243, 211, 199], smooth(progress * 2))
        : mix([243, 211, 199], [38, 43, 86], smooth((progress - .5) * 2));
      const light = luminance(sky);
      const brandContrast = (light + .05) / (luminance([65, 58, 104]) + .05);
      const ink = brandContrast >= 4.5 ? '#413a68' : 1.05 / (light + .05) > (light + .05) / .05 ? '#ffffff' : '#000000';
      const night = smooth((progress - .5) / .45);
      element.style.setProperty('--sky-color', `rgb(${sky.join(',')})`);
      element.style.setProperty('--scene-ink', ink);
      element.style.setProperty('--scene-muted', light > .5 ? '#655376' : ink);
      element.style.setProperty('--scene-progress', `${progress}`);
      element.style.setProperty('--sun-drop', `${reducedMotion.matches ? 0 : progress * window.innerHeight * .9}px`);
      element.style.setProperty('--moon-rise', `${reducedMotion.matches ? 0 : (1 - night) * 80}px`);
      element.style.setProperty('--day-visibility', `${1 - smooth((progress - .35) / .4)}`);
      element.style.setProperty('--sunset-visibility', `${smooth(progress / .3) * (1 - smooth((progress - .6) / .25))}`);
      element.style.setProperty('--night-visibility', `${night}`);
      element.dataset.time = progress > .75 ? 'night' : progress > .3 ? 'sunset' : 'day';
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

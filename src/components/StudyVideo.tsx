import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { Pause, Play } from 'lucide-react';
import { assetUrl, type ContentBlock } from '../content';

export function StudyVideo({ block, phone = false }: { block: ContentBlock; phone?: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const manuallyPaused = useRef(false);
  const [paused, setPaused] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !reducedMotion.matches && !manuallyPaused.current) {
        void video.play().catch(() => {});
      } else {
        video.pause();
      }
    }, { threshold: 0.25 });
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  function togglePlayback() {
    const video = videoRef.current;
    if (!video) return;
    manuallyPaused.current = !video.paused;
    if (video.paused) void video.play().catch(() => {});
    else video.pause();
  }

  const style = { aspectRatio: block.aspectRatio || 16 / 9, '--video-radius': `${block.radius ?? 0}px`, '--video-scale': block.zoom ?? 1 } as CSSProperties;
  return <figure className={`study-video${phone ? ' study-video--phone' : ''}${paused ? ' is-paused' : ''}`} style={style}>
    <video ref={videoRef} loop muted playsInline preload="metadata" poster={block.poster ? assetUrl(block.poster) : undefined} aria-label={block.alt || 'Project demonstration'} onPlay={() => setPaused(false)} onPause={() => setPaused(true)}>
      <source src={assetUrl(block.src!)} type="video/mp4" />
      <a href={assetUrl(block.src!)}>View video</a>
    </video>
    <button className="video-playback" type="button" onClick={togglePlayback} aria-label={`${paused ? 'Play' : 'Pause'} ${block.alt || 'demonstration'}`} title={paused ? 'Play video' : 'Pause video'}>{paused ? <Play size={16} /> : <Pause size={16} />}</button>
  </figure>;
}

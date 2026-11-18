import { assetUrl } from '../content';

const artwork = {
  'cloud-large': [200, 90],
  'cloud-small': [105, 47],
  sun: [180, 180],
  'day-hills-back': [1440, 102.976],
  'day-hills-front': [1440, 52.6667],
  portrait: [136, 157],
  'sunset-hills': [1440, 175],
  'night-sky': [1440, 650],
  'night-skyline': [1440, 130],
} as const;

export function DesignArtwork({ name, className = '', alt = '' }: { name: keyof typeof artwork; className?: string; alt?: string }) {
  const [width, height] = artwork[name];
  return <img className={`design-artwork ${className}`} src={assetUrl(`images/pastel/${name}.svg`)} width={width} height={height} alt={alt} aria-hidden={alt ? undefined : true} decoding="async" />;
}

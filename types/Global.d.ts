/**
 * Source positions fetched from JSON file
 */
interface SpriteSource {
  /** positions of images in texture file */
  positions: Array<{ x: number; y: number; }>;
  /** Width of building */
  w: number;
  /** Height of building */
  h: number;
}

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

type UnitCategory = number;
type UnitType = string;
type DrawingState = number;

/** Options for `Unit` class initialization */
interface UnitOptions {
  // From `DefaultUnit` class
  pos?: { x: number; y: number; };
  unitType?: string;
  armor?: number;
  damage?: number;
  category?: UnitCategory;
  unitType?: UnitType;
  needDelete?: boolean;
  needUpdate?: boolean;
  _drawingState?: DrawingState;
  timeCount?: number;
  // From `Unit` class
  spriteSource?: SpriteSource;
  id?: number;
}

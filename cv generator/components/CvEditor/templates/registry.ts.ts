import { harvard } from './harvard';
import { modernMinimal } from './modernMinimal';
import { creative } from './creative';
import { europass } from './europass';
import { classic } from './classic';
import { chronological } from './chronological';
import { functional } from './functional';

const templates: Record<string, any> = {
  harvard_mba: harvard,
  modern_minimal: modernMinimal,
  creative,
  europass_official: europass,
  classic_conservative: classic,
  chronological,
  functional,
};

export default templates;
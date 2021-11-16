export interface AnimationAsset {
  id: string;
  url: string;
}

interface JSONAnimationData {
  json: string;
  assets?: AnimationAsset[];
}

interface URLAnimationData {
  url: string;
  assets?: AnimationAsset[];
  version?: string | number;
}

export type AnimationData = JSONAnimationData | URLAnimationData;

export const SPEED_DEFAULT = 1;

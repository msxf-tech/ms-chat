export interface BubbleItem {
  name?: string,
  avatar?: {
    src: string;
  }
}

export interface Bubble {
    left?: BubbleItem
    right?: BubbleItem
}
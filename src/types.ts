export type LayoutType = 'title' | 'summary' | 'three-columns' | 'grid' | 'timeline' | 'team' | 'financial';

export interface SlideItem {
  id?: number | string;
  title?: string;
  subtitle?: string;
  text?: string;
  list?: string[];
  icon?: string;
}

export interface SlideData {
  id: number;
  layout: LayoutType;
  title?: string;
  subtitle?: string;
  content?: string | string[];
  items?: SlideItem[];
  accordionTitle?: string;
  accordionContent?: string;
  stats?: { value: string; label: string; sublabel?: string }[];
}
